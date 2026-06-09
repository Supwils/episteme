"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function LocalGroupPage() {
  useSyncTier("T3");
  return null;
}
