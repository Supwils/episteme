import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface TagBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "cool" | "sage" | "cinnabar" | "pink" | "outline";
  size?: "sm" | "md";
  href?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles: Record<NonNullable<TagBadgeProps["variant"]>, string> = {
  default: "bg-fg-muted/10 text-fg-secondary border-fg-muted/20",
  gold: "bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/25",
  cool: "bg-[#6ad0ff]/10 text-[#6ad0ff] border-[#6ad0ff]/25",
  sage: "bg-[#7aaa8a]/10 text-[#7aaa8a] border-[#7aaa8a]/25",
  cinnabar: "bg-[#c8443a]/10 text-[#c8443a] border-[#c8443a]/25",
  pink: "bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/25",
  outline: "bg-transparent text-fg-secondary border-fg-muted/30",
};

const sizeStyles: Record<NonNullable<TagBadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[9px] tracking-[0.12em]",
  md: "px-2.5 py-1 text-[10px] tracking-[0.14em]",
};

export const TagBadge = forwardRef<HTMLAnchorElement | HTMLSpanElement, TagBadgeProps>(
  ({ variant = "default", size = "sm", href, removable, onRemove, className, children, ...props }, ref) => {
    const sharedClasses = cn(
      "inline-flex items-center gap-1 font-mono rounded-full border whitespace-nowrap transition-colors duration-200",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const content = (
      <>
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full hover:bg-fg-muted/20 transition-colors"
            aria-label="移除标签"
          >
            <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-2 w-2">
              <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" />
            </svg>
          </button>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(sharedClasses, "no-underline hover:opacity-80 transition-opacity")}
          {...(props as HTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={sharedClasses}
        {...(props as HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  }
);

TagBadge.displayName = "TagBadge";
