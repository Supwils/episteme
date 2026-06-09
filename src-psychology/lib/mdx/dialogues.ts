import type { Era, Dialogue, DialogueFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll, eraOrder } from "./normalize";

export function getDialogueSlugs(): string[] {
  return getSlugs(DIRS.dialogues);
}

function castDialogue(data: unknown, s: string, c: string): Dialogue {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    title_en: (d.title_en as string) ?? "",
    participants: Array.isArray(d.participants) ? (d.participants as string[]) : [],
    question: (d.question as string) ?? "",
    era: (d.era as Era) ?? "当代",
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as DialogueFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getDialogueBySlug(slug: string): Dialogue | null {
  return getBySlug(DIRS.dialogues, slug, caches.dialogues, castDialogue);
}

export function getAllDialogues(): Dialogue[] {
  return getAll(DIRS.dialogues, caches.dialogues, { get value() { return listCaches.dialogues; }, set value(v) { listCaches.dialogues = v; } }, castDialogue, (a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
}
