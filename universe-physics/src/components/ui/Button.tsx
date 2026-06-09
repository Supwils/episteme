"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "subtle";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-fg-primary text-bg-deep hover:bg-fg-secondary focus-visible:ring-fg-primary",
  ghost:
    "border border-fg-disabled/60 text-fg-secondary hover:border-fg-secondary hover:text-fg-primary focus-visible:ring-fg-secondary",
  subtle: "text-fg-secondary hover:text-fg-primary focus-visible:ring-fg-secondary",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "ghost", size = "md", className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "ease-product inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      {...rest}
    />
  );
});
