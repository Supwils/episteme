import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md";
}

const sizeStyles: Record<NonNullable<KbdProps["size"]>, string> = {
  sm: "px-1 py-0.5 text-[0.6rem] rounded",
  md: "px-1.5 py-1 text-xs rounded-md",
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size = "sm", className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center gap-0.5 font-mono",
        "text-fg-disabled/60 border border-fg-muted/15 bg-fg-muted/5",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
);

Kbd.displayName = "Kbd";
