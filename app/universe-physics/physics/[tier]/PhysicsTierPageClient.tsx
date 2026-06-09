'use client';

import { redirect } from "next/navigation";


import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";
import { physicsTierFromSlug } from "@/subjects/physics/lib/physics-tier";

export default function PhysicsTierPageClient({ params }: { params: { tier: string } }) {
  const tier = physicsTierFromSlug(params.tier);
  if (!tier) redirect("/universe-physics/physics/classical-mechanics");
  useSyncTier(tier);
  return null;
}
