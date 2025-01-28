import { AnimatedSprite as AnimatedSpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { AnimatedSprite } from "@pixi/react";
import { PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_X } from "../constants";

type Props = {
  y: number;
  gameState: "idle" | "playing" | "over";
};

export function Player(props: Props) {
  const { y, gameState } = props;
  const spriteRef = useRef<null | AnimatedSpriteType>(null);
  const [idleTextures, setIdleTextures] = useState<Texture[]>([]);
  const [runTextures, setRunTextures] = useState<Texture[]>([]);

  useEffect(() => {
    function loadTextures() {
      setIdleTextures([
        Texture.from("/sprites/warrior-idle/warrior-idle-0.png"),
        Texture.from("/sprites/warrior-idle/warrior-idle-1.png"),
        Texture.from("/sprites/warrior-idle/warrior-idle-2.png"),
        Texture.from("/sprites/warrior-idle/warrior-idle-3.png"),
      ]);
      setRunTextures([
        Texture.from("/sprites/warrior-run/warrior-run-0.png"),
        Texture.from("/sprites/warrior-run/warrior-run-1.png"),
        Texture.from("/sprites/warrior-run/warrior-run-2.png"),
        Texture.from("/sprites/warrior-run/warrior-run-3.png"),
        Texture.from("/sprites/warrior-run/warrior-run-4.png"),
        Texture.from("/sprites/warrior-run/warrior-run-5.png"),
        Texture.from("/sprites/warrior-run/warrior-run-6.png"),
        Texture.from("/sprites/warrior-run/warrior-run-7.png"),
      ]);
    }

    loadTextures();
  }, []);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.gotoAndPlay(0);
    }
  }, [gameState]);

  if (!idleTextures.length || !runTextures.length) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={gameState === "idle" ? idleTextures : runTextures}
      isPlaying={true}
      animationSpeed={0.1}
      initialFrame={0}
      x={PLAYER_X}
      y={y}
      width={PLAYER_WIDTH}
      height={PLAYER_HEIGHT}
    />
  );
}
