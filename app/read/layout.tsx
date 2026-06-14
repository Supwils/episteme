import type { Metadata } from "next";
import Link from "next/link";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { PageTransition } from "@/components/PageTransition";
import "../domain-shared.css";

export const metadata: Metadata = {
  title: "阅读路线 — Universe Knowledge",
  description: "像读一本书那样探索知识：沿一条精心编排的路线，把一个主题从头读到尾。",
  openGraph: {
    title: "阅读路线 — Universe Knowledge",
    description: "像读一本书那样，沿一条精心编排的路线读完一个主题。",
    type: "website",
  },
};

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;
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
        <Link href="/read" className="font-display text-fg-primary shrink-0 text-sm font-semibold">
          阅读路线
        </Link>
      </nav>
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
          reading paths · read it like a book
        </span>
      </footer>
    </div>
  );
}
