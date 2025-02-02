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

export function Bee(props: Props) {
  const { id, bounds, isDebugging = false, updateEnemyBounds } = props;
  const spriteRef = useRef<null | AnimatedSpriteType>(null);
  const [flyTextures, setFlyTextures] = useState<Texture[]>([]);

  useEffect(() => {
    function loadTextures() {
      setFlyTextures([
        Texture.from("/sprites/bee-fly/bee-fly-0.png"),
        Texture.from("/sprites/bee-fly/bee-fly-1.png"),
        Texture.from("/sprites/bee-fly/bee-fly-2.png"),
        Texture.from("/sprites/bee-fly/bee-fly-3.png"),
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

  if (!flyTextures.length) {
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
        textures={flyTextures}
        isPlaying={true}
        animationSpeed={0.2}
        initialFrame={0}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        scale={ENEMY_SCALE.bee}
      />
    </>
  );
}
