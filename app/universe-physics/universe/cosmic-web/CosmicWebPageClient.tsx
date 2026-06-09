'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function CosmicWebPageClient() {
  useSyncTier("T1");
  return null;
}
