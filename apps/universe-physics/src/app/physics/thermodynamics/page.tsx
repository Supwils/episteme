"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function P1Page() {
  useSyncTier("P1");
  return null;
}
