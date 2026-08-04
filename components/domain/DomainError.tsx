"use client";

/**
 * Token-based error fallback for engine-driven domains. The root app/error.tsx
 * hardcodes dark-theme colors, which breaks the light ("Notebook") theme —
 * domain-level error.tsx files should use this instead. Domain labels are
 * passed per domain so the retry/home actions stay in context.
 */
export function DomainError({
  homeHref,
  homeLabel,
  reset,
}: {
  homeHref: string;
  homeLabel: string;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="text-fg-primary text-xl font-semibold">出了点问题</h2>
      <p className="text-fg-secondary text-sm">
        页面加载时遇到错误，你可以重试或返回{homeLabel}首页。
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 rounded border px-4 py-2 text-sm transition-colors"
        >
          重试
        </button>
        <a
          href={homeHref}
          className="border-border-subtle text-fg-secondary hover:text-fg-primary rounded border px-4 py-2 text-sm transition-colors"
        >
          返回{homeLabel}
        </a>
      </div>
    </div>
  );
}
