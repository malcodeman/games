"use client";
import { useEffect, useReducer } from "react";
import { Stage, Sprite, Graphics } from "@pixi/react";
import { Graphics as GraphicsType } from "pixi.js";
import { useKeyboardEvent } from "@react-hookz/web";
import { gameReducer, gameReducerinitialState } from "./reducers";

const drawGround = (g: GraphicsType) => {
  g.clear();
  g.lineStyle(1, "#ccc");
  g.moveTo(0, 550);
  g.lineTo(800, 550);
};

export default function DinosaurPage() {
  const [state, dispatch] = useReducer(gameReducer, gameReducerinitialState);

  // 🎮 Game Loop
  useEffect(() => {
    function gameLoop() {
      dispatch({ type: "TICK" });
      requestAnimationFrame(gameLoop);
    }

    const animationFrame = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useKeyboardEvent(" ", () => dispatch({ type: "JUMP" }), []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage width={800} height={600} options={{ backgroundColor: "#000" }}>
        <Graphics draw={drawGround} />
        <Sprite image="./sprites/ghost.png" x={100} y={state.y} />
        {state.obstacles.map((obs, index) => (
          <Graphics
            key={index}
            draw={(g) => {
              g.clear();
              g.beginFill(0xff0000);
              g.drawRect(obs.x, obs.y, obs.width, obs.height);
              g.endFill();
            }}
          />
        ))}
      </Stage>
    </div>
  );
}
