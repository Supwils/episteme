import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Philosopher, PhilosopherFrontmatter, Question, QuestionFrontmatter } from "./types";
import { getDomainContentDir } from "../../lib/content-paths";

const PHILOSOPHY_DIR = getDomainContentDir("philosophy");
const THINKERS_DIR = path.join(PHILOSOPHY_DIR, "thinkers");
const QUESTIONS_DIR = path.join(PHILOSOPHY_DIR, "questions");

const thinkerBySlugCache = new Map<string, Philosopher | null>();
const questionBySlugCache = new Map<string, Question | null>();
let cachedThinkers: Philosopher[] | null = null;
let cachedQuestions: Question[] | null = null;

const FIELD_MAP: Record<string, string> = {
  titleEn: "title_en",
  nameEn: "name_en",
  keyContributions: "key_contributions",
  keyFigures: "key_figures",
  relatedThinkers: "related_thinkers",
};

const ARRAY_FIELDS = new Set([
  "tags", "related", "key_figures", "key_contributions", "related_thinkers",
]);

function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = FIELD_MAP[key] ?? key;
    if (result[normalizedKey] === undefined) {
      result[normalizedKey] = value;
    }
  }
  for (const field of ARRAY_FIELDS) {
    if (result[field] === undefined || result[field] === null) {
      result[field] = [];
    }
  }
  return result;
}

function isSafeSlug(slug: string): boolean {
  return !!slug && !slug.includes("..") && !slug.includes("/") && !slug.includes("\\");
}

export function getThinkerSlugs(): string[] {
  if (!fs.existsSync(THINKERS_DIR)) return [];
  return fs
    .readdirSync(THINKERS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getThinkerBySlug(slug: string): Philosopher | null {
  if (thinkerBySlugCache.has(slug)) return thinkerBySlugCache.get(slug)!;
  if (!isSafeSlug(slug)) return null;
  const filePath = path.join(THINKERS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(THINKERS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Philosopher | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const normalized = normalizeFrontmatter(data as Record<string, unknown>);
    result = {
      title: (normalized.title as string) ?? "",
      philosopher: (normalized.philosopher as string) ?? "",
      era: (normalized.era as PhilosopherFrontmatter["era"]) ?? "当代",
      school: (normalized.school as string) ?? "",
      tags: Array.isArray(normalized.tags) ? (normalized.tags as string[]) : [],
      related: Array.isArray(normalized.related) ? (normalized.related as string[]) : [],
      status: (normalized.status as PhilosopherFrontmatter["status"]) ?? "draft",
      updated: (normalized.updated as string) ?? "",
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  thinkerBySlugCache.set(slug, result);
  return result;
}

export function getAllThinkers(): Philosopher[] {
  if (cachedThinkers) return cachedThinkers;
  cachedThinkers = getThinkerSlugs()
    .map((slug) => getThinkerBySlug(slug))
    .filter((t): t is Philosopher => t !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
  return cachedThinkers;
}

export function getQuestionSlugs(): string[] {
  if (!fs.existsSync(QUESTIONS_DIR)) return [];
  return fs
    .readdirSync(QUESTIONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getQuestionBySlug(slug: string): Question | null {
  if (questionBySlugCache.has(slug)) return questionBySlugCache.get(slug)!;
  if (!isSafeSlug(slug)) return null;
  const filePath = path.join(QUESTIONS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(QUESTIONS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Question | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const normalized = normalizeFrontmatter(data as Record<string, unknown>);
    result = {
      title: (normalized.title as string) ?? "",
      field: (normalized.field as string) ?? "",
      key_figures: Array.isArray(normalized.key_figures) ? (normalized.key_figures as string[]) : [],
      tags: Array.isArray(normalized.tags) ? (normalized.tags as string[]) : [],
      related_thinkers: Array.isArray(normalized.related_thinkers) ? (normalized.related_thinkers as string[]) : [],
      status: (normalized.status as QuestionFrontmatter["status"]) ?? "draft",
      updated: (normalized.updated as string) ?? "",
      slug,
      content,
    };
  } catch {
    // result stays null
  }
  questionBySlugCache.set(slug, result);
  return result;
}

export function getAllQuestions(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = getQuestionSlugs()
    .map((slug) => getQuestionBySlug(slug))
    .filter((q): q is Question => q !== null);
  return cachedQuestions;
}
