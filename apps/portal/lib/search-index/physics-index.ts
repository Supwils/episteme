import type { SearchDocument } from "./types";

const TIER_ROUTES: Record<string, string> = {
  T0: "observable",
  T1: "cosmic-web",
  T2: "laniakea",
  T3: "local-group",
  T4: "milky-way",
  T5: "stellar-neighborhood",
  T6: "solar-system",
  T7: "earth",
};

const PHYSICS_ROUTES: Record<string, string> = {
  P0: "classical-mechanics",
  P1: "thermodynamics",
  P2: "electromagnetism",
  P3: "relativity",
  P4: "quantum-mechanics",
  P5: "atomic-molecular",
  P6: "nuclear-particle",
  P7: "standard-model",
  P8: "frontier",
};

interface TierData {
  tier: string;
  tagline: string;
  name: {
    primary: string;
    latin?: string;
  };
}

export function indexPhysics(
  cosmosMods: Array<{ default: TierData }>,
  physicsMods: Array<{ default: TierData }>,
  experimentsDataMod: { PHYSICS_EXPERIMENTS: ReadonlyArray<{ id: string; title: string; subtitle: string; year: string; field: string; description: string }> } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const mod of cosmosMods) {
    const tier = mod.default;
    const slug = TIER_ROUTES[tier.tier] ?? tier.tier.toLowerCase();
    docs.push({
      id: `cosmos-${tier.tier}`,
      title: tier.name.primary,
      subtitle: tier.name.latin ?? "",
      content: tier.tagline,
      section: "physics",
      url: `/universe-physics/universe/${slug}`,
      type: "cosmos",
    });
  }

  for (const mod of physicsMods) {
    const tier = mod.default;
    const slug = PHYSICS_ROUTES[tier.tier] ?? tier.tier.toLowerCase();
    docs.push({
      id: `physics-${tier.tier}`,
      title: tier.name.primary,
      subtitle: tier.name.latin ?? "",
      content: tier.tagline,
      section: "physics",
      url: `/universe-physics/physics/${slug}`,
      type: "physics",
    });
  }

  if (experimentsDataMod) {
    for (const exp of experimentsDataMod.PHYSICS_EXPERIMENTS) {
      docs.push({
        id: `physics-exp-${exp.id}`,
        title: exp.title,
        subtitle: `${exp.year} · ${exp.field}`,
        content: exp.description,
        section: "physics",
        url: "/universe-physics/experiments",
        type: "experiment",
      });
    }
  }

  return docs;
}
