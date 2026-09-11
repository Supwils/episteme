import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.religion.label} — Episteme · 格致`,
  description: "宗教学当下正在推进的前沿：比较方法、全球南方、数字宗教与世俗化测量。",
};

export default function FrontierPage() {
  return <FrontierListView domain="religion" />;
}
