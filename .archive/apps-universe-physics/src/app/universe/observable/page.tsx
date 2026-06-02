"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function ObservablePage() {
  useSyncTier("T0");
  return null;
}
