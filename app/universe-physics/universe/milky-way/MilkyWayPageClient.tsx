'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function MilkyWayPageClient() {
  useSyncTier("T4");
  return null;
}
