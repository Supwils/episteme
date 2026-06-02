"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function P0Page() {
  useSyncTier("P0");
  return null;
}
