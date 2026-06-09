'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function EarthPageClient() {
  useSyncTier("T7");
  return null;
}
