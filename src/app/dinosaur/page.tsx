"use client";
import { Stage, Sprite, Graphics } from "@pixi/react";
import { Graphics as GraphicsType } from "pixi.js";

const ground = (g: GraphicsType) => {
  g.clear();
  g.lineStyle(1, "#ccc");
  g.moveTo(0, 550); // Start position
  g.lineTo(800, 550); // End position
};

export default function DinosaurPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage width={800} height={600} options={{ backgroundColor: "#000" }}>
        <Graphics draw={ground} />
        <Sprite image="./sprites/ghost.png" x={100} y={500} />
      </Stage>
    </div>
  );
}
