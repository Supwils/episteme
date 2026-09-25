import path from "node:path";
import type { Philosopher, PhilosopherFrontmatter, Question, QuestionFrontmatter } from "./types";
import { loadAllContent, loadContentBySlug } from "./content-article";
import { getDomainContentDir, listContentSlugs } from "./content-paths";

const PHILOSOPHY_DIR = getDomainContentDir("philosophy");
const THINKERS_DIR = path.join(PHILOSOPHY_DIR, "thinkers");
const QUESTIONS_DIR = path.join(PHILOSOPHY_DIR, "questions");

const thinkerBySlugCache = new Map<string, Philosopher | null>();
let cachedThinkers: Philosopher[] | null = null;

const questionBySlugCache = new Map<string, Question | null>();
let cachedQuestions: Question[] | null = null;

const ERA_ORDER: Record<string, number> = { 古代: 0, 中世纪: 1, 近代: 2, 现代: 3, 当代: 4 };

export function getThinkerSlugs(): string[] {
  return listContentSlugs(THINKERS_DIR);
}

export function getThinkerBySlug(slug: string): Philosopher | null {
  return loadContentBySlug(THINKERS_DIR, slug, thinkerBySlugCache, (data, content, nextSlug) => ({
    ...(data as PhilosopherFrontmatter),
    slug: nextSlug,
    content,
  }));
}

export function getAllThinkers(): Philosopher[] {
  if (cachedThinkers) return cachedThinkers;
  cachedThinkers = loadAllContent(
    THINKERS_DIR,
    thinkerBySlugCache,
    (data, content, slug) => ({
      ...(data as PhilosopherFrontmatter),
      slug,
      content,
    }),
    {
      sort: (a, b) => (ERA_ORDER[a.era] ?? 99) - (ERA_ORDER[b.era] ?? 99),
    }
  );
  return cachedThinkers;
}

export function getQuestionSlugs(): string[] {
  return listContentSlugs(QUESTIONS_DIR);
}

export function getQuestionBySlug(slug: string): Question | null {
  return loadContentBySlug(QUESTIONS_DIR, slug, questionBySlugCache, (data, content, nextSlug) => ({
    ...(data as QuestionFrontmatter),
    slug: nextSlug,
    content,
  }));
}

export function getAllQuestions(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = loadAllContent(QUESTIONS_DIR, questionBySlugCache, (data, content, slug) => ({
    ...(data as QuestionFrontmatter),
    slug,
    content,
  }));
  return cachedQuestions;
}
