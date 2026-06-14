"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/philosophy/thinkers", label: "哲学家", num: "01", key: "thinkers" },
  { href: "/philosophy/schools", label: "流派", num: "02", key: "schools" },
  { href: "/philosophy/isms", label: "主义", num: "03", key: "isms" },
  { href: "/philosophy/experiments", label: "思想实验", num: "04", key: "experiments" },
  { href: "/philosophy/questions", label: "大问题", num: "05", key: "questions" },
  { href: "/philosophy/concepts", label: "概念", num: "06", key: "concepts" },
  { href: "/philosophy/dialogues", label: "对话", num: "07", key: "dialogues" },
  { href: "/philosophy/timeline", label: "时间线", num: "08", key: "timeline" },
  { href: "/philosophy/tree", label: "传承树", num: "09", key: "tree" },
  { href: "/philosophy/frontier", label: "前沿", num: "10", key: "frontier" },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace("/philosophy/", "").replace("/philosophy", "");
  return segment.split("/")[0] || "";
}

export default function PhilosophyNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="philosophy-nav-bar" aria-label="哲学导航">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          className="philosophy-nav-link"
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
        <Link href="/philosophy" className="philosophy-nav-brand">
          哲学
        </Link>
      </div>
      <div className="philosophy-nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`philosophy-nav-link${activeKey === item.key ? "active" : ""}`}
            data-page={item.key}
          >
            <span className="philosophy-nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
