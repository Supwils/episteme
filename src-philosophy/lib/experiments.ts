import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Experiment, ExperimentFrontmatter } from "./types";
import { getDomainContentDir } from "../../lib/content-paths";

const EXP_DIR = path.join(getDomainContentDir("philosophy"), "experiments");

const experimentBySlugCache = new Map<string, Experiment | null>();
let cachedExperiments: Experiment[] | null = null;

export function getExperimentSlugs(): string[] {
  if (!fs.existsSync(EXP_DIR)) return [];
  return fs
    .readdirSync(EXP_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getExperimentBySlug(slug: string): Experiment | null {
  if (experimentBySlugCache.has(slug)) return experimentBySlugCache.get(slug)!;
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(EXP_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(EXP_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Experiment | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as ExperimentFrontmatter),
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  experimentBySlugCache.set(slug, result);
  return result;
}

export function getAllExperiments(): Experiment[] {
  if (cachedExperiments) return cachedExperiments;
  cachedExperiments = getExperimentSlugs()
    .map((s) => getExperimentBySlug(s))
    .filter((e): e is Experiment => e !== null);
  return cachedExperiments;
}
