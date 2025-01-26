import {
  FLOOR,
  GRAVITY,
  GROUND_Y,
  JUMP_STRENGTH,
  OBSTACLE_MIN_GAP,
  OBSTACLE_SPAWN_PROBABILITY,
  OBSTACLE_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_X,
  RENDERER_SIZE,
} from "./constants";
import { coinSound, hurtSound, jumpSound } from "./sounds";
import { GameState, GameAction, Obstacle } from "./types";

function isColliding(playerY: number, obstacles: Obstacle[]) {
  return obstacles.some(
    (obs) =>
      PLAYER_X < obs.x + obs.width &&
      PLAYER_X + PLAYER_WIDTH > obs.x &&
      playerY < obs.y + obs.height &&
      playerY + PLAYER_HEIGHT > obs.y,
  );
}

export const gameReducerinitialState: GameState = {
  y: FLOOR,
  velocity: 0,
  isJumping: false,
  obstacles: [],
  score: 0,
  gameState: "idle",
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case "TICK": {
      const newY = Math.min(state.y + state.velocity, FLOOR);
      const newVelocity = newY === FLOOR ? 0 : state.velocity + GRAVITY;
      const isJumping = newY !== FLOOR;
      const obstacles = state.obstacles
        .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
        .filter((obs) => obs.x > -50);

      if (
        Math.random() < OBSTACLE_SPAWN_PROBABILITY &&
        (obstacles.length === 0 ||
          obstacles[obstacles.length - 1].x <
            RENDERER_SIZE.width - OBSTACLE_MIN_GAP)
      ) {
        obstacles.push({ x: 800, y: GROUND_Y - 50, width: 50, height: 50 });
      }

      if (state.score % 20 === 0 && state.score > 0) {
        if (!coinSound.playing()) {
          coinSound.play();
        }
      }

      if (isColliding(newY, obstacles)) {
        hurtSound.play();
        return { ...state, gameState: "over" };
      }

      return {
        ...state,
        y: newY,
        velocity: newVelocity,
        obstacles,
        isJumping,
      };
    }

    case "JUMP":
      if (!state.isJumping) {
        jumpSound.play();
      }
      return state.isJumping
        ? state
        : { ...state, velocity: JUMP_STRENGTH, isJumping: true };

    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };

    case "RESTART_GAME":
      return { ...state, ...gameReducerinitialState, gameState: "playing" };

    default:
      return state;
  }
};
