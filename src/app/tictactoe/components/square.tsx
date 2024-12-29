import { cn } from "@/utils";

type Props = {
  mark: string | null;
  index: number;
  isWinningSquare: boolean;
  onClick: (index: number) => void;
};

export function Square(props: Props) {
  const { mark, index, isWinningSquare, onClick } = props;

  return (
    <div
      role="button"
      className={cn(
        "flex size-16 cursor-pointer items-center justify-center bg-[#2d2a2e] p-3 text-4xl font-semibold transition-all sm:size-20 sm:text-5xl md:size-24 md:text-6xl lg:size-32 lg:text-7xl",
        {
          "bg-[#ffd866] text-[#2d2a2e]": isWinningSquare,
        },
      )}
      onClick={() => onClick(index)}
    >
      {mark}
    </div>
  );
}
