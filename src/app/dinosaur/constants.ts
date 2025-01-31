export const RENDERER_SIZE = { width: 800, height: 600 };
export const ASSET_SIZE = {
  forest: { width: 336, height: 339 },
  ground: { width: 48, height: 46 },
};
export const GROUND_Y = RENDERER_SIZE.height - ASSET_SIZE.ground.height;
export const GRAVITY = 0.6;
export const JUMP_STRENGTH = -12;
export const OBSTACLE_SPEED = 5;
export const OBSTACLE_SPAWN_PROBABILITY = 0.01;
export const OBSTACLE_MIN_GAP = 160;

const PLAYER_SIZE_SCALE = 3.2;

export const PLAYER_X = 100;
export const PLAYER_WIDTH = 13 * PLAYER_SIZE_SCALE;
export const PLAYER_HEIGHT = 18 * PLAYER_SIZE_SCALE;
export const PLAYER_Y = GROUND_Y - PLAYER_HEIGHT + 8;

const ENEMY_SIZE_SCALE = 2.8;

export const ENEMY_WIDTH = 14 * ENEMY_SIZE_SCALE;
export const ENEMY_HEIGHT = 15 * ENEMY_SIZE_SCALE;
