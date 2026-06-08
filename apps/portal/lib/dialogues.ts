import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Dialogue, DialogueFrontmatter } from "./types";
import { getDomainContentDir } from "./content-paths";

const DIALOGUES_DIR = path.join(getDomainContentDir("philosophy"), "dialogues");

const dialogueBySlugCache = new Map<string, Dialogue | null>();
let cachedDialogues: Dialogue[] | null = null;

export function getDialogueSlugs(): string[] {
  if (!fs.existsSync(DIALOGUES_DIR)) return [];
  return fs
    .readdirSync(DIALOGUES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDialogueBySlug(slug: string): Dialogue | null {
  if (dialogueBySlugCache.has(slug)) return dialogueBySlugCache.get(slug)!;
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) return null;
  const filePath = path.join(DIALOGUES_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(DIALOGUES_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Dialogue | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as DialogueFrontmatter),
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  dialogueBySlugCache.set(slug, result);
  return result;
}

export function getAllDialogues(): Dialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = getDialogueSlugs()
    .map((slug) => getDialogueBySlug(slug))
    .filter((d): d is Dialogue => d !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
  return cachedDialogues;
}
