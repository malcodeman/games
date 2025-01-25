"use client";
import { useEffect, useRef, useState } from "react";
import { Stage, Sprite, Graphics } from "@pixi/react";
import { Graphics as GraphicsType } from "pixi.js";

const ground = (g: GraphicsType) => {
  g.clear();
  g.lineStyle(1, "#ccc");
  g.moveTo(0, 550); // Start position
  g.lineTo(800, 550); // End position
};

export default function DinosaurPage() {
  const [obstacles, setObstacles] = useState([
    { x: 800, y: 500, width: 50, height: 50 },
  ]);
  const gameRef = useRef<number | null>(null);

  useEffect(() => {
    function gameLoop() {
      setObstacles((prev) => {
        const newObstacles = prev
          .map((obs) => ({ ...obs, x: obs.x - 5 }))
          .filter((obs) => obs.x > -50);

        if (Math.random() < 0.02)
          newObstacles.push({ x: 800, y: 500, width: 50, height: 50 });

        return newObstacles;
      });

      gameRef.current = requestAnimationFrame(gameLoop);
    }

    gameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameRef.current !== null) {
        cancelAnimationFrame(gameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage width={800} height={600} options={{ backgroundColor: "#000" }}>
        <Graphics draw={ground} />
        <Sprite image="./sprites/ghost.png" x={100} y={500} />
        {obstacles.map((obs, index) => (
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
