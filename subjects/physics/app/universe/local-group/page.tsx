"use client";

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";

export default function LocalGroupPage() {
  useSyncTier("T3");
  return null;
}
