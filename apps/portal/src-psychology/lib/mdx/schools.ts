import type { Era, School, SchoolFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll, eraOrder } from "./normalize";

export function getSchoolSlugs(): string[] {
  return getSlugs(DIRS.schools);
}

function castSchool(data: unknown, s: string, c: string): School {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    era: (d.era as Era) ?? "当代",
    period: (d.period as string) ?? "",
    founder: (d.founder as string) ?? "",
    key_figures: Array.isArray(d.key_figures) ? (d.key_figures as string[]) : [],
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as SchoolFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getSchoolBySlug(slug: string): School | null {
  return getBySlug(DIRS.schools, slug, caches.schools, castSchool);
}

export function getAllSchools(): School[] {
  return getAll(DIRS.schools, caches.schools, { get value() { return listCaches.schools; }, set value(v) { listCaches.schools = v; } }, castSchool, (a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
}
