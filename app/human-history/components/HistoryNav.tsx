"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchTrigger from "./SearchTrigger";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/human-history/timeline", label: "时间线", num: "01", key: "timeline" },
  { href: "/human-history/atlas", label: "知识图谱", num: "02", key: "atlas" },
  { href: "/human-history/graph", label: "关系图", num: "03", key: "graph" },
  { href: "/human-history/civilizations", label: "文明对比", num: "04", key: "civilizations" },
  { href: "/human-history/map", label: "大洲", num: "05", key: "map" },
  { href: "/human-history/figures", label: "人物", num: "06", key: "figures" },
  { href: "/human-history/lessons", label: "借鉴", num: "07", key: "lessons" },
  { href: "/human-history/scholarly", label: "深度阅读", num: "08", key: "scholarly" },
  { href: "/human-history/knowledge", label: "知识库", num: "09", key: "knowledge" },
  { href: "/human-history/frontier", label: "研究前沿", num: "10", key: "frontier" },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace("/human-history/", "").replace("/human-history", "");
  return segment.split("/")[0] || "";
}

export default function HistoryNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="nav-bar" aria-label="人类历史导航">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          className="nav-link"
          style={{
            fontSize: "0.82rem",
            color: "var(--parchment-dim)",
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
        <Link href="/human-history" className="nav-brand">
          人類史
        </Link>
      </div>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`nav-link${activeKey === item.key ? "active" : ""}`}
            data-page={item.key}
          >
            <span className="nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="nav-right">
        <SearchTrigger />
        <ThemeToggle />
      </div>
    </nav>
  );
}
