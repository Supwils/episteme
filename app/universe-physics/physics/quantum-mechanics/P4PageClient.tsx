'use client';

import { useSyncTier } from "@/src-physics/hooks/useSyncTier";


export default function P4PageClient() {
  useSyncTier("P4");
  return null;
}
