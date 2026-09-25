import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import {
  getAllCaseStudies,
  getAllConcepts,
  getAllDebates,
  getAllDialogues,
  getAllEconomists,
  getAllKnowledgeBase,
  getAllSchools,
  getAllTheories,
} from "@/subjects/economics/lib/mdx";
import { MacroDiagnosticsMatrix } from "./MacroDiagnosticsMatrix";

export const metadata: Metadata = {
  title: "经济学 — Episteme · 格致",
  description: "从亚当·斯密到现代博弈论，探索市场机制与经济思想的知识殿堂。",
};

export default function EconomicsPage() {
  const sections = [
    {
      href: "/economics/economists",
      label: "经济学家",
      description: "从亚当·斯密到现代诺贝尔奖得主，经济学巨匠的生平与思想",
      count: getAllEconomists().length,
    },
    {
      href: "/economics/theories",
      label: "经济理论",
      description: "微观、宏观、国际、发展、行为经济学等核心理论体系",
      count: getAllTheories().length,
    },
    {
      href: "/economics/concepts",
      label: "经济学概念",
      description: "GDP、通货膨胀、边际效用、机会成本等基础与进阶概念",
      count: getAllConcepts().length,
    },
    {
      href: "/economics/case-studies",
      label: "经济案例",
      description: "大萧条、金融危机、日本泡沫、国家宏观诊断——真实经济事件深度分析",
      count: getAllCaseStudies().length,
    },
    {
      href: "/economics/policy-analyses",
      label: "政策剖析",
      description: "从反事实、机制、执行摩擦与分配后果，重读真实公共政策",
      count: createKnowledgeSection("economics", "policy-analyses").getAll().length,
    },
    {
      href: "/economics/schools",
      label: "经济学派",
      description: "古典、新古典、凯恩斯、奥地利、行为经济学等思想流派",
      count: getAllSchools().length,
    },
    {
      href: "/economics/debates",
      label: "经济学辩论",
      description: "政府干预与自由市场、供给侧与需求侧等经典论战",
      count: getAllDebates().length,
    },
    {
      href: "/economics/dialogues",
      label: "经济学对话",
      description: "跨越时代的经济学思想交锋与对话",
      count: getAllDialogues().length,
    },
    {
      href: "/economics/knowledge-base",
      label: "知识库",
      description: "外汇、股票、债券、房产、退休规划等实用经济学指南",
      count: getAllKnowledgeBase().length,
    },
    {
      href: "/economics/simulations",
      label: "互动模拟",
      description: "供需、经济循环、通胀计算、博弈矩阵与纳什均衡",
      tag: "互动工具",
    },
  ];

  return (
    <DomainLanding
      domain="economics"
      lede="从亚当·斯密的看不见的手到纳什均衡的博弈智慧，从凯恩斯的宏观调控到行为经济学的心理洞察——一座探索市场机制与经济思想的知识殿堂。"
      sections={sections}
    >
      <MacroDiagnosticsMatrix />
    </DomainLanding>
  );
}
