import type { Phenomenon, PhenomenonFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll } from "./normalize";

export function getPhenomenonSlugs(): string[] {
  return getSlugs(DIRS.phenomena);
}

function castPhenomenon(data: unknown, s: string, c: string): Phenomenon {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    title_en: (d.title_en as string) ?? "",
    category: (d.category as string) ?? "",
    key_figures: Array.isArray(d.key_figures) ? (d.key_figures as string[]) : [],
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as PhenomenonFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getPhenomenonBySlug(slug: string): Phenomenon | null {
  return getBySlug(DIRS.phenomena, slug, caches.phenomena, castPhenomenon);
}

export function getAllPhenomena(): Phenomenon[] {
  return getAll(DIRS.phenomena, caches.phenomena, { get value() { return listCaches.phenomena; }, set value(v) { listCaches.phenomena = v; } }, castPhenomenon);
}
