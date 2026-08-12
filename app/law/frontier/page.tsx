import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.law.label} — Episteme · 格致`,
  description: "法学研究当下正在推进的前沿：新技术、跨境制度、证据与新型权利边界。",
};

export default function FrontierPage() {
  return <FrontierListView domain="law" />;
}
