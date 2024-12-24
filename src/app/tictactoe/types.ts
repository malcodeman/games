export type State = {
  squares: (string | null)[];
  isXTurn: boolean;
  winner: null | string;
  winningSquares: null | number[];
};

export type SelectItem = {
  label: string;
  value: string;
  disabled: boolean;
};
