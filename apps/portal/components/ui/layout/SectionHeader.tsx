import { cn } from "../utils/cn";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  accent?: "default" | "gold" | "cool" | "sage" | "cinnabar" | "indigo";
  action?: { label: string; href: string };
  count?: number;
  className?: string;
}

const accentColors: Record<NonNullable<SectionHeaderProps["accent"]>, string> = {
  default: "#9ca3af",
  gold: "#c8a45a",
  cool: "#6ad0ff",
  sage: "#7aaa8a",
  cinnabar: "#c8443a",
  indigo: "#6366f1",
};

export function SectionHeader({
  title,
  description,
  accent = "default",
  action,
  count,
  className,
}: SectionHeaderProps) {
  const color = accentColors[accent];

  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-4">
        <h2 className="font-display text-fg-primary text-[1.1rem] font-semibold tracking-tight">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
            {count}
          </span>
        )}
        <span
          aria-hidden
          className="h-px flex-1"
          style={{
            background: `linear-gradient(to right, ${color}33, transparent)`,
          }}
        />
        {action && (
          <a
            href={action.href}
            className="font-mono text-[11px] tracking-[0.16em] transition-opacity hover:opacity-80 no-underline"
            style={{ color }}
          >
            {action.label} →
          </a>
        )}
      </div>
      {description && (
        <p className="text-fg-secondary mt-1.5 text-[0.85rem] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
