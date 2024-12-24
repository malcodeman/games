"use client";
import { useState } from "react";
import { map, set, values } from "remeda";
import { Squares } from "./types";

const SQUARES_INITIAL_STATE: Squares = Array(9).fill(null);

export default function TicTacToePage() {
  const [squares, setSquares] = useState(SQUARES_INITIAL_STATE);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<null | string>(null);

  function updateSquares(squares: Squares, index: number, value: string) {
    return values(set(squares, index, value));
  }

  function handleOnClick(index: number) {
    if (squares[index] || winner) {
      return;
    }

    const nextSquares = updateSquares(squares, index, isXTurn ? "X" : "O");
    const nextWinner = calculateWinner(nextSquares);

    setSquares(nextSquares);
    setIsXTurn(!isXTurn);
    setWinner(nextWinner);
  }

  function calculateWinner(squares: Squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  function restartGame() {
    setSquares(SQUARES_INITIAL_STATE);
    setIsXTurn(true);
    setWinner(null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <div>
        <div className="mb-2 grid grid-cols-3 gap-1">
          {map(squares, (item, index) => (
            <div
              key={index}
              role="button"
              className="flex h-16 w-16 cursor-pointer items-center justify-center bg-[#2d2a2e] p-3 text-6xl sm:h-20 sm:w-20 md:h-24 md:w-24"
              onClick={() => handleOnClick(index)}
            >
              {item}
            </div>
          ))}
        </div>
        <button onClick={restartGame}>Restart game</button>
      </div>
    </div>
  );
}
