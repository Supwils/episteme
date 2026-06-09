'use client';

import { redirect } from "next/navigation";


import { useSyncTier } from "@/src-physics/hooks/useSyncTier";
import { physicsTierFromSlug } from "@/src-physics/lib/physics-tier";

export default function PhysicsTierPageClient({ params }: { params: { tier: string } }) {
  const tier = physicsTierFromSlug(params.tier);
  if (!tier) redirect("/universe-physics/physics/classical-mechanics");
  useSyncTier(tier);
  return null;
}
