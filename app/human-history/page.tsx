import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { EraStrip } from "@/components/landing/EraStrip";
import { ERAS } from "@/content/human-history/data/eras.js";
import { HISTORY_HOME_COUNTS, formatHomeYear } from "@/content/human-history/data/home-summary.js";
import { KB_ARTICLES } from "@/content/human-history/data/knowledge-base-data";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getSectionConfig } from "@/lib/new-domains";
import { HistoryTimelineModule } from "./HistoryTimelineModule";

export const metadata: Metadata = {
  title: "人类历史 — Episteme · 格致",
  description: "人类历史知识图谱——时间线、图谱、人物与地图，从远古到当代",
  openGraph: {
    title: "人类历史",
    description: "人类历史知识图谱——时间线、图谱、人物与地图，从远古到当代",
    type: "website",
  },
};

export default function HumanHistoryPage() {
  const sections = [
    {
      href: "/human-history/timeline",
      label: "时间线",
      description: "七大时代的关键事件，按年代逐条展开",
      count: HISTORY_HOME_COUNTS.events,
    },
    {
      href: "/human-history/figures",
      label: "人物",
      description: "塑造文明进程的关键人物，按地区与时代交叉浏览",
      count: HISTORY_HOME_COUNTS.figures,
    },
    {
      href: "/human-history/knowledge",
      label: "知识库",
      description: "从远古到当代的重大事件、文明与人物专题",
      count: KB_ARTICLES.length,
    },
    {
      href: "/human-history/atlas",
      label: "历史图谱",
      description: "探索历史事件、人物与时代之间的关联",
      tag: "交互图",
    },
    {
      href: "/human-history/civilizations",
      label: "文明对比",
      description: "用六维雷达图对比罗马、汉朝、波斯、蒙古等文明",
      tag: "对照",
    },
    {
      href: "/human-history/map",
      label: "历史地图",
      description: "可视化文明地理变迁的交互地图",
      tag: "地图",
    },
    {
      href: "/human-history/source-analyses",
      label: "史料剖析",
      description: getSectionConfig("human-history", "source-analyses")?.description ?? "",
      count: createKnowledgeSection("human-history", "source-analyses").getAll().length,
    },
    {
      href: "/human-history/scholarly",
      label: "深度讲稿",
      description: "严谨考据的学术级历史讲稿",
    },
    {
      href: "/human-history/lessons",
      label: "历史启示",
      description: "关键历史事件的深层启示",
    },
    {
      href: "/human-history/simulations",
      label: "历史模拟",
      description: "如果关键转折点的结局被改写，世界将走向何方",
      tag: "互动工具",
    },
  ];

  return (
    <DomainLanding
      domain="human-history"
      lede="从智人在非洲点燃第一堆篝火，到丝路上驼铃响动，到工业革命的蒸汽轰鸣，再到当下人工智能的奇点临近——把人类文明读成一条可触摸的长河。"
      sections={sections}
    >
      <EraStrip
        id="landing-history-eras"
        title="七大时代"
        note="每一幕都重塑了人类自我认识的边界。点击进入相应的时间线锚点。"
        eras={ERAS.map((era) => ({
          key: era.id,
          range: `${formatHomeYear(era.startYear)} — ${formatHomeYear(era.endYear)}`,
          title: era.name,
          description: era.desc,
          href: `/human-history/timeline#${era.id}`,
        }))}
      />
      <HistoryTimelineModule />
    </DomainLanding>
  );
}
