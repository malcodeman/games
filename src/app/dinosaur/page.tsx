"use client";
import { Stage, Text } from "@pixi/react";

export default function DinosaurPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <Stage width={800} height={600} options={{ backgroundColor: "#fff" }}>
        <Text text="Dinosaur" x={100} y={100} />
      </Stage>
    </div>
  );
}
