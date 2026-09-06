import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.literature.label} — Episteme · 格致`,
  description: "文学研究当下正在推进的前沿：数字人文、生成文本、世界文学市场与版权制度。",
};

export default function FrontierPage() {
  return <FrontierListView domain="literature" />;
}
