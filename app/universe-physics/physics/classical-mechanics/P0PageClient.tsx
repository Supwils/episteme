'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";
import { ForceDiagram } from "@/src-physics/components/visualizations/ForceDiagram";


export default function P0PageClient() {
  useSyncTier("P0");
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">经典力学 — 力的分析</h1>
      <p className="text-gray-400 mb-6">
        通过交互式力图理解牛顿运动定律。选择场景、调节力的大小，观察合力与加速度的变化。
      </p>
      <ForceDiagram />
    </div>
  );
}
