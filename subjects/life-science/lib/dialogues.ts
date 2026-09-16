import path from "node:path";
import { loadAllContent, loadContentBySlug } from "@/lib/content-article";
import { getDomainContentDir, listContentSlugs } from "@/lib/content-paths";
import type { LifeScienceDialogue } from "./types";

/**
 * Server-only loader for life-science dialogues (content/life-science/dialogues/*.mdx).
 * Uses fs, so it must NOT be imported into the client search bundle — the search
 * mirror (content/life-science/dialogues-data.ts) carries the metadata instead.
 */
const DIALOGUES_DIR = path.join(getDomainContentDir("life-science"), "dialogues");

const dialogueBySlugCache = new Map<string, LifeScienceDialogue | null>();
let cachedDialogues: LifeScienceDialogue[] | null = null;

function toDialogue(
  data: Record<string, unknown>,
  content: string,
  slug: string
): LifeScienceDialogue {
  const body = content.replace(/^\s*---\s*\n/, "").trim();
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    participants: Array.isArray(data.participants) ? data.participants.map(String) : [],
    question: typeof data.question === "string" ? data.question : "",
    field: typeof data.field === "string" ? data.field : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body,
  };
}

export function getDialogueSlugs(): string[] {
  return listContentSlugs(DIALOGUES_DIR).sort();
}

export function getDialogueBySlug(slug: string): LifeScienceDialogue | null {
  return loadContentBySlug(DIALOGUES_DIR, slug, dialogueBySlugCache, toDialogue);
}

export function getAllDialogues(): LifeScienceDialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = loadAllContent(DIALOGUES_DIR, dialogueBySlugCache, toDialogue, {
    sort: (a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0),
  });
  return cachedDialogues;
}
