import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import type { GraphNode, GraphNodeType } from "./types";

/**
 * The registry that turns a content section into a graph node.
 *
 * Every domain whose articles are one file per route belongs here. Sections are
 * listed explicitly rather than discovered: content/ also holds directories that
 * are not routes at all (human-history keeps scaffolding under assets/ and its
 * editorial meta documents under knowledge-base/), and a node pointing at a
 * non-route is a dead link that no gate would catch.
 *
 * Article discovery is delegated to lib/search/articles, the shared route-aware
 * inventory used to generate wiki and search indexes. This matters for legacy
 * knowledge bases: their public slugs are `category--slug` composites and one
 * domain serves them under /knowledge rather than /knowledge-base.
 */

export interface DerivedDomain {
  /** Directory under content/, which is also the first URL segment. */
  contentDirectory: string;
  /** Graph domain key, which differs from the directory for two domains. */
  graphDomain: GraphNode["domain"];
  /** Node id prefix, matching the hand-curated ids already in this domain. */
  idPrefix: string;
  /**
   * Where an article hangs when its own relations point only sideways.
   * cognitive-metadata only accepts a prerequisite that is a graph neighbour, so
   * without this a cluster of same-section articles that cite each other has no
   * prerequisites at all. null where the domain has no foundational node to
   * hang from — those articles reach the graph through their prose wiki links.
   */
  entryNodeId: string | null;
  sections: readonly string[];
  /** Public route segment → content directory name, for legacy aliases. */
  routeSectionAliases?: Readonly<Record<string, string>>;
}

export const DERIVED_DOMAINS: readonly DerivedDomain[] = [
  {
    contentDirectory: "arts",
    graphDomain: "arts",
    idPrefix: "arts",
    entryNodeId: "arts:seeing-and-perception",
    sections: [
      "aesthetics",
      "architecture",
      "foundations",
      "frontier",
      "media",
      "methods",
      "traditions",
    ],
  },
  {
    contentDirectory: "chemistry",
    graphDomain: "chemistry",
    idPrefix: "chemistry",
    entryNodeId: "chemistry:matter-change-measurement",
    sections: [
      "concepts",
      "figures",
      "frontier",
      "methods",
      "milestones",
      "reactions",
      "substances",
    ],
  },
  {
    contentDirectory: "computer-science",
    graphDomain: "computer-science",
    idPrefix: "computer-science",
    entryNodeId: "computer-science:abstraction",
    sections: ["algorithms", "concepts", "frontier", "pioneers", "systems", "theory"],
  },
  {
    contentDirectory: "cosmology",
    graphDomain: "cosmology",
    idPrefix: "cosmology",
    entryNodeId: "cosmology:scale-light-expansion",
    sections: ["dialogues", "frontier", "knowledge-base"],
  },
  {
    contentDirectory: "earth-science",
    graphDomain: "earth-science",
    idPrefix: "earth-science",
    entryNodeId: "earth-science:earth-systems-observation",
    sections: [
      "climate-risks",
      "concepts",
      "event-analyses",
      "events",
      "frontier",
      "pioneers",
      "processes",
    ],
  },
  {
    contentDirectory: "economics",
    graphDomain: "economics",
    idPrefix: "economics",
    entryNodeId: "economics:scarcity-flows-incentives",
    sections: [
      "case-studies",
      "concepts",
      "debates",
      "dialogues",
      "economists",
      "frontier",
      "knowledge-base",
      "policy-analyses",
      "schools",
      "theories",
    ],
  },
  {
    contentDirectory: "engineering",
    graphDomain: "engineering",
    idPrefix: "engineering",
    entryNodeId: "engineering:simple-machines",
    sections: ["civil", "energy", "foundations", "frontier", "frontiers", "machines", "materials"],
  },
  {
    // Only frontier: knowledge-base/ holds six editorial meta documents that were
    // deliberately removed from the detail routes and search index (session #217),
    // and the actual history articles sit one level deeper under category folders.
    contentDirectory: "human-history",
    graphDomain: "history",
    idPrefix: "history",
    // History has no foundations node; the deep past is where its frontier
    // methods (ancient DNA, lidar survey, climate reconstruction) do their work.
    entryNodeId: "history:era-prehistoric",
    sections: ["frontier", "knowledge-base", "source-analyses"],
    routeSectionAliases: { knowledge: "knowledge-base" },
  },
  {
    contentDirectory: "law",
    graphDomain: "law",
    idPrefix: "law",
    entryNodeId: "law:why-law-exists",
    sections: [
      "criminal-and-procedure",
      "foundations",
      "frontier",
      "global-and-digital",
      "judgment-analyses",
      "legal-traditions",
      "private-law",
      "public-law",
    ],
  },
  {
    contentDirectory: "life-science",
    graphDomain: "life-science",
    idPrefix: "lifescience",
    entryNodeId: "lifescience:origin-of-life",
    sections: ["dialogues", "events", "frontier", "knowledge-base", "scientists", "species"],
  },
  {
    contentDirectory: "linguistics",
    graphDomain: "linguistics",
    idPrefix: "linguistics",
    entryNodeId: "linguistics:language-speech-and-sign",
    sections: [
      "acquisition-and-mind",
      "frontier",
      "history-typology-society",
      "methods-and-frontiers",
      "sounds-and-signs",
      "words-sentences-meaning",
      "writing-systems",
    ],
  },
  {
    contentDirectory: "mathematics",
    graphDomain: "mathematics",
    idPrefix: "mathematics",
    entryNodeId: "mathematics:number-line",
    sections: [
      "concepts",
      "dialogues",
      "frontier",
      "knowledge-base",
      "mathematicians",
      "paradoxes",
      "theorems",
    ],
  },
  {
    contentDirectory: "medicine",
    graphDomain: "medicine",
    idPrefix: "medicine",
    entryNodeId: "medicine:body-disease-evidence",
    sections: [
      "concepts",
      "diseases",
      "ethics",
      "events",
      "figures",
      "frontier",
      "public-health",
      "technologies",
      "traditions",
      "trial-analyses",
    ],
  },
  {
    contentDirectory: "philosophy",
    graphDomain: "philosophy",
    idPrefix: "philosophy",
    entryNodeId: "philosophy:questions-reasons-counterexamples",
    sections: [
      "concepts",
      "dialogues",
      "experiments",
      "frontier",
      "isms",
      "questions",
      "schools",
      "thinkers",
    ],
  },
  {
    contentDirectory: "political-science",
    graphDomain: "political-science",
    idPrefix: "political-science",
    entryNodeId: "political-science:power-rules-collective-choice",
    sections: [
      "concepts",
      "frontier",
      "institutions",
      "international-relations",
      "isms",
      "methods",
      "thinkers",
    ],
  },
  {
    contentDirectory: "psychology",
    graphDomain: "psychology",
    idPrefix: "psychology",
    entryNodeId: "psychology:behavior-mind-evidence",
    sections: [
      "debates",
      "dialogues",
      "disorders",
      "experiments",
      "frontier",
      "knowledge-base",
      "methods",
      "phenomena",
      "schools",
      "theorists",
    ],
  },
  {
    contentDirectory: "sociology",
    graphDomain: "sociology",
    idPrefix: "sociology",
    entryNodeId: "sociology:social-patterns-institutions",
    sections: ["concepts", "frontier", "institutions", "methods", "thinkers"],
  },
  {
    contentDirectory: "universe-physics",
    graphDomain: "physics",
    idPrefix: "physics",
    entryNodeId: "physics:measurement-motion-energy",
    sections: ["dialogues", "frontier", "knowledge-base"],
  },
];

/**
 * Section → knowledge level, the single ladder for derived nodes.
 *
 * cognitive-metadata infers a level from node type and route when a node does
 * not declare one, and this table used to exist a second time as a parallel
 * "rank" for anchor selection. Two ladders drift: a section that ranks 2 here
 * and infers 4 there produces an anchor edge that is not a prerequisite. Derived
 * nodes therefore declare their level outright and both uses read this table.
 *
 * The values agree with what type inference already produced for the sections
 * that carry a type signal, so adopting them changed no existing node.
 */
export const SECTION_KNOWLEDGE_LEVEL: Readonly<Record<string, KnowledgeLevel>> = {
  // L1 — people and dated episodes: the concrete things a reader can enter from.
  economists: 1,
  events: 1,
  figures: 1,
  mathematicians: 1,
  milestones: 1,
  pioneers: 1,
  scientists: 1,
  species: 1,
  theorists: 1,
  thinkers: 1,
  // L2 — the core vocabulary of a domain.
  aesthetics: 2,
  concepts: 2,
  debates: 2,
  dialogues: 2,
  foundations: 2,
  isms: 2,
  "knowledge-base": 2,
  paradoxes: 2,
  phenomena: 2,
  questions: 2,
  schools: 2,
  "sounds-and-signs": 2,
  substances: 2,
  traditions: 2,
  "words-sentences-meaning": 2,
  "writing-systems": 2,
  "legal-traditions": 2,
  // L3 — machinery built on that vocabulary.
  "acquisition-and-mind": 3,
  algorithms: 3,
  architecture: 3,
  "case-studies": 3,
  civil: 3,
  "criminal-and-procedure": 3,
  diseases: 3,
  disorders: 3,
  energy: 3,
  "history-typology-society": 3,
  institutions: 3,
  "international-relations": 3,
  machines: 3,
  materials: 3,
  media: 3,
  "private-law": 3,
  processes: 3,
  "public-health": 3,
  "public-law": 3,
  reactions: 3,
  theories: 3,
  theory: 3,
  technologies: 3,
  // L4 — how the domain finds things out, and where it argues about them.
  "climate-risks": 4,
  ethics: 4,
  experiments: 4,
  "global-and-digital": 4,
  methods: 4,
  "methods-and-frontiers": 4,
  systems: 4,
  "trial-analyses": 4,
  "judgment-analyses": 4,
  "policy-analyses": 4,
  "source-analyses": 4,
  "event-analyses": 4,
  theorems: 4,
  // L5 — open questions.
  frontier: 5,
  frontiers: 5,
};

/** Section → node type. Sections with no distinctive type fall through to the
 *  domain default below, so a new section gets its domain's shape by default. */
export const SECTION_NODE_TYPE: Readonly<Record<string, GraphNodeType>> = {
  algorithms: "algorithm",
  "case-studies": "event",
  "climate-risks": "process",
  debates: "question",
  dialogues: "question",
  diseases: "disease",
  disorders: "disease",
  economists: "economist",
  events: "event",
  experiments: "experiment",
  "trial-analyses": "experiment",
  "judgment-analyses": "event",
  "policy-analyses": "event",
  "source-analyses": "event",
  "event-analyses": "event",
  figures: "figure",
  institutions: "institution",
  isms: "ism",
  mathematicians: "mathematician",
  milestones: "event",
  paradoxes: "question",
  phenomena: "phenomenon",
  pioneers: "pioneer",
  processes: "process",
  questions: "question",
  reactions: "reaction",
  schools: "school",
  scientists: "scientist",
  species: "species",
  substances: "substance",
  technologies: "technology",
  theorems: "theorem",
  theories: "theory",
  theorists: "theorist",
  theory: "theory",
  thinkers: "thinker",
};

/** Engineering models everything it covers as an artefact; every other domain
 *  treats an untyped section as a concept. */
export const DOMAIN_DEFAULT_NODE_TYPE: Readonly<Record<string, GraphNodeType>> = {
  engineering: "technology",
};

/** `<contentDirectory>/<section>` → a better anchor than the domain entry. */
export const SECTION_ANCHOR_OVERRIDES: Readonly<Record<string, string>> = {
  "computer-science/algorithms": "computer-science:data-structures",
  // A system deep dive explains real machinery, so it builds on the operating
  // system rather than on the domain's opening abstraction.
  "computer-science/systems": "computer-science:operating-systems",
};
