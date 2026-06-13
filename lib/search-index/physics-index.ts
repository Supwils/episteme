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

interface PhysicsKbData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

interface PhysicsDialogueData {
  slug: string;
  title: string;
  description: string;
  participants: readonly string[];
  tags: readonly string[];
}

export function indexPhysics(
  cosmosMods: Array<{ default: TierData }>,
  physicsMods: Array<{ default: TierData }>,
  experimentsDataMod: {
    PHYSICS_EXPERIMENTS: ReadonlyArray<{
      id: string;
      title: string;
      subtitle: string;
      year: string;
      field: string;
      description: string;
    }>;
  } | null,
  physicsKbDataMod: { UNIVERSE_PHYSICS_KB_DATA: ReadonlyArray<PhysicsKbData> } | null,
  physicsDialoguesDataMod: {
    UNIVERSE_PHYSICS_DIALOGUES_DATA: ReadonlyArray<PhysicsDialogueData>;
  } | null
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

  if (physicsKbDataMod) {
    for (const article of physicsKbDataMod.UNIVERSE_PHYSICS_KB_DATA) {
      docs.push({
        id: `physics-kb-${article.slug}`,
        title: article.title,
        subtitle: article.category,
        content: article.excerpt,
        section: "physics",
        url: `/universe-physics/knowledge-base/${article.slug}`,
        type: "knowledgeBase",
      });
    }
  }

  if (physicsDialoguesDataMod) {
    for (const dialogue of physicsDialoguesDataMod.UNIVERSE_PHYSICS_DIALOGUES_DATA) {
      docs.push({
        id: `physics-dialogue-${dialogue.slug}`,
        title: dialogue.title,
        subtitle: dialogue.participants.join("、"),
        content: `${dialogue.description} ${dialogue.tags.join(" ")}`,
        section: "physics",
        url: `/universe-physics/dialogues/${dialogue.slug}`,
        type: "dialogue",
      });
    }
  }

  return docs;
}
