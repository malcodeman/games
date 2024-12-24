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
        "flex h-16 w-16 cursor-pointer items-center justify-center bg-[#2d2a2e] p-3 text-6xl transition-all sm:h-20 sm:w-20 md:h-24 md:w-24",
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
