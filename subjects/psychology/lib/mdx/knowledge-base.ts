import type { KnowledgeBaseArticle } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll } from "./normalize";

export function getKnowledgeBaseSlugs(): string[] {
  return getSlugs(DIRS.knowledgeBase);
}

// Unquoted YAML dates (`updated: 2026-06-06`) parse to a Date — coerce to a string.
function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" ? v : "";
}

function castKnowledgeBase(data: unknown, s: string, c: string): KnowledgeBaseArticle {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    title_en: (d.title_en as string) ?? "",
    category: (d.category as string) ?? "",
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    updated: toDateStr(d.updated),
    slug: s,
    content: c,
  };
}

export function getKnowledgeBaseBySlug(slug: string): KnowledgeBaseArticle | null {
  return getBySlug(DIRS.knowledgeBase, slug, caches.knowledgeBase, castKnowledgeBase);
}

export function getAllKnowledgeBase(): KnowledgeBaseArticle[] {
  return getAll(
    DIRS.knowledgeBase,
    caches.knowledgeBase,
    {
      get value() {
        return listCaches.knowledgeBase;
      },
      set value(v) {
        listCaches.knowledgeBase = v;
      },
    },
    castKnowledgeBase,
    (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
  );
}
