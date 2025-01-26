import { TextStyle, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { AnimatedSprite, Text } from "@pixi/react";

type Props = {
  score: number;
  isPlaying: boolean;
};

export function Scoreboard(props: Props) {
  const { score, isPlaying } = props;
  const [coinTextures, setCoinTextures] = useState<Texture[]>([]);

  useEffect(() => {
    function loadTextures() {
      setCoinTextures([
        Texture.from("/sprites/coin/coin-0.png"),
        Texture.from("/sprites/coin/coin-1.png"),
        Texture.from("/sprites/coin/coin-2.png"),
        Texture.from("/sprites/coin/coin-3.png"),
        Texture.from("/sprites/coin/coin-4.png"),
        Texture.from("/sprites/coin/coin-5.png"),
        Texture.from("/sprites/coin/coin-6.png"),
        Texture.from("/sprites/coin/coin-7.png"),
        Texture.from("/sprites/coin/coin-8.png"),
        Texture.from("/sprites/coin/coin-9.png"),
        Texture.from("/sprites/coin/coin-10.png"),
        Texture.from("/sprites/coin/coin-11.png"),
      ]);
    }

    loadTextures();
  }, []);

  if (!coinTextures.length) {
    return null;
  }

  return (
    <>
      <AnimatedSprite
        textures={coinTextures}
        isPlaying={isPlaying}
        animationSpeed={0.1}
        initialFrame={0}
        x={20}
        y={20}
        width={8 * 1.8}
        height={10 * 1.8}
      />
      <Text
        text={`Score: ${score}`}
        x={60}
        y={20}
        style={
          new TextStyle({
            fontSize: 10 * 1.8,
            fontWeight: "400",
            fill: "#fff",
          })
        }
      />
    </>
  );
}
