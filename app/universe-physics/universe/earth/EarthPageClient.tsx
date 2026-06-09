'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function EarthPageClient() {
  useSyncTier("T7");
  return null;
}
