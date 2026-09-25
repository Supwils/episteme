"use client";

import dynamic from "next/dynamic";
import { DemoLoading, DemoTabs } from "@/components/landing/DemoTabs";

const DEMOS = [
  {
    id: "dna",
    label: "DNA 双螺旋",
    Component: dynamic(() => import("@/subjects/life-science/components/visualizations/DNAHelix"), {
      ssr: false,
      loading: DemoLoading,
    }),
  },
  {
    id: "protein",
    label: "蛋白质折叠",
    Component: dynamic(
      () =>
        import("@/subjects/life-science/components/visualizations/ProteinFolding").then(
          (m) => m.ProteinFolding
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
  {
    id: "gene",
    label: "基因表达",
    Component: dynamic(
      () =>
        import("@/subjects/life-science/components/visualizations/GeneExpression").then(
          (m) => m.GeneExpression
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
  {
    id: "energy",
    label: "生态系统能量流动",
    Component: dynamic(
      () =>
        import("@/subjects/life-science/components/visualizations/EcosystemEnergyFlow").then(
          (m) => m.EcosystemEnergyFlow
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
];

export function LifeDemosModule() {
  return (
    <DemoTabs
      id="landing-life-demos"
      title="互动演示"
      note="从分子到生态系统，四个可以动手的模型。"
      demos={DEMOS}
    />
  );
}
