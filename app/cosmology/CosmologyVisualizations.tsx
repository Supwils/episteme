"use client";

import dynamic from "next/dynamic";
import { DemoLoading, DemoTabs } from "@/components/landing/DemoTabs";

const DEMOS = [
  {
    id: "black-hole",
    label: "黑洞",
    Component: dynamic(
      () =>
        import("@/subjects/cosmology/components/visualizations/BlackHoleVisualizer").then(
          (m) => m.BlackHoleVisualizer
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
  {
    id: "gravity",
    label: "引力模拟",
    Component: dynamic(
      () =>
        import("@/subjects/cosmology/components/visualizations/GravitySimulation").then(
          (m) => m.GravitySimulation
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
  {
    id: "distance-ladder",
    label: "宇宙距离阶梯",
    Component: dynamic(
      () =>
        import("@/subjects/cosmology/components/visualizations/CosmicDistanceLadder").then(
          (m) => m.CosmicDistanceLadder
        ),
      { ssr: false, loading: DemoLoading }
    ),
  },
];

export function CosmologyVisualizations() {
  return (
    <DemoTabs
      id="landing-cosmology-demos"
      title="互动演示"
      note="黑洞附近的光线弯曲、多体引力，以及天文学家怎样一级一级量出宇宙的距离。"
      demos={DEMOS}
    />
  );
}
