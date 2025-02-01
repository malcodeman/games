import { AnimatedSprite as AnimatedSpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { AnimatedSprite } from "@pixi/react";
import { PLAYER_X } from "../constants";

type Props = {
  y: number;
  gameState: "idle" | "playing" | "over";
  isJumping: boolean;
};

export function Player(props: Props) {
  const { y, gameState, isJumping } = props;
  const spriteRef = useRef<null | AnimatedSpriteType>(null);
  const [idleTextures, setIdleTextures] = useState<Texture[]>([]);
  const [runTextures, setRunTextures] = useState<Texture[]>([]);
  const [jumpTextures, setJumpTextures] = useState<Texture[]>([]);

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
      setJumpTextures([
        Texture.from("/sprites/warrior-jump/warrior-jump-0.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-1.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-2.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-3.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-4.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-5.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-6.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-7.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-8.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-9.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-10.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-11.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-12.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-13.png"),
        Texture.from("/sprites/warrior-jump/warrior-jump-14.png"),
      ]);
    }

    loadTextures();
  }, []);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.gotoAndPlay(0);
    }
  }, [gameState, isJumping]);

  if (!idleTextures.length || !runTextures.length) {
    return null;
  }

  function renderTextures() {
    if (isJumping) {
      return jumpTextures;
    }
    return gameState === "idle" ? idleTextures : runTextures;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={renderTextures()}
      isPlaying={true}
      animationSpeed={0.1}
      initialFrame={0}
      x={PLAYER_X}
      y={y}
      scale={1.2}
    />
  );
}
