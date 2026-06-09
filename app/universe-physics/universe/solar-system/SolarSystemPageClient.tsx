'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";
import SolarSystem from "@/subjects/physics/components/visualizations/SolarSystem";


export default function SolarSystemPageClient() {
  useSyncTier("T6");
  return (
    <div className="physics-root min-h-screen bg-bg-deep p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-fg-primary mb-2 text-2xl font-bold">太阳系</h1>
        <p className="text-fg-secondary mb-6 text-sm">
          八大行星围绕太阳运转——点击行星查看详细数据
        </p>
        <SolarSystem />
      </div>
    </div>
  );
}
