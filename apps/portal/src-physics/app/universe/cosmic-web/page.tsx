"use client";

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";

export default function CosmicWebPage() {
  useSyncTier("T1");
  return null;
}
