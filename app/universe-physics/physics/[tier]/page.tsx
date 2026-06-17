import type { Metadata } from "next";
import { PHYSICS_TIER_ORDER, PHYSICS_TIER_ROUTES } from "@/subjects/physics/lib/physics-tier";
import PhysicsTierPageClient from "./PhysicsTierPageClient";

export function generateStaticParams() {
  return PHYSICS_TIER_ORDER.map((tierId) => ({ tier: PHYSICS_TIER_ROUTES[tierId] }));
}

export const metadata: Metadata = {
  title: "物理学板块 — 宇宙物理 — Episteme · 格致",
  description: "探索不同物理学分支的核心理论，从经典力学到前沿物理",
  openGraph: {
    title: "物理学板块 — 宇宙物理",
    description: "探索不同物理学分支的核心理论，从经典力学到前沿物理",
    type: "website",
  },
};

export default async function PhysicsTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const resolvedParams = await params;
  return <PhysicsTierPageClient params={resolvedParams} />;
}
