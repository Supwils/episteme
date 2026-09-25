import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { EraStrip } from "@/components/landing/EraStrip";
import { universePhysicsDialogues } from "@/lib/universe-physics-dialogues";
import { universePhysicsKB } from "@/lib/universe-physics-kb";
import { PHYSICS_EXPERIMENTS } from "@/content/universe-physics/experiments-data";
import {
  PHYSICS_TIER_ORDER,
  PHYSICS_TIER_ROUTES,
  PHYSICS_TIERS,
} from "@/subjects/physics/lib/physics-tier";

export const metadata: Metadata = {
  title: "物理学 — Episteme · 格致",
  description:
    "从经典力学到量子场论，探索支配宇宙的基本定律——力学、电磁学、热力学、相对论与量子力学",
  openGraph: {
    title: "物理学",
    description:
      "从经典力学到量子场论，探索支配宇宙的基本定律——力学、电磁学、热力学、相对论与量子力学",
    type: "website",
  },
};

export default function PhysicsHomePage() {
  const sections = [
    {
      href: "/universe-physics/physics",
      label: "物理板块",
      description: "从经典力学到前沿研究的九层 3D 场景",
      tag: "3D",
    },
    {
      href: "/universe-physics/universe",
      label: "宇宙地图",
      description: "从可观测宇宙一路缩放到地球的尺度漫游",
      tag: "3D",
    },
    {
      href: "/universe-physics/experiments",
      label: "实验",
      description: "改变了物理学走向的关键实验",
      count: PHYSICS_EXPERIMENTS.length,
    },
    {
      href: "/universe-physics/dialogues",
      label: "对话",
      description: "玻尔与海森堡、麦克斯韦与法拉第等思想交锋",
      count: universePhysicsDialogues.getAll().length,
    },
    {
      href: "/universe-physics/knowledge-base",
      label: "知识库",
      description: "力学、热学、电磁、相对论与量子的深度专题",
      count: universePhysicsKB.getAllArticles().length,
    },
  ];

  return (
    <DomainLanding
      domain="universe-physics"
      lede="从经典力学到量子场论，探索支配宇宙的物理定律——力学、电磁学、热力学、相对论与量子力学。"
      sections={sections}
    >
      <EraStrip
        id="landing-physics-tiers"
        title="九层物理"
        note="理论由浅入深排成九层，每一层是一个可以走进去的 3D 场景。"
        eras={PHYSICS_TIER_ORDER.map((id) => ({
          key: id,
          range: `${id} · ${PHYSICS_TIERS[id].label}`,
          title: PHYSICS_TIERS[id].shortLabel,
          href: `/universe-physics/physics/${PHYSICS_TIER_ROUTES[id]}`,
        }))}
      />
    </DomainLanding>
  );
}
