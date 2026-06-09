import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  glass?: boolean;
  accent?: "default" | "gold" | "cool" | "sage" | "cinnabar";
}

const accentBorders: Record<NonNullable<PanelProps["accent"]>, string> = {
  default: "",
  gold: "border-l-2 border-l-[var(--uk-accent,#c8a45a)]",
  cool: "border-l-2 border-l-[var(--uk-accent,#6ad0ff)]",
  sage: "border-l-2 border-l-[var(--uk-accent-secondary,#7aaa8a)]",
  cinnabar: "border-l-2 border-l-[var(--uk-accent-secondary,#c8443a)]",
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ elevated, glass, accent = "default", className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/[0.06]",
        elevated && "bg-bg-elevated shadow-lg shadow-black/20",
        glass && "backdrop-blur-xl bg-bg-panel/80",
        !elevated && !glass && "bg-bg-panel",
        accentBorders[accent],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Panel.displayName = "Panel";
