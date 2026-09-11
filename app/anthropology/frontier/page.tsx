import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.anthropology.label} — Episteme · 格致`,
  description:
    "人类学与考古学当下的开放问题：古DNA与身份主张、数字遗产伦理、气候与遗址损失、归还之后的博物馆。",
};

export default function FrontierPage() {
  return <FrontierListView domain="anthropology" />;
}
