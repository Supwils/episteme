'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function ObservablePageClient() {
  useSyncTier("T0");
  return null;
}
