import type { Metadata } from "next";
import SimulationsClient from "./SimulationsClient";

export const metadata: Metadata = {
  title: "历史模拟 — 人类历史 — Episteme · 格致",
  description: "如果历史的关键转折点结局被改写，世界将走向何方？探索历史的蝴蝶效应",
  openGraph: {
    title: "历史模拟 — 人类历史",
    description: "如果历史的关键转折点结局被改写，世界将走向何方？探索历史的蝴蝶效应",
    type: "website",
  },
};

export default function SimulationsPage() {
  return <SimulationsClient />;
}
