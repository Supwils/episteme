import { z } from "zod";

const StatusEnum = z.enum(["stub", "draft", "published"]);
const updatedField = z.union([z.string(), z.date()]).transform((v) =>
  typeof v === "string" ? v : v.toISOString().split("T")[0] ?? ""
).default("");

export const EconomistSchema = z.object({
  title: z.string().default(""),
  name_en: z.string().default(""),
  years: z.string().default(""),
  era: z.string().default("当代"),
  school: z.string().default(""),
  key_contributions: z.array(z.string()).default([]),
  nobel: z.boolean().optional(),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const TheorySchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  category: z.string().default(""),
  key_figures: z.array(z.string()).default([]),
  period: z.string().default(""),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  relatedTheories: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const ConceptSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  category: z.string().default(""),
  key_figures: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  relatedTheories: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const CaseStudySchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  year: z.number().default(0),
  region: z.string().default(""),
  category: z.string().default(""),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  relatedTheories: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const SchoolSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  era: z.string().default("当代"),
  period: z.string().default(""),
  founder: z.string().optional(),
  key_figures: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const DebateSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().optional().default(""),
  topic: z.string().optional().default(""),
  sides: z.array(z.string()).default([]),
  key_figures: z.array(z.string()).default([]),
  era: z.string().default("当代"),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const DialogueSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().optional().default(""),
  participants: z.array(z.string()).default([]),
  question: z.string().default(""),
  era: z.string().default("当代"),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const KnowledgeBaseSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  category: z.string().default(""),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});
