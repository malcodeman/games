import { cn } from "@/utils";

type Props = React.ComponentPropsWithoutRef<"button">;

export function Button(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1 bg-[#403e41] px-4 text-base font-medium text-[#fcfcfa] hover:bg-[#5b595c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd866] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
