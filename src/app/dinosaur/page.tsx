"use client";
import { useEffect, useReducer, useRef } from "react";
import { Stage, Text, TilingSprite } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useIntervalEffect, useKeyboardEvent } from "@react-hookz/web";
import { gameReducer, gameReducerinitialState } from "./reducers";
import { ASSET_SIZE, RENDERER_SIZE, GROUND_Y } from "./constants";
import { Player } from "./components/Player";
import { Boar } from "./components/Boar";
import { Scoreboard } from "./components/Scoreboard";
import { Bounds, Enemy } from "./types";
import { Bee } from "./components/Bee";
import { BoarWarrior } from "./components/BoarWarrior";

export default function DinosaurPage() {
  const [state, dispatch] = useReducer(gameReducer, gameReducerinitialState);
  const gameLoopRef = useRef<number | null>(null);
  const isDebugging = false;

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

  function handleUpdateEnemyBounds(payload: { id: string; bounds: Bounds }) {
    dispatch({
      type: "UPDATE_ENEMY_BOUNDS",
      payload,
    });
  }

  function renderEnemy(enemy: Enemy) {
    if (enemy.type === "boar") {
      return (
        <Boar
          key={enemy.id}
          id={enemy.id}
          bounds={enemy.bounds}
          isDebugging={isDebugging}
          updateEnemyBounds={handleUpdateEnemyBounds}
        />
      );
    }
    if (enemy.type === "boar-warrior") {
      return (
        <BoarWarrior
          key={enemy.id}
          id={enemy.id}
          bounds={enemy.bounds}
          isDebugging={isDebugging}
          updateEnemyBounds={handleUpdateEnemyBounds}
        />
      );
    }
    return (
      <Bee
        key={enemy.id}
        id={enemy.id}
        bounds={enemy.bounds}
        isDebugging={isDebugging}
        updateEnemyBounds={handleUpdateEnemyBounds}
      />
    );
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
          height={ASSET_SIZE.forest.height}
          tilePosition={{ x: state.backgroundX, y: 0 }}
          y={RENDERER_SIZE.height - ASSET_SIZE.forest.height}
        />
        <Scoreboard
          score={state.score}
          isPlaying={state.gameState === "playing"}
        />
        <TilingSprite
          image="/sprites/ground.png"
          width={RENDERER_SIZE.width}
          height={ASSET_SIZE.ground.height}
          tilePosition={{ x: state.backgroundX, y: 0 }}
          y={GROUND_Y}
        />
        <Player
          y={state.playerY}
          gameState={state.gameState}
          isJumping={state.isJumping}
        />
        {state.enemies.map((enemy) => renderEnemy(enemy))}
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
