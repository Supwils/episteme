import type { PhysicsTierId } from "@/src-physics/lib/physics-tier";
import type { TierContent } from "@/src-physics/lib/content";
import P0 from "./P0-classical-mechanics";
import P1 from "./P1-thermodynamics";
import P2 from "./P2-electromagnetism";
import P3 from "./P3-relativity";
import P4 from "./P4-quantum-mechanics";
import P5 from "./P5-atomic-molecular";
import P6 from "./P6-nuclear-particle";
import P7 from "./P7-standard-model";
import P8 from "./P8-frontier";

const REGISTRY: Partial<Record<PhysicsTierId, TierContent>> = {
  P0,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
  P7,
  P8,
};

export function getPhysicsContent(tier: string): TierContent | null {
  return REGISTRY[tier as PhysicsTierId] ?? null;
}

export function hasPhysicsContent(tier: string): boolean {
  return tier in REGISTRY;
}
