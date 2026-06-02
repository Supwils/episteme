import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>404</span>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>页面未找到</h2>
      <p style={{ color: "var(--color-text-secondary)" }}>你寻找的历史篇章尚未被书写。</p>
      <Link href="/" style={{ color: "var(--color-accent)", textDecoration: "none" }}>← 返回首页</Link>
    </div>
  );
}
