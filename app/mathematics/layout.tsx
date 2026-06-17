import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import { PageTransition } from "@/components/PageTransition";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "数学与逻辑 — Episteme · 格致",
  description: "从计数到范畴论，探索人类思维的最纯粹形式",
  openGraph: {
    title: "数学与逻辑 — Episteme · 格致",
    description: "从计数到范畴论，探索人类思维的最纯粹形式",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "数学与逻辑 — Episteme · 格致",
    description: "从计数到范畴论，探索人类思维的最纯粹形式",
  },
};

export default function MathematicsLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;

  return (
    <div className={`math-root ${fontVars}`}>
      <SubjectHeader subject="mathematics" />

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            mathematics · logic atlas
          </span>
        </div>
      </footer>
    </div>
  );
}
