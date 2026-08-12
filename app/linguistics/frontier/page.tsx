import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.linguistics.label} — Episteme · 格致`,
  description: "语言学当下正在推进的前沿：社区复振、数据治理、跨语言比较与跨物种交流。",
};

export default function FrontierPage() {
  return <FrontierListView domain="linguistics" />;
}
