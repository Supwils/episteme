import type { Disorder, DisorderFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll } from "./normalize";

export function getDisorderSlugs(): string[] {
  return getSlugs(DIRS.disorders);
}

function castDisorder(data: unknown, s: string, c: string): Disorder {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    title_en: (d.title_en as string) ?? "",
    category: (d.category as string) ?? "",
    dsm_code: (d.dsm_code as string) ?? "",
    key_symptoms: Array.isArray(d.key_symptoms) ? (d.key_symptoms as string[]) : [],
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as DisorderFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getDisorderBySlug(slug: string): Disorder | null {
  return getBySlug(DIRS.disorders, slug, caches.disorders, castDisorder);
}

export function getAllDisorders(): Disorder[] {
  return getAll(DIRS.disorders, caches.disorders, { get value() { return listCaches.disorders; }, set value(v) { listCaches.disorders = v; } }, castDisorder);
}
