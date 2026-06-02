// @ts-check

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import GlobalSearch from "./components/GlobalSearch";
import PageTransition from "./components/PageTransition";
import SearchTrigger from "./components/SearchTrigger";
import "./globals.css";

export const metadata: Metadata = {
  title: "人类历史知识图谱",
  description: "交互式人类历史知识图谱，从公元前10000年到公元2025年",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('history-theme');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme:light)').matches))document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Script
          src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
          strategy="afterInteractive"
        />
        <nav className="nav-bar">
          <Link href="/" className="nav-brand">人类历史</Link>
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">首页</Link></li>
            <li><Link href="/timeline" className="nav-link">时间线</Link></li>
            <li><Link href="/atlas" className="nav-link">知识图谱</Link></li>
            <li><Link href="/graph" className="nav-link">关联图</Link></li>
            <li><Link href="/map" className="nav-link">世界地图</Link></li>
            <li><Link href="/figures" className="nav-link">人物</Link></li>
            <li><Link href="/lessons" className="nav-link">以史为鉴</Link></li>
          </ul>
          <div className="nav-right">
            <SearchTrigger />
          </div>
        </nav>
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <GlobalSearch />
      </body>
    </html>
  );
}
