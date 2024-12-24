"use client";
import { useState } from "react";
import { map, set, values, isIncludedIn } from "remeda";
import { State } from "./types";
import { Square } from "./components/Square";

const INITIAL_STATE: State = {
  squares: Array(9).fill(null),
  isXTurn: true,
  winner: null,
  winningSquares: null,
};

export default function TicTacToePage() {
  const [state, setState] = useState<State>(INITIAL_STATE);

  function updateSquares(
    squares: typeof state.squares,
    index: number,
    value: string,
  ) {
    return values(set(squares, index, value));
  }

  function handleOnClick(index: number) {
    if (state.squares[index] || state.winner) {
      return;
    }

    const nextSquares = updateSquares(
      state.squares,
      index,
      state.isXTurn ? "X" : "O",
    );
    const winningSquares = calculateWinningSquares(nextSquares);

    setState({
      squares: nextSquares,
      isXTurn: !state.isXTurn,
      winner: winningSquares ? nextSquares[index] : null,
      winningSquares,
    });
  }

  function calculateWinningSquares(squares: typeof state.squares) {
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
        return [a, b, c];
      }
    }

    return null;
  }

  function restartGame() {
    setState(INITIAL_STATE);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <div>
        <div className="mb-2 grid grid-cols-3 gap-1">
          {map(state.squares, (item, index) => (
            <Square
              key={index}
              mark={item}
              index={index}
              isWinningSquare={isIncludedIn(index, state.winningSquares ?? [])}
              onClick={handleOnClick}
            />
          ))}
        </div>
        <button onClick={restartGame}>Restart game</button>
      </div>
    </div>
  );
}
