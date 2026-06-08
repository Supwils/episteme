import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Philosopher, PhilosopherFrontmatter, Question, QuestionFrontmatter } from "./types";
import { getDomainContentDir } from "./content-paths";

const PHILOSOPHY_DIR = getDomainContentDir("philosophy");
const THINKERS_DIR = path.join(PHILOSOPHY_DIR, "thinkers");
const QUESTIONS_DIR = path.join(PHILOSOPHY_DIR, "questions");

const thinkerBySlugCache = new Map<string, Philosopher | null>();
let cachedThinkers: Philosopher[] | null = null;

const questionBySlugCache = new Map<string, Question | null>();
let cachedQuestions: Question[] | null = null;

export function getThinkerSlugs(): string[] {
  if (!fs.existsSync(THINKERS_DIR)) return [];
  return fs
    .readdirSync(THINKERS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getThinkerBySlug(slug: string): Philosopher | null {
  if (thinkerBySlugCache.has(slug)) return thinkerBySlugCache.get(slug)!;
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(THINKERS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(THINKERS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Philosopher | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as PhilosopherFrontmatter),
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
  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) return null;
  const filePath = path.join(QUESTIONS_DIR, `${slug}.mdx`);
  if (!filePath.startsWith(QUESTIONS_DIR)) return null;
  if (!fs.existsSync(filePath)) return null;
  let result: Question | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    result = {
      ...(data as QuestionFrontmatter),
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
