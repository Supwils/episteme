import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.engineering.label} — Episteme · 格致`,
  description: "工程研究当下正在推进的前沿：从实验性能走向制造、可靠性、标准与规模化。",
};

export default function FrontierPage() {
  return <FrontierListView domain="engineering" />;
}
