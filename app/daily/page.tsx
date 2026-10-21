import type { Metadata } from "next";
import { getDailySelected } from "@/lib/daily-selector";
import { DailyShuffle } from "@/components/DailyShuffle";

export const metadata: Metadata = {
  title: "每日知识 — Episteme · 格致",
  description: "今天的历史、科学与哲学，每天一点新知识，还可随时「换一批」探索更多",
  openGraph: {
    title: "每日知识 — Episteme · 格致",
    description: "今天的历史、科学与哲学",
    type: "website",
  },
};

// A calendar boundary requires a fresh request, rather than stale-first ISR.
export const dynamic = "force-dynamic";

export default function DailyPage() {
  return <DailyShuffle initial={getDailySelected(new Date())} />;
}
