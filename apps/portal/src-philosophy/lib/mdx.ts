import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Philosopher,
  PhilosopherFrontmatter,
  Question,
  QuestionFrontmatter,
} from "./types";

const THINKERS_DIR = path.join(process.cwd(), "src-philosophy", "content", "thinkers");
const QUESTIONS_DIR = path.join(process.cwd(), "src-philosophy", "content", "questions");

export function getThinkerSlugs(): string[] {
  if (!fs.existsSync(THINKERS_DIR)) return [];
  return fs
    .readdirSync(THINKERS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getThinkerBySlug(slug: string): Philosopher | null {
  const filePath = path.join(THINKERS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as PhilosopherFrontmatter),
    slug,
    content,
  };
}

export function getAllThinkers(): Philosopher[] {
  return getThinkerSlugs()
    .map((slug) => getThinkerBySlug(slug))
    .filter((t): t is Philosopher => t !== null)
    .sort((a, b) => {
      const eraOrder: Record<string, number> = { 古代: 0, 近代: 1, 现代: 2, 当代: 3 };
      return (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99);
    });
}

export function getQuestionSlugs(): string[] {
  if (!fs.existsSync(QUESTIONS_DIR)) return [];
  return fs
    .readdirSync(QUESTIONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getQuestionBySlug(slug: string): Question | null {
  const filePath = path.join(QUESTIONS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...(data as QuestionFrontmatter),
    slug,
    content,
  };
}

export function getAllQuestions(): Question[] {
  return getQuestionSlugs()
    .map((slug) => getQuestionBySlug(slug))
    .filter((q): q is Question => q !== null);
}
