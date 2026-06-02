"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function EarthPage() {
  useSyncTier("T7");
  return null;
}
