import { nanoid } from "nanoid";
import {
  INITIAL_ENEMY_HEIGHT,
  INITIAL_ENEMY_WIDTH,
  GRAVITY,
  GROUND_Y,
  JUMP_STRENGTH,
  OBSTACLE_MIN_GAP,
  OBSTACLE_SPAWN_PROBABILITY,
  OBSTACLE_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_X,
  PLAYER_Y,
  RENDERER_SIZE,
} from "./constants";
import { coinSound, hurtSound, jumpSound } from "./sounds";
import { GameState, GameAction, Enemy } from "./types";

function isColliding(playerY: number, enemies: Enemy[]) {
  return enemies.some(
    (obs) =>
      PLAYER_X < obs.bounds.x + obs.bounds.width &&
      PLAYER_X + PLAYER_WIDTH > obs.bounds.x &&
      playerY < obs.bounds.y + obs.bounds.height &&
      playerY + PLAYER_HEIGHT > obs.bounds.y,
  );
}

export const gameReducerinitialState: GameState = {
  playerY: PLAYER_Y,
  velocity: 0,
  isJumping: false,
  enemies: [],
  score: 0,
  gameState: "idle",
  backgroundX: 0,
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case "TICK": {
      const newPlayerY = Math.min(state.playerY + state.velocity, PLAYER_Y);
      const newVelocity =
        newPlayerY === PLAYER_Y ? 0 : state.velocity + GRAVITY;
      const isJumping = newPlayerY !== PLAYER_Y;
      const enemies = state.enemies
        .map((obs) => ({
          ...obs,
          bounds: { ...obs.bounds, x: obs.bounds.x - OBSTACLE_SPEED },
        }))
        .filter((obs) => obs.bounds.x > -50);

      if (
        Math.random() < OBSTACLE_SPAWN_PROBABILITY &&
        (enemies.length === 0 ||
          enemies[enemies.length - 1].bounds.x <
            RENDERER_SIZE.width - OBSTACLE_MIN_GAP)
      ) {
        enemies.push({
          id: nanoid(),
          bounds: {
            x: 800,
            y: GROUND_Y - INITIAL_ENEMY_HEIGHT,
            width: INITIAL_ENEMY_WIDTH,
            height: INITIAL_ENEMY_HEIGHT,
          },
        });
      }

      if (state.score % 20 === 0 && state.score > 0) {
        if (!coinSound.playing()) {
          coinSound.play();
        }
      }

      if (isColliding(newPlayerY, enemies)) {
        hurtSound.play();
        return { ...state, gameState: "over" };
      }

      return {
        ...state,
        playerY: newPlayerY,
        velocity: newVelocity,
        enemies,
        isJumping,
        backgroundX: state.backgroundX - OBSTACLE_SPEED / 2,
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

    case "UPDATE_ENEMY_BOUNDS": {
      const enemies = state.enemies.map((obs) =>
        obs.id === action.payload.id
          ? { ...obs, bounds: action.payload.bounds }
          : obs,
      );

      return { ...state, enemies };
    }

    default:
      return state;
  }
};
