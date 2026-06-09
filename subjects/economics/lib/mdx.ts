import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Economist,
  EconomistFrontmatter,
  Theory,
  TheoryFrontmatter,
  Concept,
  ConceptFrontmatter,
  CaseStudy,
  CaseStudyFrontmatter,
  School,
  SchoolFrontmatter,
  Debate,
  DebateFrontmatter,
  Dialogue,
  DialogueFrontmatter,
  KnowledgeBase,
  KnowledgeBaseFrontmatter,
} from "./types";
import {
  EconomistSchema,
  TheorySchema,
  ConceptSchema,
  CaseStudySchema,
  SchoolSchema,
  DebateSchema,
  DialogueSchema,
  KnowledgeBaseSchema,
} from "./schemas";
import { getDomainContentDir } from "@/lib/content-paths";

const CONTENT_ROOT = getDomainContentDir("economics");

const DIRS = {
  economists: path.join(CONTENT_ROOT, "economists"),
  theories: path.join(CONTENT_ROOT, "theories"),
  concepts: path.join(CONTENT_ROOT, "concepts"),
  caseStudies: path.join(CONTENT_ROOT, "case-studies"),
  schools: path.join(CONTENT_ROOT, "schools"),
  debates: path.join(CONTENT_ROOT, "debates"),
  dialogues: path.join(CONTENT_ROOT, "dialogues"),
  knowledgeBase: path.join(CONTENT_ROOT, "knowledge-base"),
} as const;

const economistCache = new Map<string, Economist | null>();
const theoryCache = new Map<string, Theory | null>();
const conceptCache = new Map<string, Concept | null>();
const caseStudyCache = new Map<string, CaseStudy | null>();
const schoolCache = new Map<string, School | null>();
const debateCache = new Map<string, Debate | null>();
const dialogueCache = new Map<string, Dialogue | null>();
const knowledgeBaseCache = new Map<string, KnowledgeBase | null>();

let cachedEconomists: Economist[] | null = null;
let cachedTheories: Theory[] | null = null;
let cachedConcepts: Concept[] | null = null;
let cachedCaseStudies: CaseStudy[] | null = null;
let cachedSchools: School[] | null = null;
let cachedDebates: Debate[] | null = null;
let cachedDialogues: Dialogue[] | null = null;
let cachedKnowledgeBase: KnowledgeBase[] | null = null;

function isSafeSlug(slug: string): boolean {
  return !!slug && !slug.includes("..") && !slug.includes("/") && !slug.includes("\\");
}

const FIELD_MAP: Record<string, string> = {
  titleEn: "title_en",
  nameEn: "name_en",
  economist: "name_en",
  keyFigures: "key_figures",
  keyContributions: "key_contributions",
  contributions: "key_contributions",
  keyWork: "key_work",
  relatedTheories: "related",
  relatedEconomicTheories: "related",
  dsmCode: "dsm_code",
  keySymptoms: "key_symptoms",
};

const ARRAY_FIELDS = new Set([
  "tags", "related", "key_figures", "key_contributions", "sides", "participants",
]);

function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = FIELD_MAP[key] ?? key;
    result[normalizedKey] = value;
  }
  for (const field of ARRAY_FIELDS) {
    if (result[field] === undefined || result[field] === null) {
      result[field] = [];
    }
  }
  return result;
}

function readMdxFile<T>(
  dir: string,
  slug: string,
  cache: Map<string, T | null>,
  schema?: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: { issues: { path: (string | number)[]; message: string }[] } } }
): T | null {
  if (cache.has(slug)) return cache.get(slug)!;
  if (!isSafeSlug(slug)) return null;
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath || !filePath.startsWith(dir)) return null;
  let result: T | null = null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const normalized = normalizeFrontmatter(data as Record<string, unknown>);
    let frontmatter: Record<string, unknown> = normalized;
    if (schema) {
      const parsed = schema.safeParse(normalized);
      if (parsed.success) {
        frontmatter = parsed.data as Record<string, unknown>;
      } else if (process.env.NODE_ENV === "development") {
        const details = parsed.error!.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
        console.warn(`[economics] frontmatter validation failed for ${slug}: ${details}`);
      }
    }
    result = { ...frontmatter, slug, content } as T;
  } catch {
    // result stays null
  }
  cache.set(slug, result);
  return result;
}

function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx$/, "").replace(/\.md$/, ""));
}

// ── Economists ─────────────────────────────────────────────────────────

export function getEconomistSlugs(): string[] {
  return getSlugs(DIRS.economists);
}

export function getEconomistBySlug(slug: string): Economist | null {
  return readMdxFile<Economist>(DIRS.economists, slug, economistCache, EconomistSchema);
}

export function getAllEconomists(): Economist[] {
  if (cachedEconomists) return cachedEconomists;
  const eraOrder: Record<string, number> = { 古典: 0, 新古典: 1, 现代: 2, 当代: 3 };
  cachedEconomists = getEconomistSlugs()
    .map((slug) => getEconomistBySlug(slug))
    .filter((e): e is Economist => e !== null)
    .sort((a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
  return cachedEconomists;
}

// ── Theories ───────────────────────────────────────────────────────────

export function getTheorySlugs(): string[] {
  return getSlugs(DIRS.theories);
}

export function getTheoryBySlug(slug: string): Theory | null {
  return readMdxFile<Theory>(DIRS.theories, slug, theoryCache, TheorySchema);
}

export function getAllTheories(): Theory[] {
  if (cachedTheories) return cachedTheories;
  cachedTheories = getTheorySlugs()
    .map((slug) => getTheoryBySlug(slug))
    .filter((t): t is Theory => t !== null);
  return cachedTheories;
}

// ── Concepts ───────────────────────────────────────────────────────────

export function getConceptSlugs(): string[] {
  return getSlugs(DIRS.concepts);
}

export function getConceptBySlug(slug: string): Concept | null {
  return readMdxFile<Concept>(DIRS.concepts, slug, conceptCache, ConceptSchema);
}

export function getAllConcepts(): Concept[] {
  if (cachedConcepts) return cachedConcepts;
  cachedConcepts = getConceptSlugs()
    .map((slug) => getConceptBySlug(slug))
    .filter((c): c is Concept => c !== null);
  return cachedConcepts;
}

// ── Case Studies ───────────────────────────────────────────────────────

export function getCaseStudySlugs(): string[] {
  return getSlugs(DIRS.caseStudies);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return readMdxFile<CaseStudy>(DIRS.caseStudies, slug, caseStudyCache, CaseStudySchema);
}

export function getAllCaseStudies(): CaseStudy[] {
  if (cachedCaseStudies) return cachedCaseStudies;
  cachedCaseStudies = getCaseStudySlugs()
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((c): c is CaseStudy => c !== null)
    .sort((a, b) => a.year - b.year);
  return cachedCaseStudies;
}

// ── Schools ────────────────────────────────────────────────────────────

export function getSchoolSlugs(): string[] {
  return getSlugs(DIRS.schools);
}

export function getSchoolBySlug(slug: string): School | null {
  return readMdxFile<School>(DIRS.schools, slug, schoolCache, SchoolSchema);
}

export function getAllSchools(): School[] {
  if (cachedSchools) return cachedSchools;
  const eraOrder: Record<string, number> = { 古典: 0, 新古典: 1, 现代: 2, 当代: 3 };
  cachedSchools = getSchoolSlugs()
    .map((slug) => getSchoolBySlug(slug))
    .filter((s): s is School => s !== null)
    .sort((a, b) => (eraOrder[a.era] ?? 99) - (eraOrder[b.era] ?? 99));
  return cachedSchools;
}

// ── Debates ────────────────────────────────────────────────────────────

export function getDebateSlugs(): string[] {
  return getSlugs(DIRS.debates);
}

export function getDebateBySlug(slug: string): Debate | null {
  return readMdxFile<Debate>(DIRS.debates, slug, debateCache, DebateSchema);
}

export function getAllDebates(): Debate[] {
  if (cachedDebates) return cachedDebates;
  cachedDebates = getDebateSlugs()
    .map((slug) => getDebateBySlug(slug))
    .filter((d): d is Debate => d !== null);
  return cachedDebates;
}

// ── Dialogues ──────────────────────────────────────────────────────────

export function getDialogueSlugs(): string[] {
  return getSlugs(DIRS.dialogues);
}

export function getDialogueBySlug(slug: string): Dialogue | null {
  return readMdxFile<Dialogue>(DIRS.dialogues, slug, dialogueCache, DialogueSchema);
}

export function getAllDialogues(): Dialogue[] {
  if (cachedDialogues) return cachedDialogues;
  cachedDialogues = getDialogueSlugs()
    .map((slug) => getDialogueBySlug(slug))
    .filter((d): d is Dialogue => d !== null);
  return cachedDialogues;
}

// ── Knowledge Base ─────────────────────────────────────────────────────

export function getKnowledgeBaseSlugs(): string[] {
  return getSlugs(DIRS.knowledgeBase);
}

export function getKnowledgeBaseBySlug(slug: string): KnowledgeBase | null {
  return readMdxFile<KnowledgeBase>(DIRS.knowledgeBase, slug, knowledgeBaseCache, KnowledgeBaseSchema);
}

export function getAllKnowledgeBase(): KnowledgeBase[] {
  if (cachedKnowledgeBase) return cachedKnowledgeBase;
  cachedKnowledgeBase = getKnowledgeBaseSlugs()
    .map((slug) => getKnowledgeBaseBySlug(slug))
    .filter((k): k is KnowledgeBase => k !== null);
  return cachedKnowledgeBase;
}
