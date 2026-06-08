export interface DataCard {
  label: string;
  latinLabel?: string;
  value: string;
  hint?: string;
}

export interface NarrativeSection {
  heading: string;
  body: string[];
}

export interface SourceRef {
  label: string;
  url?: string;
  kind: "paper" | "book" | "agency" | "encyclopedia";
}

export interface DeepReadingCitation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
}

export interface DeepReadingSection {
  title: string;
  content: string[];
}

export interface DeepReading {
  introduction: string[];
  sections: DeepReadingSection[];
  citations: DeepReadingCitation[];
}

export interface KeyDiscovery {
  year: number;
  discovery: string;
  significance: string;
}

export interface EraContent {
  id: string;
  name: { primary: string; latin?: string };
  tagline: string;
  timeRange: string;
  dataCards: DataCard[];
  narrative: NarrativeSection[];
  sources: SourceRef[];
  deepReading?: DeepReading;
  keyDiscoveries?: KeyDiscovery[];
  unsolvedMysteries?: string[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  era: string;
  significance: "major" | "moderate" | "minor";
}

export interface SpeciesCitation {
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
}

export interface Species {
  id: string;
  name: { common: string; scientific: string };
  era: string;
  timeRange: string;
  description: string;
  significance: string;
  funFact?: string;
  deepDescription?: string;
  keyTraits?: string[];
  evolutionaryContext?: string;
  citations?: SpeciesCitation[];
}

export interface ExtinctionEvent {
  id: string;
  name: { primary: string; latin?: string };
  time: string;
  severity: string;
  cause: string;
  description: string;
  speciesLost: string;
  survivors: string;
}

export interface Scientist {
  id: string;
  name: { chinese: string; english: string };
  years: string;
  nationality: string;
  contribution: string;
  keyWork?: string;
  quote?: string;
}
