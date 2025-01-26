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
  score: number;
  gameState: "idle" | "playing" | "over";
};

export type GameAction =
  | { type: "TICK" }
  | { type: "JUMP" }
  | { type: "INCREMENT_SCORE" }
  | { type: "RESTART_GAME" };
