import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "cool" | "sage" | "cinnabar" | "outline";
  size?: "sm" | "md";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-fg-muted/15 text-fg-secondary",
  gold: "bg-[#c8a45a]/15 text-[#c8a45a]",
  cool: "bg-[#6ad0ff]/15 text-[#6ad0ff]",
  sage: "bg-[#7aaa8a]/15 text-[#7aaa8a]",
  cinnabar: "bg-[#c8443a]/15 text-[#c8443a]",
  outline: "bg-transparent border border-fg-muted/30 text-fg-secondary",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "h-5 px-1.5 text-xs",
  md: "h-6 px-2 text-xs",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "sm", className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
