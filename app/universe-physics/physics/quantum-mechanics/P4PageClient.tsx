'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function P4PageClient() {
  useSyncTier("P4");
  return null;
}
