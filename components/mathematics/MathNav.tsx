"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/mathematics/mathematicians", label: "数学家", num: "01", key: "mathematicians" },
  { href: "/mathematics/theorems", label: "定理", num: "02", key: "theorems" },
  { href: "/mathematics/concepts", label: "概念", num: "03", key: "concepts" },
  { href: "/mathematics/paradoxes", label: "悖论", num: "04", key: "paradoxes" },
  { href: "/mathematics/dialogues", label: "对话", num: "05", key: "dialogues" },
  { href: "/mathematics/timeline", label: "时间线", num: "06", key: "timeline" },
  { href: "/mathematics/frontier", label: "前沿", num: "07", key: "frontier" },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace("/mathematics/", "").replace("/mathematics", "");
  return segment || "";
}

export default function MathNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="math-nav-bar" aria-label="数学导航">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          className="math-nav-link"
          style={{
            fontSize: "0.82rem",
            color: "var(--color-fg-muted)",
            gap: "4px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          首页
        </Link>
        <Link href="/mathematics" className="math-nav-brand">
          数学
        </Link>
      </div>
      <div className="math-nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`math-nav-link${activeKey === item.key ? "active" : ""}`}
            data-page={item.key}
          >
            <span className="math-nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
