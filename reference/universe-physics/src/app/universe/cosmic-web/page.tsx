"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function CosmicWebPage() {
  useSyncTier("T1");
  return null;
}
