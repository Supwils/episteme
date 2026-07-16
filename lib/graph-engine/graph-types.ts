export type GraphNodeType =
  | "thinker"
  | "school"
  | "concept"
  | "experiment"
  | "question"
  | "ism"
  | "event"
  | "figure"
  | "era"
  | "cosmos-tier"
  | "physics-tier"
  | "species"
  | "scientist"
  | "extinction"
  | "economist"
  | "theory"
  | "theorist"
  | "phenomenon"
  | "pioneer"
  | "algorithm"
  | "institution"
  | "mathematician"
  | "theorem"
  | "process"
  | "disease"
  | "technology"
  | "substance"
  | "reaction"
  | "cosmic";

export type GraphNode = {
  id: string;
  label: string;
  domain:
    | "philosophy"
    | "history"
    | "physics"
    | "life-science"
    | "economics"
    | "psychology"
    | "computer-science"
    | "political-science"
    | "cosmology"
    | "mathematics"
    | "earth-science"
    | "medicine"
    | "chemistry"
    | "sociology"
    | "linguistics";
  type: GraphNodeType;
  slug: string;
  era?: string;
  year?: number;
  tags: string[];
  description: string;
  section?: string;
  url?: string;
  knowledgeLevel?: 1 | 2 | 3 | 4 | 5;
  knowledgeLevelSource?: "curated" | "inferred";
  prerequisiteIds?: string[];
  evidenceMode?:
    | "observation"
    | "interpretation"
    | "formal"
    | "experimental"
    | "comparative"
    | "simulation"
    | "synthesis";
};

export type GraphEdge = {
  source: string;
  target: string;
  type: "cross-reference" | "temporal" | "hierarchy" | "domain-link";
  label?: string;
};
