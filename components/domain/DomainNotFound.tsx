import Link from "next/link";

/**
 * Token-based 404 for dual-theme surfaces (engine domains and custom domains).
 * Keeps the reader inside the current domain instead of bouncing them to the
 * portal. Root unknown URLs use app/not-found.tsx.
 */
export function DomainNotFound({ homeHref, homeLabel }: { homeHref: string; homeLabel: string }) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-6">
      <div className="text-center">
        <p className="text-fg-disabled mb-4 text-8xl font-bold">404</p>
        <h2 className="text-fg-primary mb-4 text-2xl">页面未找到</h2>
        <p className="text-fg-secondary mb-8">您访问的页面不存在或已被移动。</p>
        <Link
          href={homeHref}
          className="border-border-subtle bg-bg-panel text-fg-primary hover:bg-bg-elevated rounded-full border px-6 py-2 transition-colors"
        >
          返回{homeLabel}
        </Link>
      </div>
    </div>
  );
}
