import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MathDialogue, MathDialogueFrontmatter, MathEra } from "./types";
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

export function getMathDialogueSlugs(): string[] {
  if (!fs.existsSync(DIALOGUES_DIR)) return [];
  return fs
    .readdirSync(DIALOGUES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMathDialogueBySlug(slug: string): MathDialogue | null {
  if (dialogueBySlugCache.has(slug)) return dialogueBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(DIALOGUES_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(DIALOGUES_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: MathDialogue | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const era = ERA_MAP[data.era as string] ?? data.era ?? "古代";
    result = {
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
  } catch {
    // result stays null
  }
  dialogueBySlugCache.set(slug, result);
  return result;
}

export function getAllMathDialogues(): MathDialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = getMathDialogueSlugs()
    .map((slug) => getMathDialogueBySlug(slug))
    .filter((d): d is MathDialogue => d !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
  return cachedDialogues;
}
