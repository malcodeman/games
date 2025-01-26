import { Sprite } from "@pixi/react";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function SlimePurple(props: Props) {
  const { x, y, width, height } = props;

  return (
    <Sprite
      image="./sprites/slime-purple-idle-0.png"
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
}
