import path from "node:path";
import type { Dialogue, DialogueFrontmatter } from "./types";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

const DIALOGUES_DIR = path.join(getDomainContentDir("philosophy"), "dialogues");

const dialogueBySlugCache = new Map<string, Dialogue | null>();
let cachedDialogues: Dialogue[] | null = null;

const ERA_ORDER: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };

function toDialogue(data: Record<string, unknown>, content: string, slug: string): Dialogue {
  return {
    ...(data as DialogueFrontmatter),
    slug,
    content,
  };
}

export function getDialogueSlugs(): string[] {
  return listContentSlugs(DIALOGUES_DIR);
}

export function getDialogueBySlug(slug: string): Dialogue | null {
  return loadContentBySlug(DIALOGUES_DIR, slug, dialogueBySlugCache, toDialogue);
}

export function getAllDialogues(): Dialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = loadAllContent(DIALOGUES_DIR, dialogueBySlugCache, toDialogue, {
    sort: (a, b) => (ERA_ORDER[a.era] ?? 99) - (ERA_ORDER[b.era] ?? 99),
  });
  return cachedDialogues;
}
