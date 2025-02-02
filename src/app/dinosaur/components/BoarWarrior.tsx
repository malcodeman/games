import { AnimatedSprite as AnimatedSpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { AnimatedSprite, Graphics, useTick } from "@pixi/react";
import { Bounds } from "../types";
import { ENEMY_SCALE } from "../constants";

type Props = {
  id: string;
  bounds: Bounds;
  isDebugging?: boolean;
  updateEnemyBounds(payload: { id: string; bounds: Bounds }): void;
};

export function BoarWarrior(props: Props) {
  const { id, bounds, isDebugging = false, updateEnemyBounds } = props;
  const spriteRef = useRef<null | AnimatedSpriteType>(null);
  const [walkTextures, setWalkTextures] = useState<Texture[]>([]);

  useEffect(() => {
    function loadTextures() {
      setWalkTextures([
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-0.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-1.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-2.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-3.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-4.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-5.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-6.png"),
        Texture.from("/sprites/boar-warrior-walk/boar-warrior-walk-7.png"),
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

  if (!walkTextures.length) {
    return null;
  }

  return (
    <>
      {isDebugging ? (
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(0xff0000);
            g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            g.endFill();
          }}
        />
      ) : null}
      <AnimatedSprite
        ref={spriteRef}
        textures={walkTextures}
        isPlaying={true}
        animationSpeed={0.1}
        initialFrame={0}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        scale={ENEMY_SCALE.boarWarrior}
      />
    </>
  );
}
