'use client';

import { redirect } from "next/navigation";


import { useSyncTier } from "@/subjects/physics/hooks/useSyncTier";
import { tierFromSlug } from "@/subjects/physics/lib/tier";

export default function UniverseTierPageClient({ params }: { params: { tier: string } }) {
  const tier = tierFromSlug(params.tier);
  if (!tier) redirect("/universe-physics/universe/observable");
  useSyncTier(tier);
  return null;
}
