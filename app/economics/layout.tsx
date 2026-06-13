import type { Metadata } from "next";
import Link from "next/link";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "经济学、金融与博弈论 — Universe Knowledge",
  description: "探索市场机制与经济思想，从亚当·斯密到行为经济学——经济学、金融与博弈论知识平台",
  openGraph: {
    title: "经济学、金融与博弈论 — Universe Knowledge",
    description: "探索市场机制与经济思想，从亚当·斯密到行为经济学",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "经济学、金融与博弈论 — Universe Knowledge",
    description: "探索市场机制与经济思想，从亚当·斯密到行为经济学",
  },
};

const NAV_LINKS = [
  { href: "/economics", label: "首页", num: "00" },
  { href: "/economics/economists", label: "经济学家", num: "01" },
  { href: "/economics/theories", label: "理论", num: "02" },
  { href: "/economics/concepts", label: "概念", num: "03" },
  { href: "/economics/case-studies", label: "案例", num: "04" },
  { href: "/economics/schools", label: "学派", num: "05" },
  { href: "/economics/simulations", label: "模拟", num: "06" },
  { href: "/economics/debates", label: "辩论", num: "07" },
  { href: "/economics/dialogues", label: "对话", num: "08" },
  { href: "/economics/knowledge-base", label: "知识库", num: "09" },
  { href: "/economics/frontier", label: "前沿", num: "10" },
];

export default function EconomicsLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;

  return (
    <div className={`economics-root ${fontVars}`}>
      <nav className="economics-nav-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/"
            className="economics-nav-link"
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
          <Link href="/economics" className="economics-nav-brand">
            Economics
          </Link>
        </div>
        <ul className="economics-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="economics-nav-link">
                <span className="economics-nav-num">{link.num}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            economics · finance · game theory
          </span>
        </div>
      </footer>
    </div>
  );
}
