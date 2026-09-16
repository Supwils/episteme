import path from "node:path";
import type { Experiment, ExperimentFrontmatter } from "./types";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

const EXP_DIR = path.join(getDomainContentDir("philosophy"), "experiments");

const experimentBySlugCache = new Map<string, Experiment | null>();
let cachedExperiments: Experiment[] | null = null;

function toExperiment(data: Record<string, unknown>, content: string, slug: string): Experiment {
  return {
    ...(data as ExperimentFrontmatter),
    slug,
    content,
  };
}

export function getExperimentSlugs(): string[] {
  return listContentSlugs(EXP_DIR);
}

export function getExperimentBySlug(slug: string): Experiment | null {
  return loadContentBySlug(EXP_DIR, slug, experimentBySlugCache, toExperiment);
}

export function getAllExperiments(): Experiment[] {
  if (cachedExperiments) return cachedExperiments;
  cachedExperiments = loadAllContent(EXP_DIR, experimentBySlugCache, toExperiment);
  return cachedExperiments;
}
