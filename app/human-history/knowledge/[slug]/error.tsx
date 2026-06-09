"use client";

import Link from "next/link";

export default function KnowledgeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem", textAlign: "center", padding: "1rem" }}>
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem", color: "var(--color-text-tertiary, #666)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        出错了
      </span>
      <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.5rem" }}>页面加载失败</h2>
      <p style={{ color: "var(--color-text-secondary, #999)", maxWidth: "28rem", lineHeight: 1.6 }}>
        {error.message || "加载知识条目时发生未知错误。"}
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={reset}
          style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-accent, #818cf8)", background: "transparent", color: "var(--color-accent, #818cf8)", cursor: "pointer" }}
        >
          重试
        </button>
        <Link
          href="/human-history/"
          style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-text-tertiary, #666)", background: "transparent", color: "var(--color-text-secondary, #999)", textDecoration: "none" }}
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
