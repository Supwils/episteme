import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "生命科学与进化 — Episteme · 格致",
  description: "从第一个有机分子到人类意识，探索40亿年生命演化的壮阔历程",
  openGraph: {
    title: "生命科学与进化 — Episteme · 格致",
    description: "从第一个有机分子到人类意识，探索40亿年生命演化的壮阔历程",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "生命科学与进化 — Episteme · 格致",
    description: "从第一个有机分子到人类意识，探索40亿年生命演化的壮阔历程",
  },
};

export default function LifeScienceLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;

  return (
    <div className={`life-science-root ${fontVars}`}>
      <SubjectHeader subject="life-science" />

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            life science · evolution atlas
          </span>
        </div>
      </footer>
    </div>
  );
}
