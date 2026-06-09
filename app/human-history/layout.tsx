import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import HistoryNav from "./components/HistoryNav";
import GlobalSearch from "./components/GlobalSearch";
import PageTransition from "./components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "人类历史 — Universe Knowledge",
  description: "交互式人类历史知识图谱，从公元前10000年到公元2025年",
  openGraph: {
    title: "人类历史 — Universe Knowledge",
    description: "交互式人类历史知识图谱，从公元前10000年到公元2025年",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "人类历史 — Universe Knowledge",
    description: "交互式人类历史知识图谱，从公元前10000年到公元2025年",
  },
};

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
      <HistoryNav />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <GlobalSearch />
    </div>
  );
}
