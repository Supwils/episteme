"use client";

import dynamic from "next/dynamic";
import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

const WaveVisualizer = dynamic(
  () =>
    import("@/subjects/physics/components/visualizations/WaveVisualizer").then(
      (m) => m.WaveVisualizer
    ),
  { ssr: false }
);

export default function P2PageClient() {
  useSyncTier("P2");
  return (
    <div className="bg-bg-deep min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-fg-primary text-2xl font-semibold">波动与振荡</h2>
        <p className="text-fg-secondary mt-2 text-sm">
          交互式波形可视化——探索正弦波、叠加原理、驻波与电磁波谱
        </p>
        <div className="border-fg-disabled/30 bg-bg-panel/30 mt-8 rounded-2xl border p-4 sm:p-6">
          <WaveVisualizer />
        </div>
      </div>
    </div>
  );
}
