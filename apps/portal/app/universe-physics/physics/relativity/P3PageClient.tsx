'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function P3PageClient() {
  useSyncTier("P3");
  return null;
}
