import { Howl } from "howler";

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
