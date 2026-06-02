export type Era = "古代" | "近代" | "现代" | "当代";

export type PhilosopherFrontmatter = {
  title: string;
  philosopher: string;
  era: Era;
  school: string;
  tags: string[];
  related: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Philosopher = PhilosopherFrontmatter & {
  slug: string;
  content: string;
};

export type QuestionFrontmatter = {
  title: string;
  field: string;
  key_figures: string[];
  tags: string[];
  related_thinkers: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Question = QuestionFrontmatter & {
  slug: string;
  content: string;
};

export type SchoolFrontmatter = {
  title: string;
  era: Era;
  period?: string;
  founder?: string;
  philosopher?: string;
  school?: string;
  key_figures?: string[];
  tags: string[];
  related_thinkers?: string[];
  related?: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type School = SchoolFrontmatter & {
  slug: string;
  content: string;
};

export type ExperimentFrontmatter = {
  title: string;
  title_en: string;
  philosopher: string;
  year: number;
  field: string;
  tags: string[];
  related_thinkers: string[];
  status: "stub" | "draft" | "published";
  updated: string;
};

export type Experiment = ExperimentFrontmatter & {
  slug: string;
  content: string;
};
