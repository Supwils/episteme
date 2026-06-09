"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function P2Page() {
  useSyncTier("P2");
  return null;
}
