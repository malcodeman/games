export type State = {
  squares: (string | null)[];
  isXTurn: boolean;
  winningSquares: null | number[];
};

export type SelectItem = {
  label: string;
  value: string;
  disabled: boolean;
};
