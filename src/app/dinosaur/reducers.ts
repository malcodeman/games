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
  isGameOver: false,
  score: 0,
};

export const gameReducer = (state: GameState, action: GameAction) => {
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

      if (isColliding(newY, obstacles)) {
        return { ...state, isGameOver: true };
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
      return state.isJumping
        ? state
        : { ...state, velocity: JUMP_STRENGTH, isJumping: true };

    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };

    default:
      return state;
  }
};
