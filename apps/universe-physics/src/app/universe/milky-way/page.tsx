"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function MilkyWayPage() {
  useSyncTier("T4");
  return null;
}
