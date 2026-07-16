import { z } from "zod";

export const LinguisticsEvidenceModeSchema = z.enum([
  "observation",
  "cross-linguistic-comparison",
  "acoustic-measurement",
  "elicitation",
  "corpus",
  "experiment",
  "historical-reconstruction",
  "formal-analysis",
  "community-knowledge",
]);

export const LinguisticsArticleSchema = z.object({
  title: z.string().min(2),
  title_en: z.string().min(2),
  status: z.literal("published"),
  updated: z.union([
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    z.date().transform((date) => date.toISOString().slice(0, 10)),
  ]),
  category: z.string().min(2),
  order: z.number().int().positive(),
  field: z.string().min(2),
  knowledge_level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  evidence_modes: z.array(LinguisticsEvidenceModeSchema).min(1),
  tags: z.array(z.string().min(1)).min(3),
  related: z.array(z.string().min(1)).min(1),
  interactive: z
    .enum([
      "ipa-explorer",
      "syntax-tree-builder",
      "language-map",
      "writing-timeline",
      "sound-change-lab",
    ])
    .optional(),
});

export type LinguisticsArticleFrontmatter = z.infer<typeof LinguisticsArticleSchema>;
