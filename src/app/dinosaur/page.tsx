"use client";
import { useEffect, useReducer, useRef } from "react";
import { Stage, Sprite, Graphics, Text } from "@pixi/react";
import { Graphics as GraphicsType, TextStyle } from "pixi.js";
import { useIntervalEffect, useKeyboardEvent } from "@react-hookz/web";
import { gameReducer, gameReducerinitialState } from "./reducers";
import {
  GROUND_Y,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_X,
  RENDERER_SIZE,
} from "./constants";

const drawGround = (g: GraphicsType) => {
  g.clear();
  g.lineStyle(1, "#ccc");
  g.moveTo(0, GROUND_Y);
  g.lineTo(RENDERER_SIZE.width, GROUND_Y);
};

export default function DinosaurPage() {
  const [state, dispatch] = useReducer(gameReducer, gameReducerinitialState);
  const gameLoopRef = useRef<number | null>(null);

  // 🎮 Game Loop
  useEffect(() => {
    function gameLoop() {
      if (!state.isGameOver) {
        dispatch({ type: "TICK" });
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [state.isGameOver]);

  useIntervalEffect(
    () => {
      dispatch({ type: "INCREMENT_SCORE" });
    },
    !state.isGameOver ? 200 : undefined,
  );

  useKeyboardEvent(
    " ",
    () => {
      if (state.isGameOver) {
        dispatch({ type: "RESTART_GAME" });
      } else {
        dispatch({ type: "JUMP" });
      }
    },
    [state.isGameOver],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage
        width={RENDERER_SIZE.width}
        height={RENDERER_SIZE.height}
        options={{ backgroundColor: "#000" }}
      >
        <Text
          text={`Score: ${state.score}`}
          x={20}
          y={20}
          style={
            new TextStyle({
              fontSize: 24,
              fontWeight: "400",
              fill: "#fff",
            })
          }
        />
        <Graphics draw={drawGround} />
        <Sprite
          image="./sprites/ghost.png"
          x={PLAYER_X}
          y={state.y}
          width={PLAYER_WIDTH}
          height={PLAYER_HEIGHT}
        />
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
