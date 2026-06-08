export interface PsychTheorist {
  id: string;
  name: { chinese: string; english: string };
  years: string;
  nationality: string;
  era: "经典" | "现代" | "当代";
  school: string;
  contributions: string[];
  keyWork: string;
  tags: string[];
  related: string[];
  status: "published";
  updated: string;
}

export interface PsychExperiment {
  id: string;
  title: string;
  titleEn: string;
  researcher: string;
  year: number;
  institution: string;
  field: string;
  tags: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export interface PsychPhenomenon {
  id: string;
  title: string;
  titleEn: string;
  category: "认知" | "社会" | "发展" | "情绪" | "感知" | "记忆" | "决策";
  tags: string[];
  relatedExperiments: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export interface PsychSchool {
  id: string;
  title: string;
  titleEn: string;
  era: string;
  founder: string;
  period: string;
  keyFigures: string[];
  tags: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export interface PsychDisorder {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  dsmCode?: string;
  prevalence: string;
  tags: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export interface PsychDebate {
  id: string;
  title: string;
  titleEn: string;
  field: string;
  keyFigures: string[];
  tags: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export interface PsychDialogue {
  id: string;
  title: string;
  titleEn: string;
  participants: string[];
  question: string;
  field: string;
  tags: string[];
  relatedTheorists: string[];
  status: "published";
  updated: string;
}

export type PsychContentItem =
  | PsychTheorist
  | PsychExperiment
  | PsychPhenomenon
  | PsychSchool
  | PsychDisorder
  | PsychDebate
  | PsychDialogue;
