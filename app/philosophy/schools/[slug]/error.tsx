"use client";

import Link from "next/link";

export default function SchoolError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-accent-gold">
        出错了
      </p>
      <h1 className="font-display text-fg-primary mt-4 text-2xl font-bold">
        页面加载失败
      </h1>
      <p className="text-fg-muted mt-3 text-sm leading-relaxed">
        {error.message || "加载哲学流派详情时发生未知错误。"}
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 border px-5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
        >
          重试
        </button>
        <Link
          href="/philosophy/schools"
          className="border-border-faint text-fg-muted hover:text-fg-primary border px-5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
        >
          返回列表
        </Link>
      </div>
    </div>
  );
}
