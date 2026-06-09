'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function P8PageClient() {
  useSyncTier("P8");
  return null;
}
