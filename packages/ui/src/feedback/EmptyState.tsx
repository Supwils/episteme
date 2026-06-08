import { cn } from "../utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: "book" | "search" | "compass" | "inbox";
  action?: { label: string; href: string };
  className?: string;
}

const icons: Record<NonNullable<EmptyStateProps["icon"]>, string> = {
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  compass: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zm-1.06 4.19l-3.75 7.5a.75.75 0 001.06.94l2.25-1.5 1.5 3a.75.75 0 001.38-.57l-1.5-3 3.75-1.5a.75.75 0 00-.57-1.38l-7.5 3.75a.75.75 0 00-.06 1.36z",
  inbox: "M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z",
};

export function EmptyState({ title, description, icon = "inbox", action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <svg
        className="w-12 h-12 text-fg-muted mb-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icons[icon]} />
      </svg>
      <h3 className="text-lg font-semibold text-fg-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-fg-secondary max-w-sm">{description}</p>
      )}
      {action && (
        <a
          href={action.href}
          className="mt-4 text-sm text-accent hover:underline"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
