"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function P0Page() {
  useSyncTier("P0");
  return null;
}
