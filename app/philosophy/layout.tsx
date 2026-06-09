import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "./fonts";
import PhilosophyNav from "@/components/philosophy/PhilosophyNav";
import { PageTransition } from "@/components/PageTransition";
import { PhilosophyProgressWrapper } from "@/subjects/philosophy/components/PhilosophyProgressWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "哲学思想 — Universe Knowledge",
  description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
  openGraph: {
    title: "哲学思想 — Universe Knowledge",
    description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "哲学思想 — Universe Knowledge",
    description: "从古希腊到当代的哲学知识图谱，探索东西方思想的脉络与传承",
  },
};

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;

  return (
    <div className={`philosophy-root ${fontVars}`}>
      <PhilosophyProgressWrapper />
      <PhilosophyNav />

      <main className="pt-16">
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] uppercase tracking-[0.32em]">
            philosophy · ideas atlas
          </span>
        </div>
      </footer>
    </div>
  );
}
