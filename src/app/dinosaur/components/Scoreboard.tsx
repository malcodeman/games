import { TextStyle } from "pixi.js";
import { Text } from "@pixi/react";

type Props = {
  score: number;
};

export function Scoreboard(props: Props) {
  const { score } = props;

  return (
    <Text
      text={`Score: ${score}`}
      x={20}
      y={20}
      style={
        new TextStyle({
          fontSize: 20,
          fontWeight: "400",
          fill: "#fff",
        })
      }
    />
  );
}
