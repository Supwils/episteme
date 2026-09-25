import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { EraStrip } from "@/components/landing/EraStrip";
import { cosmologyDialogues } from "@/lib/cosmology-dialogues";
import { cosmologyKB } from "@/lib/cosmology-kb";
import { ScaleOfUniverse } from "@/subjects/cosmology/components/visualizations";
import { COSMOLOGY_ERAS } from "@/subjects/cosmology/lib/eras";
import {
  COSMOLOGY_TIER_ORDER,
  COSMOLOGY_TIER_ROUTES,
  COSMOLOGY_TIERS,
} from "@/subjects/cosmology/lib/tiers";
import { CosmologyVisualizations } from "./CosmologyVisualizations";

export const metadata: Metadata = {
  title: "宇宙学 — Episteme · 格致",
  description: "从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体",
  openGraph: {
    title: "宇宙学 — Episteme · 格致",
    description: "从可见宇宙的整体结构出发，沿尺度由大到小展开",
    type: "website",
  },
};

export default function CosmologyPage() {
  const sections = [
    {
      href: "/cosmology/universe",
      label: "宇宙地图",
      description: "从可观测宇宙到地球的跨尺度漫游",
      tag: "3D",
    },
    {
      href: "/cosmology/timeline",
      label: "时间线",
      description: "从大爆炸到今天的 138 亿年演化史",
      tag: "时间线",
    },
    {
      href: "/cosmology/stellar-evolution",
      label: "恒星演化",
      description: "赫罗图与恒星从诞生到死亡的一生",
      tag: "交互图",
    },
    {
      href: "/cosmology/knowledge-base",
      label: "知识库",
      description: "大爆炸、暗物质、引力波等深度专题文章",
      count: cosmologyKB.getAllArticles().length,
    },
    {
      href: "/cosmology/dialogues",
      label: "对话",
      description: "哈勃与勒梅特、彭罗斯与霍金的思想交锋",
      count: cosmologyDialogues.getAll().length,
    },
  ];

  return (
    <DomainLanding
      domain="cosmology"
      lede="从可见宇宙的整体结构出发，沿尺度由大到小展开：超星系团、星系群、太阳系、行星与天体。"
      sections={sections}
    >
      <EraStrip
        id="landing-cosmology-tiers"
        title="宇宙尺度层级"
        note="由大到小八个尺度，每一层都能走进 3D 地图。"
        eras={COSMOLOGY_TIER_ORDER.map((id) => ({
          key: id,
          range: `${id} · ${COSMOLOGY_TIERS[id].label}`,
          title: COSMOLOGY_TIERS[id].shortLabel,
          href: `/cosmology/universe/${COSMOLOGY_TIER_ROUTES[id]}`,
        }))}
      />
      <EraStrip
        id="landing-cosmology-eras"
        title="宇宙演化史"
        eras={COSMOLOGY_ERAS.map((era) => ({
          key: era.id,
          range: era.timeRange,
          title: era.name.primary,
          description: era.description,
          href: "/cosmology/timeline",
        }))}
      />
      <ScaleOfUniverse />
      <CosmologyVisualizations />
    </DomainLanding>
  );
}
