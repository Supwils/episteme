import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { EraStrip } from "@/components/landing/EraStrip";
import { lifeScienceKB } from "@/lib/life-science-kb";
import { getAllDialogues } from "@/subjects/life-science/lib/dialogues";
import { getAllExtinctions } from "@/subjects/life-science/lib/extinctions";
import { ERAS } from "@/subjects/life-science/lib/home-data";
import { getAllScientists } from "@/subjects/life-science/lib/scientists";
import { getAllSpecies } from "@/subjects/life-science/lib/species";
import { LifeDemosModule } from "./LifeDemosModule";

export const metadata: Metadata = {
  title: "生命科学 — Episteme · 格致",
  description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
  openGraph: {
    title: "生命科学",
    description: "40亿年的生命演化史诗——从自我复制分子到寒武纪大爆发，从恐龙统治到人类崛起",
    type: "website",
  },
};

export default function LifeScienceHomePage() {
  const sections = [
    {
      href: "/life-science/timeline",
      label: "进化时间线",
      description: "40 亿年生命演化的关键节点与里程碑",
      tag: "时间线",
    },
    {
      href: "/life-science/tree",
      label: "生命之树",
      description: "从 LUCA 到现存物种的系统发育关系",
      tag: "交互图",
    },
    {
      href: "/life-science/species",
      label: "物种图鉴",
      description: "关键物种的详细档案与演化故事",
      count: getAllSpecies().length,
    },
    {
      href: "/life-science/food-web",
      label: "食物网",
      description: "生态系统中物种间的捕食关系与能量流动",
      tag: "交互图",
    },
    {
      href: "/life-science/extinctions",
      label: "大灭绝",
      description: "五次大灭绝事件的原因、过程与后果",
      count: getAllExtinctions().length,
    },
    {
      href: "/life-science/scientists",
      label: "科学家",
      description: "改变我们理解生命的科学家",
      count: getAllScientists().length,
    },
    {
      href: "/life-science/dialogues",
      label: "对话",
      description: "不同时代的生物学家就同一个问题交锋",
      count: getAllDialogues().length,
    },
    {
      href: "/life-science/knowledge-base",
      label: "知识库",
      description: "从细胞到生态的深度专题",
      count: lifeScienceKB.getAllArticles().length,
    },
  ];

  return (
    <DomainLanding
      domain="life-science"
      lede="40 亿年的故事，从分子到意识——从第一个自我复制的有机分子，到寒武纪的生命大爆发，从恐龙的统治到人类的崛起。"
      sections={sections}
    >
      <EraStrip
        id="landing-life-eras"
        title="地质时代"
        note="生命史按地质年代切开的几幕，点任一幕进入进化时间线。"
        eras={ERAS.map((era) => ({
          key: era.id,
          range: `${era.eraLabel} · ${era.era}`,
          title: era.title,
          description: era.description,
          href: era.href,
        }))}
      />
      <LifeDemosModule />
    </DomainLanding>
  );
}
