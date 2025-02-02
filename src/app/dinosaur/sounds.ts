import { Howl } from "howler";

export const actionMusic = new Howl({
  src: ["/sounds/action.wav"],
  volume: 0.2,
});

export const jumpSound = new Howl({
  src: ["/sounds/jump.wav"],
  volume: 0.5,
});

export const hurtSound = new Howl({
  src: ["/sounds/hurt.wav"],
});

export const coinSound = new Howl({
  src: ["/sounds/coin.wav"],
});

export const deathSound = new Howl({
  src: ["/sounds/death.wav"],
});
