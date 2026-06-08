import type { Era, Theorist, TheoristFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll, eraOrder } from "./normalize";

export function getTheoristSlugs(): string[] {
  return getSlugs(DIRS.theorists);
}

function castTheorist(data: unknown, s: string, c: string): Theorist {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    name_en: (d.name_en as string) ?? "",
    years: (d.years as string) ?? "",
    era: (d.era as Era) ?? "当代",
    school: (d.school as string) ?? "",
    key_contributions: Array.isArray(d.key_contributions) ? (d.key_contributions as string[]) : [],
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as TheoristFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getTheoristBySlug(slug: string): Theorist | null {
  return getBySlug(DIRS.theorists, slug, caches.theorists, castTheorist);
}

export function getAllTheorists(): Theorist[] {
  return getAll(DIRS.theorists, caches.theorists, { get value() { return listCaches.theorists; }, set value(v) { listCaches.theorists = v; } }, castTheorist, (a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
}
