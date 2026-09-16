import type { Metadata } from "next";
import { FrontierListView } from "@/components/frontier/FrontierListView";
import { FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

export const metadata: Metadata = {
  title: `研究前沿 — ${FRONTIER_DOMAIN_CONFIG.education.label} — Episteme · 格致`,
  description: "教育学当下的开放问题：疫情后的学习贫困、阅读科学立法、生成式评估与高风险教育系统。",
};

export default function FrontierPage() {
  return <FrontierListView domain="education" />;
}
