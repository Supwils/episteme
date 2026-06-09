'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function P1PageClient() {
  useSyncTier("P1");
  return null;
}
