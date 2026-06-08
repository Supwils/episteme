import { z } from "zod";

const StatusEnum = z.enum(["stub", "draft", "published"]);
const updatedField = z.union([z.string(), z.date()]).transform((v) =>
  typeof v === "string" ? v : v.toISOString().split("T")[0] ?? ""
).default("");

export const TheoristSchema = z.object({
  title: z.string().default(""),
  name_en: z.string().default(""),
  years: z.string().default(""),
  era: z.string().default("当代"),
  school: z.string().default(""),
  key_contributions: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const ExperimentSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  researcher: z.string().default(""),
  year: z.union([z.number(), z.string()]).transform((v) =>
    typeof v === "number" ? v : parseInt(v, 10) || 0
  ).default(0),
  field: z.string().default(""),
  institution: z.string().optional().default(""),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const PhenomenonSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  category: z.string().default(""),
  key_figures: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  relatedExperiments: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const SchoolSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().optional().default(""),
  era: z.string().default("当代"),
  period: z.string().default(""),
  founder: z.string().default(""),
  key_figures: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const DisorderSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().default(""),
  category: z.string().default(""),
  dsm_code: z.string().default(""),
  key_symptoms: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  relatedTheorists: z.array(z.string()).optional(),
  status: StatusEnum.default("draft"),
  updated: updatedField,
});

export const DebateSchema = z.object({
  title: z.string().default(""),
  title_en: z.string().optional().default(""),
  topic: z.string().default(""),
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
