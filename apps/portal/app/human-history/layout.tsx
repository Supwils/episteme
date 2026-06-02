import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import GlobalSearch from "./components/GlobalSearch";
import PageTransition from "./components/PageTransition";
import SearchTrigger from "./components/SearchTrigger";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "人类历史知识图谱",
  description: "交互式人类历史知识图谱，从公元前10000年到公元2025年",
};

const NAV_ITEMS = [
  { href: "/human-history/", label: "首页" },
  { href: "/human-history/timeline", label: "时间线" },
  { href: "/human-history/atlas", label: "知识图谱" },
  { href: "/human-history/graph", label: "关联图" },
  { href: "/human-history/map", label: "世界地图" },
  { href: "/human-history/figures", label: "人物" },
  { href: "/human-history/lessons", label: "以史为鉴" },
  { href: "/human-history/knowledge", label: "知识库" },
];

export default function HumanHistoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="human-history-root">
      <Script
        id="history-theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('history-theme');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme:light)').matches))document.documentElement.classList.add('light')}catch(e){}`,
        }}
      />
      <Script
        src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
        strategy="afterInteractive"
      />
      <nav className="nav-bar">
        <Link href="/human-history/" className="nav-brand">人类历史</Link>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-link">{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <SearchTrigger />
        </div>
      </nav>
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <GlobalSearch />
    </div>
  );
}
