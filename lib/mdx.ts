import { authorSummary } from "@/lib/content-utils";
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
    summary: authorSummary(data),
    slug: nextSlug,
    content,
  }));
}

// Figures with no thinker page. Names are taken from the question bodies
// (verified 2026-08). Unknown ids stay as stored so we do not invent a label.
const KEY_FIGURE_FALLBACK: Record<string, string> = {
  bell: "贝尔",
  benacerraf: "贝纳塞拉夫",
  benatar: "贝纳塔尔",
  bergson: "柏格森",
  blackburn: "布莱克本",
  feyerabend: "费耶阿本德",
  field: "菲尔德",
  james: "詹姆斯",
  kane: "凯恩",
  korsgaard: "科斯嘉德",
  kuhn: "库恩",
  lakatos: "拉卡托斯",
  mackie: "麦基",
  mcmahan: "麦克马汉",
  moore: "摩尔",
  narveson: "纳尔维森",
  pereboom: "佩雷布姆",
  regan: "里根",
  singer: "辛格",
  stevenson: "史蒂文森",
  tarski: "塔尔斯基",
  turing: "图灵",
  williams: "威廉姆斯",
  "Viktor Frankl": "弗兰克尔",
  "Martin Seligman": "塞利格曼",
};

/** Reader-facing name. `key_figures` keeps the slug; Chinese titles win when they exist. */
export function thinkerDisplayName(id: string): string {
  if (/[一-鿿]/.test(id)) return id;
  const candidates = [id, id.toLowerCase().replace(/\s+/g, "-")];
  const lastWord = id.split(/\s+/).pop();
  if (lastWord) candidates.push(lastWord.toLowerCase());
  for (const slug of candidates) {
    const title = getThinkerBySlug(slug)?.title;
    if (title) return title;
  }
  return KEY_FIGURE_FALLBACK[id] ?? id;
}

export function getAllThinkers(): Philosopher[] {
  if (cachedThinkers) return cachedThinkers;
  cachedThinkers = loadAllContent(
    THINKERS_DIR,
    thinkerBySlugCache,
    (data, content, slug) => ({
      ...(data as PhilosopherFrontmatter),
      summary: authorSummary(data),
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
    summary: authorSummary(data),
    slug: nextSlug,
    content,
  }));
}

export function getAllQuestions(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = loadAllContent(QUESTIONS_DIR, questionBySlugCache, (data, content, slug) => ({
    ...(data as QuestionFrontmatter),
    summary: authorSummary(data),
    slug,
    content,
  }));
  return cachedQuestions;
}
