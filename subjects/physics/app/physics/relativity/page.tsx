"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function P3Page() {
  useSyncTier("P3");
  return null;
}
