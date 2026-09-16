import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { listContentSlugs } from "@/lib/content-paths";
import type { MathDialogue, MathEra } from "./types";
import { DIALOGUES_DIR } from "./content-paths";

const ERA_MAP: Record<string, MathEra> = {
  ancient: "古代",
  medieval: "中世纪",
  "early-modern": "近代",
  modern: "现代",
  contemporary: "当代",
  "foundations-crisis": "现代",
  renaissance: "近代",
};

const dialogueBySlugCache = new Map<string, MathDialogue | null>();
let cachedDialogues: MathDialogue[] | null = null;

const ERA_ORDER: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };

function toDialogue(data: Record<string, unknown>, content: string, slug: string): MathDialogue {
  const era = ERA_MAP[data.era as string] ?? data.era ?? "古代";
  return {
    title: data.title as string,
    title_en: (data.title_en as string) ?? "",
    participants: (data.participants as string[]) ?? [],
    era: era as MathEra,
    field: (data.field as string) ?? "其他",
    tags: (data.tags as string[]) ?? [],
    related: (data.related as string[]) ?? [],
    status: (data.status as "stub" | "draft" | "published") ?? "draft",
    updated: (data.updated as string) ?? "",
    slug,
    content,
  };
}

export function getMathDialogueSlugs(): string[] {
  return listContentSlugs(DIALOGUES_DIR);
}

export function getMathDialogueBySlug(slug: string): MathDialogue | null {
  return loadContentBySlug(DIALOGUES_DIR, slug, dialogueBySlugCache, toDialogue);
}

export function getAllMathDialogues(): MathDialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = loadAllContent(DIALOGUES_DIR, dialogueBySlugCache, toDialogue, {
    sort: (a, b) => (ERA_ORDER[a.era] ?? 99) - (ERA_ORDER[b.era] ?? 99),
  });
  return cachedDialogues;
}
