"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function CosmicWebPage() {
  useSyncTier("T1");
  return null;
}
