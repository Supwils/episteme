export type Era = "古典" | "新古典" | "现代" | "当代";

export type EconomistFrontmatter = {
  title: string;
  name_en: string;
  years: string;
  era: Era;
  school: string;
  key_contributions: string[];
  nobel?: boolean;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Economist = EconomistFrontmatter & {
  slug: string;
  content: string;
};

export type TheoryFrontmatter = {
  title: string;
  title_en: string;
  category: string;
  key_figures: string[];
  period: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Theory = TheoryFrontmatter & {
  slug: string;
  content: string;
};

export type ConceptFrontmatter = {
  title: string;
  title_en: string;
  category: string;
  key_figures: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Concept = ConceptFrontmatter & {
  slug: string;
  content: string;
};

export type CaseStudyFrontmatter = {
  title: string;
  title_en: string;
  year: number;
  region: string;
  category: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  content: string;
};

export type SchoolFrontmatter = {
  title: string;
  title_en: string;
  era: Era;
  period: string;
  founder?: string;
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

export type DebateFrontmatter = {
  title: string;
  title_en: string;
  sides: string[];
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

export type KnowledgeBaseFrontmatter = {
  title: string;
  title_en: string;
  category: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type KnowledgeBase = KnowledgeBaseFrontmatter & {
  slug: string;
  content: string;
};
