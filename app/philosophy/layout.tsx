import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";
// KaTeX stylesheet: articles in this domain render math via MarkdownRenderer
// (server-side renderToString), which needs these styles + fonts to display properly.
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "哲学思想 — Episteme · 格致",
  description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
  openGraph: {
    title: "哲学思想 — Episteme · 格致",
    description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "哲学思想 — Episteme · 格致",
    description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
  },
};

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;

  return (
    <div className={`philosophy-root ${fontVars}`}>
      <SubjectHeader subject="philosophy" />

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            philosophy · ideas atlas
          </span>
        </div>
      </footer>
    </div>
  );
}
