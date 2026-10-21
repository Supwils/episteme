"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";
import { ForceDiagram } from "@/subjects/physics/components/visualizations/ForceDiagram";

export default function P0PageClient() {
  useSyncTier("P0");
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-2 text-2xl font-bold text-gray-100">经典力学 — 力的分析</h2>
      <p className="mb-6 text-gray-400">
        通过交互式力图理解牛顿运动定律。选择场景、调节力的大小，观察合力与加速度的变化。
      </p>
      <ForceDiagram />
    </div>
  );
}
