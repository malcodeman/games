export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Enemy = {
  id: string;
  bounds: Bounds;
  type: "boar" | "bee";
};

export type GameState = {
  playerY: number;
  velocity: number;
  isJumping: boolean;
  enemies: Enemy[];
  score: number;
  gameState: "idle" | "playing" | "over";
  backgroundX: number;
};

export type GameAction =
  | { type: "TICK" }
  | { type: "JUMP" }
  | { type: "INCREMENT_SCORE" }
  | { type: "RESTART_GAME" }
  | {
      type: "UPDATE_ENEMY_BOUNDS";
      payload: { id: string; bounds: Bounds };
    };
