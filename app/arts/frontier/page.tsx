import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.arts.label} — Episteme · 格致`,
  description: "艺术研究当下正在推进的前沿：新媒介、遗产科学、制度争议与审美认知。",
};

export default function FrontierPage() {
  return <FrontierListView domain="arts" />;
}
