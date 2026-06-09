"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function P1Page() {
  useSyncTier("P1");
  return null;
}
