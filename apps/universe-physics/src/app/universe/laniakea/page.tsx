"use client";

import { useSyncTier } from "@/hooks/useSyncTier";

export default function LaniakeaPage() {
  useSyncTier("T2");
  return null;
}
