export type Era = "经典" | "现代" | "当代";

export type TheoristFrontmatter = {
  summary?: string;
  title: string;
  name_en: string;
  years: string;
  era: Era;
  school: string;
  key_contributions: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Theorist = TheoristFrontmatter & {
  slug: string;
  content: string;
};

export type ExperimentFrontmatter = {
  summary?: string;
  title: string;
  title_en: string;
  researcher: string;
  year: number;
  field: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Experiment = ExperimentFrontmatter & {
  slug: string;
  content: string;
};

export type PhenomenonFrontmatter = {
  summary?: string;
  title: string;
  title_en: string;
  category: string;
  key_figures: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Phenomenon = PhenomenonFrontmatter & {
  slug: string;
  content: string;
};

export type SchoolFrontmatter = {
  summary?: string;
  title: string;
  era: Era;
  period: string;
  founder: string;
  key_figures: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type School = SchoolFrontmatter & {
  slug: string;
  content: string;
};

export type DisorderFrontmatter = {
  summary?: string;
  title: string;
  title_en: string;
  category: string;
  dsm_code: string;
  key_symptoms: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Disorder = DisorderFrontmatter & {
  slug: string;
  content: string;
};

export type KnowledgeBaseFrontmatter = {
  summary?: string;
  title: string;
  title_en: string;
  category: string;
  tags: string[];
  related: string[];
  updated: string;
};

export type KnowledgeBaseArticle = KnowledgeBaseFrontmatter & {
  slug: string;
  content: string;
};

export type DebateFrontmatter = {
  summary?: string;
  title: string;
  topic: string;
  key_figures: string[];
  era: Era;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Debate = DebateFrontmatter & {
  slug: string;
  content: string;
};

export type DialogueFrontmatter = {
  summary?: string;
  title: string;
  title_en: string;
  participants: string[];
  question: string;
  era: Era;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Dialogue = DialogueFrontmatter & {
  slug: string;
  content: string;
};
