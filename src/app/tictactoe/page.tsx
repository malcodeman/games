"use client";
import { useState } from "react";
import { map, isIncludedIn, shuffle, filter, length } from "remeda";
import { LuRotateCcw } from "react-icons/lu";
import { createListCollection, SelectValueChangeDetails } from "@ark-ui/react";
import { SelectItem, State } from "./types";
import { Square } from "./components/square";
import { Button } from "./ui/button";
import { Select } from "./ui/select";

const INITIAL_STATE: State = {
  squares: Array(9).fill(null),
  isXTurn: true,
  winningSquares: null,
};
const DIFFICULTY_COLLECTION = createListCollection({
  items: [
    { label: "Easy", value: "easy", disabled: false },
    { label: "Medium", value: "medium", disabled: true },
    { label: "Hard", value: "hard", disabled: true },
    { label: "Play against a friend", value: "friend", disabled: false },
  ],
});

export default function TicTacToePage() {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const isRestartDisabled = state.squares.every((item) => item === null);
  const [difficulty, setDifficulty] = useState<SelectItem[]>([
    { label: "Easy", value: "easy", disabled: false },
  ]);

  function calculateAiMove(squares: typeof state.squares, xTurnIndex: number) {
    const nextSquares = map(squares, (item, i) => {
      return {
        index: i,
        value: item,
      };
    });
    const filteredSquares = filter(
      nextSquares,
      (item) => item.value === null && item.index !== xTurnIndex,
    );

    if (length(filteredSquares) === 0) {
      return null;
    }

    return shuffle(filteredSquares)[0].index;
  }

  function handleAiMove(index: number) {
    const aiMove = calculateAiMove(state.squares, index);
    const nextSquares = map(state.squares, (item, i) =>
      i === index ? "X" : item,
    );
    const winningSquares = calculateWinningSquares(nextSquares);

    if (winningSquares || aiMove === null) {
      return nextSquares;
    }

    const nextAiSquares = map(nextSquares, (item, i) =>
      i === aiMove ? "O" : item,
    );

    return nextAiSquares;
  }

  function handlePlayerMove(index: number) {
    const nextSquares = map(state.squares, (item, i) =>
      i === index ? (state.isXTurn ? "X" : "O") : item,
    );

    return nextSquares;
  }

  function handleOnClick(index: number) {
    if (state.squares[index] || state.winningSquares) {
      return;
    }
    if (difficulty[0].value !== "friend") {
      const nextSquares = handleAiMove(index);
      const winningSquares = calculateWinningSquares(nextSquares);

      setState({
        squares: nextSquares,
        isXTurn: !state.isXTurn,
        winningSquares,
      });
      return;
    }
    const nextSquares = handlePlayerMove(index);
    const winningSquares = calculateWinningSquares(nextSquares);

    setState({
      squares: nextSquares,
      isXTurn: !state.isXTurn,
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

  function onDifficultyChange(details: SelectValueChangeDetails<SelectItem>) {
    setDifficulty(details.items);
    restartGame();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#221f22] text-[#fcfcfa]">
      <div>
        <Select
          label="Difficulty"
          className="mb-2"
          value={[difficulty[0].value]}
          collection={DIFFICULTY_COLLECTION}
          onValueChange={onDifficultyChange}
        />
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
        <div className="flex justify-center">
          <Button onClick={restartGame} disabled={isRestartDisabled}>
            Restart game <LuRotateCcw />
          </Button>
        </div>
      </div>
    </div>
  );
}
