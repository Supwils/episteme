"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/psychology/theorists", label: "心理学家", num: "01", key: "theorists" },
  { href: "/psychology/experiments", label: "经典实验", num: "02", key: "experiments" },
  { href: "/psychology/phenomena", label: "心理现象", num: "03", key: "phenomena" },
  { href: "/psychology/schools", label: "学派", num: "04", key: "schools" },
  { href: "/psychology/disorders", label: "心理障碍", num: "05", key: "disorders" },
  { href: "/psychology/debates", label: "大争论", num: "06", key: "debates" },
  { href: "/psychology/dialogues", label: "对话", num: "07", key: "dialogues" },
  { href: "/psychology/frontier", label: "前沿", num: "08", key: "frontier" },
];

function getActiveKey(pathname: string): string {
  const segment = pathname.replace("/psychology/", "").replace("/psychology", "");
  return segment || "";
}

export default function PsychologyNav() {
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <nav className="psychology-nav-bar" aria-label="心理学导航">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          className="psychology-nav-link"
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
        <Link href="/psychology" className="psychology-nav-brand">
          心理学
        </Link>
      </div>
      <div className="psychology-nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`psychology-nav-link${activeKey === item.key ? "active" : ""}`}
            data-page={item.key}
          >
            <span className="psychology-nav-num">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
