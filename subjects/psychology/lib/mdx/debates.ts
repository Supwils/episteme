import type { Era, Debate, DebateFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll, eraOrder } from "./normalize";

export function getDebateSlugs(): string[] {
  return getSlugs(DIRS.debates);
}

function castDebate(data: unknown, s: string, c: string): Debate {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    topic: (d.topic as string) ?? "",
    key_figures: Array.isArray(d.key_figures) ? (d.key_figures as string[]) : [],
    era: (d.era as Era) ?? "当代",
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as DebateFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getDebateBySlug(slug: string): Debate | null {
  return getBySlug(DIRS.debates, slug, caches.debates, castDebate);
}

export function getAllDebates(): Debate[] {
  return getAll(DIRS.debates, caches.debates, { get value() { return listCaches.debates; }, set value(v) { listCaches.debates = v; } }, castDebate, (a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
}
