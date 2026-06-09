'use client';

import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";


export default function P6PageClient() {
  useSyncTier("P6");
  return null;
}
