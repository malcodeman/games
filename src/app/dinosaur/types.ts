export type Enemy = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameState = {
  playerY: number;
  velocity: number;
  isJumping: boolean;
  enemies: Enemy[];
  score: number;
  gameState: "idle" | "playing" | "over";
};

export type GameAction =
  | { type: "TICK" }
  | { type: "JUMP" }
  | { type: "INCREMENT_SCORE" }
  | { type: "RESTART_GAME" };
