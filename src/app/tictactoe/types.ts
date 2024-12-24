export type State = {
  squares: (string | null)[];
  isXTurn: boolean;
  winner: null | string;
  winningSquares: null | number[];
};
