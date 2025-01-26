import {
  FLOOR,
  GRAVITY,
  GROUND_Y,
  JUMP_STRENGTH,
  OBSTACLE_MIN_GAP,
  OBSTACLE_SPAWN_PROBABILITY,
  OBSTACLE_SPEED,
} from "./constants";
import { GameState, GameAction } from "./types";

export const gameReducerinitialState: GameState = {
  y: FLOOR,
  velocity: 0,
  isJumping: false,
  obstacles: [{ x: 800, y: GROUND_Y, width: 50, height: 50 }],
};

export const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case "TICK": {
      const newY = Math.min(state.y + state.velocity, FLOOR);
      const newVelocity = newY === FLOOR ? 0 : state.velocity + GRAVITY;
      const isJumping = newY !== FLOOR;
      const newObstacles = state.obstacles
        .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
        .filter((obs) => obs.x > -50);

      if (
        Math.random() < OBSTACLE_SPAWN_PROBABILITY &&
        (newObstacles.length === 0 ||
          newObstacles[newObstacles.length - 1].x < 800 - OBSTACLE_MIN_GAP)
      ) {
        newObstacles.push({ x: 800, y: GROUND_Y, width: 50, height: 50 });
      }

      return {
        ...state,
        y: newY,
        velocity: newVelocity,
        obstacles: newObstacles,
        isJumping,
      };
    }

    case "JUMP":
      return state.isJumping
        ? state
        : { ...state, velocity: JUMP_STRENGTH, isJumping: true };

    default:
      return state;
  }
};
