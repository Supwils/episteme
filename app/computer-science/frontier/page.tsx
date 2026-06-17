import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG["computer-science"].label} — Episteme · 格致`,
  description: "该领域当下正在推进的研究前沿：开放问题、攻关团队、近年突破与未知边界。",
};

export default function FrontierPage() {
  return <FrontierListView domain="computer-science" />;
}
