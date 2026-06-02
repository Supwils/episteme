import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: "book" | "search" | "compass";
};

const ICONS: Record<string, React.ReactNode> = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon = "compass",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-5 text-fg-disabled">{ICONS[icon]}</div>
      <p className="font-display text-lg font-semibold text-fg-muted">
        {title}
      </p>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-disabled">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 rounded-full border border-accent-gold/30 px-5 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-accent-gold transition-all duration-200 hover:border-accent-gold/60 hover:bg-accent-gold/10"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
