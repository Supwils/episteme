import { z } from "zod";

const statusEnum = z.enum(["published", "draft", "stub"]);
const difficultyEnum = z.enum(["入门", "基础", "中级", "中等", "进阶", "高级", "专家", "前沿"]);

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const dateString = z.union([
  z.string().regex(datePattern, "updated must be YYYY-MM-DD"),
  z.date().transform((d) => d.toISOString().slice(0, 10)),
]);

/**
 * A single bibliographic source. Kept deliberately small: only `title` is
 * required so authors can adopt it incrementally, but a citation should carry
 * at least one of year/doi/publisher to count as a real source (enforced in
 * check-content, not here). `references` = sources that back the article's
 * claims; `furtherReading` = recommended-but-not-load-bearing reading. Keeping
 * them separate is what fixes the historical 参考文献/延伸阅读 conflation.
 */
export const CitationSchema = z.object({
  title: z.string().min(1, "citation title is required"),
  author: z.string().optional(),
  publisher: z.string().optional(),
  year: z.number().int().optional(),
  doi: z.string().optional(),
  url: z.string().url().optional(),
  type: z.enum(["book", "paper", "report", "standard", "primary", "web"]).optional(),
  note: z.string().optional(),
});

export type Citation = z.infer<typeof CitationSchema>;

const BaseFrontmatter = z.object({
  title: z.string().min(1, "title is required"),
  status: statusEnum,
  updated: dateString,
  tags: z.array(z.string()).default([]),
  references: z.array(CitationSchema).default([]),
  furtherReading: z.array(CitationSchema).default([]),
});

export const PhilosophyThinkerSchema = BaseFrontmatter.extend({
  philosopher: z.string().optional(),
  era: z.string().optional(),
  school: z.string().optional(),
  related: z.array(z.string()).default([]),
});

export const PhilosophySchoolSchema = BaseFrontmatter.extend({
  era: z.string().optional(),
  founder: z.string().optional(),
  period: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  related_thinkers: z.array(z.string()).default([]),
});

export const PhilosophyConceptSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  field: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  key_terms: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
});

export const PhilosophyIsmSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  category: z.string().optional(),
  era: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  opposing: z.array(z.string()).default([]),
});

export const PhilosophyExperimentSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  philosopher: z.string().optional(),
  year: z.number().optional(),
  field: z.string().optional(),
  related_thinkers: z.array(z.string()).default([]),
});

export const PhilosophyQuestionSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  field: z.string().optional(),
  related: z.array(z.string()).default([]),
});

export const PhilosophyDialogueSchema = BaseFrontmatter.extend({
  participants: z.array(z.string()).min(1),
  question: z.string().optional(),
  field: z.string().optional(),
});

export const MathematicianSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  era: z.string().optional(),
  nationality: z.string().optional(),
  birthYear: z.number().optional(),
  deathYear: z.number().optional(),
  fields: z.array(z.string()).default([]),
  key_works: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  difficulty: difficultyEnum.optional(),
});

export const TheoremSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  field: z.string().optional(),
  mathematician: z.string().optional(),
  year: z.number().optional(),
  statement_latex: z.string().optional(),
  proof_type: z.string().optional(),
  related: z.array(z.string()).default([]),
  difficulty: difficultyEnum.optional(),
});

export const MathConceptSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  field: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  key_terms: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  difficulty: difficultyEnum.optional(),
});

export const MathDialogueSchema = BaseFrontmatter.extend({
  participants: z.array(z.string()).min(1),
  question: z.string().optional(),
  field: z.string().optional(),
});

export const ParadoxSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  field: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  key_terms: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
});

export const LifeScienceDialogueSchema = BaseFrontmatter.extend({
  participants: z.array(z.string()).min(1),
  question: z.string().optional(),
  field: z.string().optional(),
});

/**
 * Frontier articles span every domain (content/<domain>/frontier/*.md). They
 * describe active 2020s research: who is pushing it, what broke recently, and
 * what is still open — so they carry researchers/institutions/horizon metadata
 * that ordinary articles don't.
 */
export const FrontierSchema = BaseFrontmatter.extend({
  title_en: z.string().optional(),
  category: z.string().min(1, "category is required for grouping"),
  horizon: z.string().optional(),
  researchers: z.array(z.string()).default([]),
  institutions: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  order: z.number().optional(),
});

type ContentSchemaMap = Record<string, z.ZodTypeAny>;

export const PHILOSOPHY_SCHEMAS: ContentSchemaMap = {
  thinkers: PhilosophyThinkerSchema,
  schools: PhilosophySchoolSchema,
  concepts: PhilosophyConceptSchema,
  isms: PhilosophyIsmSchema,
  experiments: PhilosophyExperimentSchema,
  questions: PhilosophyQuestionSchema,
  dialogues: PhilosophyDialogueSchema,
};

export const MATHEMATICS_SCHEMAS: ContentSchemaMap = {
  mathematicians: MathematicianSchema,
  theorems: TheoremSchema,
  concepts: MathConceptSchema,
  dialogues: MathDialogueSchema,
  paradoxes: ParadoxSchema,
};

export const LIFE_SCIENCE_SCHEMAS: ContentSchemaMap = {
  dialogues: LifeScienceDialogueSchema,
};

export type ContentType = "philosophy" | "mathematics" | "life-science";

export const ALL_SCHEMAS: Record<ContentType, ContentSchemaMap> = {
  philosophy: PHILOSOPHY_SCHEMAS,
  mathematics: MATHEMATICS_SCHEMAS,
  "life-science": LIFE_SCIENCE_SCHEMAS,
};
