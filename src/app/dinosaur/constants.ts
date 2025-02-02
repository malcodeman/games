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
export const ENEMY_SCALE = {
  boar: 1.4,
  boarWarrior: 0.8,
  bee: 1.2,
};
export const ENEMY_SIZE = {
  boar: {
    width: 39 * ENEMY_SCALE.boar,
    height: 29 * ENEMY_SCALE.boar,
  },
  boarWarrior: {
    width: 79 * ENEMY_SCALE.boarWarrior,
    height: 62 * ENEMY_SCALE.boarWarrior,
  },
  bee: {
    width: 36 * ENEMY_SCALE.bee,
    height: 40 * ENEMY_SCALE.bee,
  },
};
