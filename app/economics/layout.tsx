import type { Metadata } from "next";
import { spaceGrotesk, plexMono } from "./fonts";
import { SubjectHeader } from "@/components/SubjectHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "经济学、金融与博弈论 — Universe Knowledge",
  description: "探索市场机制与经济思想，从亚当·斯密到行为经济学——经济学、金融与博弈论知识平台",
  openGraph: {
    title: "经济学、金融与博弈论 — Universe Knowledge",
    description: "探索市场机制与经济思想，从亚当·斯密到行为经济学",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "经济学、金融与博弈论 — Universe Knowledge",
    description: "探索市场机制与经济思想，从亚当·斯密到行为经济学",
  },
};

export default function EconomicsLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${spaceGrotesk.variable} ${plexMono.variable}`;

  return (
    <div className={`economics-root ${fontVars}`}>
      <SubjectHeader subject="economics" />

      <main>{children}</main>

      <footer className="border-border-faint border-t px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
            economics · finance · game theory
          </span>
        </div>
      </footer>
    </div>
  );
}
