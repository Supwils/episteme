"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/life-science/timeline", label: "进化时间线", num: "01", key: "timeline" },
  { href: "/life-science/tree", label: "生命之树", num: "02", key: "tree" },
  { href: "/life-science/species", label: "物种图鉴", num: "03", key: "species" },
  { href: "/life-science/food-web", label: "食物网", num: "04", key: "food-web" },
  { href: "/life-science/extinctions", label: "大灭绝", num: "05", key: "extinctions" },
  { href: "/life-science/scientists", label: "科学家", num: "06", key: "scientists" },
  { href: "/life-science/dialogues", label: "对话", num: "07", key: "dialogues" },
  { href: "/life-science/knowledge-base", label: "知识库", num: "08", key: "knowledge-base" },
  { href: "/life-science/frontier", label: "前沿", num: "09", key: "frontier" },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace("/life-science/", "").replace("/life-science", "");
  return segment.split("/")[0] || "";
}

export default function LifeScienceNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="life-science-nav-bar" aria-label="生命科学导航">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          className="life-science-nav-link"
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
        <Link href="/life-science" className="life-science-nav-brand">
          生命科学
        </Link>
      </div>
      <div className="life-science-nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`life-science-nav-link${activeKey === item.key ? "active" : ""}`}
            data-page={item.key}
          >
            <span className="life-science-nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
