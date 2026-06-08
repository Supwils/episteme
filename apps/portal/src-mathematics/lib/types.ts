export type MathEra = "古代" | "中世纪" | "近代" | "现代" | "当代";

export type MathematicianFrontmatter = {
  title: string;
  name: string;
  era: MathEra;
  field: string;
  birthYear: number;
  deathYear: number | null;
  nationality: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Mathematician = MathematicianFrontmatter & {
  slug: string;
  content: string;
};

export type TheoremFrontmatter = {
  title: string;
  title_en: string;
  field: string;
  mathematician: string;
  year: number | null;
  difficulty: "基础" | "进阶" | "高级";
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Theorem = TheoremFrontmatter & {
  slug: string;
  content: string;
};

export type MathConceptFrontmatter = {
  title: string;
  title_en: string;
  field: string;
  key_figures: string[];
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type MathConcept = MathConceptFrontmatter & {
  slug: string;
  content: string;
};

export type MathDialogueFrontmatter = {
  title: string;
  title_en: string;
  participants: string[];
  era: MathEra;
  field: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type MathDialogue = MathDialogueFrontmatter & {
  slug: string;
  content: string;
};

export type MathParadoxFrontmatter = {
  title: string;
  title_en: string;
  field: string;
  key_figures: string[];
  tags: string[];
  key_terms: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type MathParadox = MathParadoxFrontmatter & {
  slug: string;
  content: string;
};

export type MathEraData = {
  id: string;
  name: string;
  nameEn: string;
  period: string;
  keyFact: string;
  icon: string;
  gradient: string;
  glowColor: string;
  bgAccent: string;
  borderAccent: string;
};
