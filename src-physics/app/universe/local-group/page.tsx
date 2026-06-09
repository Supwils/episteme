"use client";

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";

export default function LocalGroupPage() {
  useSyncTier("T3");
  return null;
}
