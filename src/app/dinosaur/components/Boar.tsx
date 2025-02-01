import { AnimatedSprite as AnimatedSpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { AnimatedSprite, useTick } from "@pixi/react";
import { Bounds } from "../types";
import { ENEMY_SCALE } from "../constants";

type Props = {
  id: string;
  bounds: Bounds;
  updateEnemyBounds(payload: { id: string; bounds: Bounds }): void;
};

export function Boar(props: Props) {
  const { id, bounds, updateEnemyBounds } = props;
  const spriteRef = useRef<null | AnimatedSpriteType>(null);
  const [idleTextures, setIdleTextures] = useState<Texture[]>([]);

  useEffect(() => {
    function loadTextures() {
      setIdleTextures([
        Texture.from("/sprites/boar-run/boar-run-0.png"),
        Texture.from("/sprites/boar-run/boar-run-1.png"),
        Texture.from("/sprites/boar-run/boar-run-2.png"),
        Texture.from("/sprites/boar-run/boar-run-3.png"),
        Texture.from("/sprites/boar-run/boar-run-4.png"),
        Texture.from("/sprites/boar-run/boar-run-5.png"),
      ]);
    }

    loadTextures();
  }, []);

  useTick(() => {
    if (spriteRef.current) {
      const bounds = spriteRef.current.getBounds();
      const payload = { id, bounds };

      updateEnemyBounds(payload);
    }
  });

  if (!idleTextures.length) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={idleTextures}
      isPlaying={true}
      animationSpeed={0.1}
      initialFrame={0}
      x={bounds.x}
      y={bounds.y}
      width={bounds.width}
      height={bounds.height}
      scale={ENEMY_SCALE}
    />
  );
}
