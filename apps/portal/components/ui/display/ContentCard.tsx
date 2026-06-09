import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  subtitle?: string;
  tags?: string[];
  accentColor?: string;
  href?: string;
  icon?: React.ReactNode;
  meta?: string;
}

export const ContentCard = forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      title,
      description,
      subtitle,
      tags,
      accentColor = "#6366f1",
      href,
      icon,
      meta,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardContent = (
      <>
        <div
          aria-hidden
          className="h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
          {(icon || subtitle || meta) && (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {icon && (
                  <span className="mb-2 inline-block text-lg" style={{ color: accentColor }}>
                    {icon}
                  </span>
                )}
                <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-[1.05rem] font-semibold leading-snug transition-colors duration-300">
                  {title}
                </h3>
                {subtitle && (
                  <p
                    className="mt-0.5 font-mono text-[11px] italic tracking-wider"
                    style={{ color: `${accentColor}cc` }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
              {meta && (
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.2em] shrink-0"
                  style={{ color: accentColor }}
                >
                  {meta}
                </span>
              )}
            </div>
          )}

          {!icon && !subtitle && !meta && (
            <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-[1.05rem] font-semibold leading-snug transition-colors duration-300">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-fg-secondary/80 line-clamp-2 text-[0.82rem] leading-relaxed">
              {description}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border-fg-disabled/20 text-fg-disabled rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.12em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {children}

          <span
            aria-hidden
            className="text-fg-disabled group-hover:text-accent-gold mt-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>

        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: accentColor }}
        />
      </>
    );

    const wrapperClasses = cn(
      "group relative flex h-full flex-col overflow-hidden border transition-all duration-500",
      "bg-white/[0.02] border-white/[0.06]",
      "hover:bg-white/[0.04] hover:border-white/[0.1]",
      "hover:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.08)]",
      href && "cursor-pointer no-underline",
      className
    );

    if (href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={wrapperClasses} {...(props as HTMLAttributes<HTMLAnchorElement>)}>
          {cardContent}
        </a>
      );
    }

    return (
      <div ref={ref} className={wrapperClasses} {...props}>
        {cardContent}
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";
