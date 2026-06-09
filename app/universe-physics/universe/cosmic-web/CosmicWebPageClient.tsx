'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function CosmicWebPageClient() {
  useSyncTier("T1");
  return null;
}
