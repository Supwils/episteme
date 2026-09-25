import type { Metadata } from "next";
import { DomainLanding } from "@/components/landing/DomainLanding";
import { EraStrip } from "@/components/landing/EraStrip";
import { mathematicsKB } from "@/lib/mathematics-kb";
import { getAllMathConcepts } from "@/subjects/mathematics/lib/concepts";
import { getAllMathDialogues } from "@/subjects/mathematics/lib/dialogues";
import { getAllMathEras } from "@/subjects/mathematics/lib/eras";
import { getAllMathematicians } from "@/subjects/mathematics/lib/mathematicians";
import { getAllMathParadoxes } from "@/subjects/mathematics/lib/paradoxes";
import { getAllTheorems } from "@/subjects/mathematics/lib/theorems";

export const metadata: Metadata = {
  title: "数学与逻辑 — Episteme · 格致",
  description: "从计数到范畴论，探索人类思维的最纯粹形式——数学家、定理、概念与对话",
  openGraph: {
    title: "数学与逻辑 — Episteme · 格致",
    description: "从计数到范畴论，探索人类思维的最纯粹形式",
    type: "website",
  },
};

export default function MathematicsHomePage() {
  const sections = [
    {
      href: "/mathematics/mathematicians",
      label: "数学家",
      description: "从欧几里得到陶哲轩，推动数学前进的人",
      count: getAllMathematicians().length,
    },
    {
      href: "/mathematics/theorems",
      label: "定理",
      description: "改变了数学版图的里程碑定理与它们的证明思路",
      count: getAllTheorems().length,
    },
    {
      href: "/mathematics/concepts",
      label: "概念",
      description: "从数与集合到群、流形与范畴的基本概念",
      count: getAllMathConcepts().length,
    },
    {
      href: "/mathematics/paradoxes",
      label: "悖论",
      description: "逼着数学重新检查自己地基的悖论",
      count: getAllMathParadoxes().length,
    },
    {
      href: "/mathematics/dialogues",
      label: "对话",
      description: "不同时代的数学家就同一个问题交锋",
      count: getAllMathDialogues().length,
    },
    {
      href: "/mathematics/knowledge-base",
      label: "深度阅读",
      description: "一个主题从直觉讲到前沿的长文",
      count: mathematicsKB.getAllArticles().length,
    },
    {
      href: "/mathematics/distributions",
      label: "概率分布",
      description: "拖动参数，看常见分布的形状怎样变化",
      tag: "互动工具",
    },
    {
      href: "/mathematics/timeline",
      label: "时间线",
      description: "按年代排开的数学家、定理与转折",
      tag: "时间线",
    },
  ];

  return (
    <DomainLanding
      domain="mathematics"
      lede="从计数到范畴论，从欧几里得到陶哲轩——探索人类思维最纯粹、最有力的形式。"
      sections={sections}
    >
      <EraStrip
        id="landing-math-eras"
        title="数学的时代"
        note="每个时代留下的那件关键事实，点任一段进入时间线。"
        eras={getAllMathEras().map((era) => ({
          key: era.id,
          range: era.period,
          title: era.name,
          description: era.keyFact,
          href: "/mathematics/timeline",
        }))}
      />
    </DomainLanding>
  );
}
