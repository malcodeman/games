export type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameState = {
  y: number;
  velocity: number;
  isJumping: boolean;
  obstacles: Obstacle[];
  isGameOver: boolean;
  score: number;
};

export type GameAction =
  | { type: "TICK" }
  | { type: "JUMP" }
  | { type: "INCREMENT_SCORE" }
  | { type: "RESTART_GAME" };
