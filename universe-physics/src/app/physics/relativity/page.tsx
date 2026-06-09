"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function P3Page() {
  useSyncTier("P3");
  return null;
}
