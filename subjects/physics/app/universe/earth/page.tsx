"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function EarthPage() {
  useSyncTier("T7");
  return null;
}
