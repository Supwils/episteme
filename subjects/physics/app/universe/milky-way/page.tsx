"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function MilkyWayPage() {
  useSyncTier("T4");
  return null;
}
