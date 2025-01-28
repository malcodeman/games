import { AnimatedSprite as AnimatedSpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { AnimatedSprite } from "@pixi/react";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function Boar(props: Props) {
  const { x, y, width, height } = props;
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
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
}
