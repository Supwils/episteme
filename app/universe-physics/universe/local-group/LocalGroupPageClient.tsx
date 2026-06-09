'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function LocalGroupPageClient() {
  useSyncTier("T3");
  return null;
}
