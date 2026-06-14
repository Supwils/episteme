export type GeologicalEra = {
  id: string;
  name: string;
  nameEn: string;
  timeRange: string;
  startMYA: number;
  endMYA: number;
  keyFact: string;
  icon: string;
  gradient: string;
  glowColor: string;
  bgAccent: string;
  borderAccent: string;
};

export type Species = {
  id: string;
  name: string;
  nameEn: string;
  era: string;
  period: string;
  keyTraits: string[];
  taxonomy: {
    kingdom: string;
    phylum?: string;
    class?: string;
    order?: string;
  };
  extinct: boolean;
  imagePlaceholder?: string;
};

export type ExtinctionEvent = {
  id: string;
  name: string;
  nameEn: string;
  dateMYA: number;
  dateDisplay: string;
  speciesLostPercent: number;
  severity: number;
  causes: string[];
  description: string;
};

export type Scientist = {
  id: string;
  name: string;
  nameEn: string;
  era: string;
  birthYear: number;
  deathYear: number | null;
  keyContribution: string;
  famousWork: string;
  field: string;
};

export type LifeScienceDialogue = {
  slug: string;
  /** Scientist registry ids (resolve via getScientistById for display/links). */
  participants: string[];
  title: string;
  question: string;
  field: string;
  tags: string[];
  body: string;
};

export type PhylogeneticNode = {
  id: string;
  name: string;
  nameEn: string;
  children?: PhylogeneticNode[];
  speciesCount?: number;
  color: string;
  divergenceMYA?: number;
};

export type EvolutionEvent = {
  id: string;
  name: string;
  nameEn: string;
  dateMYA: number;
  dateDisplay: string;
  category: "animals" | "plants" | "microorganisms";
  description: string;
  significance: number;
};

export type LifeStat = {
  label: string;
  value: number;
  suffix: string;
  icon: string;
};
