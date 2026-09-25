import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import {
  getAllDebates,
  getAllDialogues,
  getAllDisorders,
  getAllExperiments,
  getAllKnowledgeBase,
  getAllPhenomena,
  getAllSchools,
  getAllTheorists,
} from "@/subjects/psychology/lib/mdx";
import { EmotionWheelModule } from "./EmotionWheelModule";

export const metadata: Metadata = {
  title: "心理学与认知科学 — Episteme · 格致",
  description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
  openGraph: {
    title: "心理学与认知科学",
    description: "从弗洛伊德到卡尼曼，探索心理学的理论、实验与思想流派",
    type: "website",
  },
};

export default function PsychologyHomePage() {
  const sections = [
    {
      href: "/psychology/theorists",
      label: "心理学家",
      description: "从弗洛伊德到卡尼曼，心理学巨匠的生平与理论",
      count: getAllTheorists().length,
    },
    {
      href: "/psychology/experiments",
      label: "经典实验",
      description: "改变心理学进程的里程碑实验与发现",
      count: getAllExperiments().length,
    },
    {
      href: "/psychology/phenomena",
      label: "心理现象",
      description: "认知偏差、社会效应与令人惊奇的心理规律",
      count: getAllPhenomena().length,
    },
    {
      href: "/psychology/schools",
      label: "学派",
      description: "从精神分析到认知革命，心理学的主要流派",
      count: getAllSchools().length,
    },
    {
      href: "/psychology/disorders",
      label: "心理障碍",
      description: "DSM 分类体系中的主要心理障碍与诊断",
      count: getAllDisorders().length,
    },
    {
      href: "/psychology/debates",
      label: "大争论",
      description: "先天与后天、自由意志与决定论等核心争论",
      count: getAllDebates().length,
    },
    {
      href: "/psychology/dialogues",
      label: "对话",
      description: "跨越时代的思想交锋与虚拟对话",
      count: getAllDialogues().length,
    },
    {
      href: "/psychology/knowledge-base",
      label: "知识库",
      description: "CBT 自助、正念科学、情绪智力——把心理科学转化为日常方法",
      count: getAllKnowledgeBase().length,
    },
    {
      href: "/psychology/methods",
      label: "研究方法",
      description: "从测量等值性、纵向模型到开放科学与数字表型",
      count: createKnowledgeSection("psychology", "methods").getAll().length,
    },
  ];

  return (
    <DomainLanding
      domain="psychology"
      lede="从弗洛伊德的潜意识到卡尼曼的双系统，从米尔格拉姆的服从实验到斯坦福监狱——一座跨越百年的心理学与认知科学知识图谱。"
      sections={sections}
    >
      <EmotionWheelModule />
    </DomainLanding>
  );
}
