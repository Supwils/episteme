"use client";

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";

export default function ObservablePage() {
  useSyncTier("T0");
  return null;
}
