'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function LocalGroupPageClient() {
  useSyncTier("T3");
  return null;
}
