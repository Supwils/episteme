import type { Experiment, ExperimentFrontmatter } from "../types";
import { DIRS, caches, listCaches, getSlugs, getBySlug, getAll } from "./normalize";

export function getExperimentSlugs(): string[] {
  return getSlugs(DIRS.experiments);
}

function castExperiment(data: unknown, s: string, c: string): Experiment {
  const d = data as Record<string, unknown>;
  return {
    title: (d.title as string) ?? "",
    title_en: (d.title_en as string) ?? "",
    researcher: (d.researcher as string) ?? "",
    year: (d.year as number) ?? 0,
    field: (d.field as string) ?? "",
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    related: Array.isArray(d.related) ? (d.related as string[]) : [],
    status: (d.status as ExperimentFrontmatter["status"]) ?? "draft",
    updated: (d.updated as string) ?? "",
    slug: s,
    content: c,
  };
}

export function getExperimentBySlug(slug: string): Experiment | null {
  return getBySlug(DIRS.experiments, slug, caches.experiments, castExperiment);
}

export function getAllExperiments(): Experiment[] {
  return getAll(DIRS.experiments, caches.experiments, { get value() { return listCaches.experiments; }, set value(v) { listCaches.experiments = v; } }, castExperiment, (a, b) => a.year - b.year);
}
