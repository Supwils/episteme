"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function ObservablePage() {
  useSyncTier("T0");
  return null;
}
