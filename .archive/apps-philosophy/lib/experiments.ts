import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Experiment, ExperimentFrontmatter } from "./types";

const EXP_DIR = path.join(process.cwd(), "content", "experiments");

export function getExperimentSlugs(): string[] {
  if (!fs.existsSync(EXP_DIR)) return [];
  return fs
    .readdirSync(EXP_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getExperimentBySlug(slug: string): Experiment | null {
  const filePath = path.join(EXP_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as ExperimentFrontmatter),
    slug,
    content,
  };
}

export function getAllExperiments(): Experiment[] {
  return getExperimentSlugs()
    .map((s) => getExperimentBySlug(s))
    .filter((e): e is Experiment => e !== null);
}
