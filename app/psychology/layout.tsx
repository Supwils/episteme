import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import PsychologyNav from "@/components/psychology/PsychologyNav";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "心理学与认知科学 — Universe Knowledge",
  description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
  openGraph: {
    title: "心理学与认知科学 — Universe Knowledge",
    description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "心理学与认知科学 — Universe Knowledge",
    description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
  },
};

export default function PsychologyLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;

  return (
    <div className={`psychology-root ${fontVars}`}>
      <PsychologyNav />

      <main className="pt-16">
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] uppercase tracking-[0.32em]">
            psychology · cognitive science
          </span>
        </div>
      </footer>
    </div>
  );
}
