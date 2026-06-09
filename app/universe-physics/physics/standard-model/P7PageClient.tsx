'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";
import { StandardModel } from "@/subjects/physics/components/visualizations/StandardModel";

export default function P7PageClient() {
  useSyncTier("P7");
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <StandardModel />
    </div>
  );
}
