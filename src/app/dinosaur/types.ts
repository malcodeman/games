type Obstacle = {
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
};

export type GameAction = { type: "TICK" } | { type: "JUMP" };
