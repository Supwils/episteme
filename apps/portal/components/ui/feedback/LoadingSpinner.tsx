import { cn } from "../utils/cn";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "default" | "indigo" | "amber" | "emerald" | "pink" | "cool";
  label?: string;
  className?: string;
}

const sizeStyles: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-[1.5px]",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

const colorStyles: Record<NonNullable<LoadingSpinnerProps["color"]>, string> = {
  default: "border-white/10 border-t-white/60",
  indigo: "border-indigo-400/20 border-t-indigo-400",
  amber: "border-amber-500/20 border-t-amber-400",
  emerald: "border-emerald-500/20 border-t-emerald-400",
  pink: "border-pink-500/20 border-t-pink-400",
  cool: "border-fg-disabled border-t-accent-cool",
};

const labelSizeStyles: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function LoadingSpinner({
  size = "md",
  color = "default",
  label,
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn("animate-spin rounded-full", sizeStyles[size], colorStyles[color])}
        role="status"
        aria-label={label ?? "加载中"}
      />
      {label && (
        <p className={cn("text-fg-secondary", labelSizeStyles[size])}>{label}</p>
      )}
    </div>
  );
}
