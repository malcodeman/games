"use client";
import { useEffect, useReducer, useRef } from "react";
import { Stage, Graphics, Text, TilingSprite } from "@pixi/react";
import { Graphics as GraphicsType, TextStyle } from "pixi.js";
import { useIntervalEffect, useKeyboardEvent } from "@react-hookz/web";
import { gameReducer, gameReducerinitialState } from "./reducers";
import { GROUND_Y, RENDERER_SIZE } from "./constants";
import { Player } from "./components/Player";
import { Boar } from "./components/Boar";
import { Scoreboard } from "./components/Scoreboard";

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
      if (state.gameState === "playing") {
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
  }, [state.gameState]);

  useIntervalEffect(
    () => {
      dispatch({ type: "INCREMENT_SCORE" });
    },
    state.gameState === "playing" ? 200 : undefined,
  );

  function handleOnJump() {
    if (state.gameState === "playing") {
      dispatch({ type: "JUMP" });
    } else {
      dispatch({ type: "RESTART_GAME" });
    }
  }

  useKeyboardEvent(" ", () => handleOnJump(), [state.gameState]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage
        width={RENDERER_SIZE.width}
        height={RENDERER_SIZE.height}
        options={{ backgroundColor: "#000" }}
        onClick={() => handleOnJump()}
      >
        <TilingSprite
          image="/sprites/forest.png"
          width={RENDERER_SIZE.width}
          height={339}
          tilePosition={{ x: state.backgroundX, y: 0 }}
          y={RENDERER_SIZE.height - 339 - 64}
        />
        <Scoreboard
          score={state.score}
          isPlaying={state.gameState === "playing"}
        />
        <Graphics draw={drawGround} />
        <Player y={state.playerY} gameState={state.gameState} />
        {state.enemies.map((obs, index) => (
          <Boar
            key={index}
            x={obs.x}
            y={obs.y}
            width={obs.width}
            height={obs.height}
          />
        ))}
        {state.gameState === "idle" ? (
          <Text
            text="Start Game"
            x={RENDERER_SIZE.width / 2}
            y={RENDERER_SIZE.height / 2}
            style={
              new TextStyle({
                fontSize: 48,
                fontWeight: "bold",
                fill: "green",
              })
            }
            anchor={0.5}
          />
        ) : null}
        {state.gameState === "over" ? (
          <Text
            text="Game Over"
            x={RENDERER_SIZE.width / 2}
            y={RENDERER_SIZE.height / 2}
            style={
              new TextStyle({
                fontSize: 48,
                fontWeight: "bold",
                fill: "#ff0000",
              })
            }
            anchor={0.5}
          />
        ) : null}
      </Stage>
    </div>
  );
}
