import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <span className="font-mono text-[10px] tracking-[0.42em] uppercase text-fg-muted">
        404 · not found
      </span>
      <h1 className="font-display text-3xl text-fg-primary">此路不通</h1>
      <p className="text-fg-secondary text-sm max-w-md text-center leading-relaxed">
        你所寻找的页面不存在。它可能已被移除，或从未存在过——正如哲学中的许多问题一样。
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.28em] uppercase text-accent-gold hover:text-accent-gold-bright transition-colors"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
