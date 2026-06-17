import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { SubjectHeader } from "@/components/SubjectHeader";
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
      {/* Theme is driven by next-themes globally (html.light); human-history's
          .light .human-history-root rules respond to it. Search is the shared
          ⌘K global search (root ClientShell), which indexes history content. */}
      <Script
        src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
        strategy="afterInteractive"
      />
      <SubjectHeader subject="human-history" />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
