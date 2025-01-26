import { Sprite } from "@pixi/react";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: "purple" | "green";
};

export function Slime(props: Props) {
  const { x, y, width, height, color } = props;
  const image =
    color === "purple"
      ? "./sprites/slime-purple-idle-0.png"
      : "./sprites/slime-green-idle-0.png";

  return <Sprite image={image} x={x} y={y} width={width} height={height} />;
}
