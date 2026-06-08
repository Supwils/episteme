export interface Mathematician {
  id: string;
  name: { zh: string; en: string };
  era: string;
  years: string;
  fields: string[];
  contribution: string;
  famousWork: string;
  quote?: string;
  keyDiscoveries?: string[];
  personalStory?: string;
}

export interface Theorem {
  id: string;
  name: { zh: string; en: string };
  mathematician: string;
  year?: number;
  field: string;
  statement: string;
  significance: string;
  proofSketch?: string;
  historicalContext?: string;
  applications?: string[];
}

export interface MathEra {
  id: string;
  name: { zh: string; en: string };
  timeRange: string;
  description: string;
  keyFigures: string[];
  keyDiscoveries: string[];
}

export interface MathConcept {
  id: string;
  name: { zh: string; en: string };
  field: string;
  definition: string;
  significance: string;
  relatedConcepts: string[];
}

export interface Dialogue {
  id: string;
  title: string;
  participants: string[];
  question: string;
  field: string;
}
