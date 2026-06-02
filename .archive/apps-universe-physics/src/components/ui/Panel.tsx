import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export function Panel({ elevated = false, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "border-fg-disabled/30 rounded-xl border p-6 backdrop-blur-xl",
        elevated ? "bg-bg-elevated" : "bg-bg-panel",
        className,
      )}
      {...rest}
    />
  );
}
