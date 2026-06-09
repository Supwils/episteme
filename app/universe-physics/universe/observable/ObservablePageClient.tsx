'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function ObservablePageClient() {
  useSyncTier("T0");
  return null;
}
