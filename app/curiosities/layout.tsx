import type { Metadata } from "next";
import Link from "next/link";
import { spaceGrotesk, plexMono } from "@/lib/fonts";
import { PageTransition } from "@/components/PageTransition";
import "../domain-shared.css";

export const metadata: Metadata = {
  title: "奇趣知识 — Universe Knowledge",
  description: "横跨十个学科的冷知识与「原来如此」时刻：那些少有人知、却真实而迷人的事实。",
  openGraph: {
    title: "奇趣知识 — Universe Knowledge",
    description: "横跨十个学科的冷知识与「原来如此」时刻。",
    type: "website",
  },
};

export default function CuriositiesLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;
  return (
    <div className={`domain-root ${fontVars}`}>
      <nav className="domain-nav-bar">
        <Link
          href="/"
          className="text-fg-muted hover:text-fg-primary inline-flex shrink-0 items-center gap-1 font-mono text-[12px] transition-colors"
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
        <span className="font-display text-fg-primary shrink-0 text-sm font-semibold">
          奇趣知识
        </span>
      </nav>
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
          curiosities · did you know
        </span>
      </footer>
    </div>
  );
}
