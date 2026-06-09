"use client";

import dynamic from "next/dynamic";

const BlackHoleVisualizer = dynamic(
  () => import("@/subjects/cosmology/components/visualizations/BlackHoleVisualizer").then((m) => ({ default: m.BlackHoleVisualizer })),
  { ssr: false },
);

const GravitySimulation = dynamic(
  () => import("@/subjects/cosmology/components/visualizations/GravitySimulation").then((m) => ({ default: m.GravitySimulation })),
  { ssr: false },
);

const CosmicDistanceLadder = dynamic(
  () => import("@/subjects/cosmology/components/visualizations/CosmicDistanceLadder").then((m) => ({ default: m.CosmicDistanceLadder })),
  { ssr: false },
);

export function CosmologyVisualizations() {
  return (
    <>
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">黑洞可视化</h2>
        <BlackHoleVisualizer />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">引力模拟</h2>
        <GravitySimulation />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">宇宙距离阶梯</h2>
        <CosmicDistanceLadder />
      </section>
    </>
  );
}
