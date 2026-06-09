"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function P4Page() {
  useSyncTier("P4");
  return null;
}
