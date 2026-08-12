import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import type { z } from "zod";
import { ALL_SCHEMAS, FrontierSchema } from "../lib/content-schemas.ts";
import {
  EconomistSchema,
  ConceptSchema as EconConceptSchema,
  CaseStudySchema as EconCaseStudySchema,
  SchoolSchema as EconSchoolSchema,
  DebateSchema as EconDebateSchema,
  DialogueSchema as EconDialogueSchema,
  KnowledgeBaseSchema as EconKnowledgeBaseSchema,
} from "../subjects/economics/lib/schemas.ts";
import { FRONTIER_DOMAINS } from "../lib/frontier.ts";
import { createKnowledgeBase } from "../lib/generic-kb.ts";
import { createDialogues } from "../lib/generic-dialogues.ts";
import { COSMOLOGY_KB_DATA } from "../content/cosmology/knowledge-base-data.ts";
import { COSMOLOGY_DIALOGUES_DATA } from "../content/cosmology/dialogues-data.ts";
import { LinguisticsArticleSchema } from "../subjects/linguistics/lib/schema.ts";
import { collectArticles } from "../lib/search/articles.ts";
import { WIKI_LINK_INDEX, resolveWikiLink } from "../lib/wiki-link-index.ts";

// Every domain whose .mdx frontmatter is structured enough for the universal
// required-field / depth / citation checks. Domains without a Zod schema below
// still get those universal checks — they just skip schema validation.
// Legacy .md domains (human-history, cosmology/universe-physics KB) carry no
// status/updated frontmatter yet and are validated by their own passes instead.
const MDX_DOMAINS = [
  "philosophy",
  "mathematics",
  "life-science",
  "economics",
  "human-history",
  "psychology",
  "medicine",
  "earth-science",
  "computer-science",
  "political-science",
  "sociology",
  "linguistics",
  "law",
  "arts",
  "engineering",
] as const;

// Optional per-domain { subType -> Zod schema } maps. economics wires the
// schemas that already drive its runtime loader; ALL_SCHEMAS covers the rest.
const DOMAIN_SCHEMAS: Record<string, Record<string, z.ZodTypeAny>> = {
  ...ALL_SCHEMAS,
  economics: {
    economists: EconomistSchema,
    concepts: EconConceptSchema,
    "case-studies": EconCaseStudySchema,
    schools: EconSchoolSchema,
    debates: EconDebateSchema,
    dialogues: EconDialogueSchema,
    "knowledge-base": EconKnowledgeBaseSchema,
  },
  linguistics: {
    "sounds-and-signs": LinguisticsArticleSchema,
    "words-sentences-meaning": LinguisticsArticleSchema,
    "acquisition-and-mind": LinguisticsArticleSchema,
    "history-typology-society": LinguisticsArticleSchema,
    "writing-systems": LinguisticsArticleSchema,
  },
};

interface Issue {
  type: "error" | "warning";
  message: string;
  line?: number;
}

interface CheckResult {
  file: string;
  issues: Issue[];
}

const MIN_LINES: Record<string, number> = {
  concepts: 100,
  thinkers: 100,
  mathematicians: 100,
  theorems: 80,
  schools: 100,
  isms: 80,
  methods: 100,
  experiments: 80,
  questions: 60,
  dialogues: 80,
  paradoxes: 80,
  "sounds-and-signs": 100,
  "words-sentences-meaning": 100,
  "acquisition-and-mind": 100,
  "history-typology-society": 100,
  "writing-systems": 100,
  foundations: 100,
  "public-law": 100,
  "private-law": 100,
  "criminal-and-procedure": 100,
  "legal-traditions": 100,
  "global-and-digital": 100,
  foundations: 100,
  media: 100,
  architecture: 100,
  traditions: 100,
  aesthetics: 100,
  methods: 100,
  energy: 100,
  materials: 100,
  machines: 100,
  civil: 100,
  frontiers: 100,
  "trial-analyses": 100,
  "judgment-analyses": 100,
  "policy-analyses": 100,
  "source-analyses": 100,
  "event-analyses": 100,
};

// Real depth is CJK character count, not physical non-empty lines. A complete,
// readable CJK article written in the spec-mandated short-paragraph style lands
// around ~50-60 lines / ~2500+ chars; the line metric alone mis-flags dense
// long-paragraph prose as "too short" and rewards padding to hit the line bar.
// We treat a file as too short only when it is thin by BOTH measures (see below).
const MIN_CJK_CHARS: Record<string, number> = {
  concepts: 2200,
  thinkers: 2200,
  mathematicians: 2200,
  theorems: 1700,
  schools: 2200,
  isms: 1700,
  methods: 2200,
  experiments: 1700,
  questions: 1300,
  dialogues: 1700,
  paradoxes: 1700,
  "sounds-and-signs": 2200,
  "words-sentences-meaning": 2200,
  "acquisition-and-mind": 2200,
  "history-typology-society": 2200,
  "writing-systems": 2200,
  foundations: 2200,
  "public-law": 2200,
  "private-law": 2200,
  "criminal-and-procedure": 2200,
  "legal-traditions": 2200,
  "global-and-digital": 2200,
  foundations: 2200,
  media: 2200,
  architecture: 2200,
  traditions: 2200,
  aesthetics: 2200,
  methods: 2200,
  energy: 2200,
  materials: 2200,
  machines: 2200,
  civil: 2200,
  frontiers: 2200,
  "trial-analyses": 2200,
  "judgment-analyses": 2200,
  "policy-analyses": 2200,
  "source-analyses": 2200,
  "event-analyses": 2200,
};

const TODO_PATTERN = /(?:^|[\s([{<])(?:TODO|FIXME|HACK|XXX)(?:\s*[:：)\]}>\-]|$)|待补|待完善/;
const HEADING_PATTERN = /^##\s+/m;
const FURTHER_READING_PATTERN =
  /延伸阅读|进一步阅读|参考书目|参考文献|参考资料|参考来源|推荐阅读|推荐阅读书目/;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_ROOT = path.resolve(__dirname, "..", "content");

function findMdxFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

function getDomain(filePath: string): string | null {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const domain = rel.split(path.sep)[0];
  return domain && (MDX_DOMAINS as readonly string[]).includes(domain) ? domain : null;
}

function getSubType(filePath: string): string | null {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const parts = rel.split(path.sep);
  return parts.length >= 2 ? parts[1]! : null;
}

function countNonEmptyLines(content: string): number {
  return content.split("\n").filter((l) => l.trim().length > 0).length;
}

function countCjkChars(content: string): number {
  return (content.match(/[一-鿿]/g) || []).length;
}

function findTodoLines(content: string): number[] {
  const lines: number[] = [];
  content.split("\n").forEach((line, i) => {
    if (TODO_PATTERN.test(line)) lines.push(i + 1);
  });
  return lines;
}

function collectAllSlugs(domain: string): Set<string> {
  const slugs = new Set<string>();
  const domainDir = path.join(CONTENT_ROOT, domain);
  const files = findMdxFiles(domainDir);
  for (const f of files) {
    const slug = path.basename(f, ".mdx");
    slugs.add(slug);
  }
  // Frontier articles are `.md` (not `.mdx`) and are valid `related:` targets,
  // so include their slugs or every cross-link to a frontier piece reads as broken.
  const frontierDir = path.join(domainDir, "frontier");
  if (fs.existsSync(frontierDir)) {
    for (const entry of fs.readdirSync(frontierDir)) {
      if (entry.endsWith(".md")) slugs.add(path.basename(entry, ".md"));
    }
  }
  return slugs;
}

function checkFile(filePath: string, allSlugs: Map<string, Set<string>>): CheckResult {
  const issues: Issue[] = [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const contentType = getDomain(filePath);
  const subType = getSubType(filePath);

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch {
    issues.push({ type: "error", message: "Failed to parse frontmatter" });
    return { file: filePath, issues };
  }

  const { data: fm, content } = parsed;

  if (!contentType || !subType) {
    issues.push({ type: "error", message: `Cannot determine content type from path` });
    return { file: filePath, issues };
  }

  const schemas = DOMAIN_SCHEMAS[contentType];
  const schema = schemas?.[subType];

  if (schema) {
    const result = schema.safeParse(fm);
    if (!result.success) {
      for (const issue of result.error.issues) {
        issues.push({
          type: "error",
          message: `frontmatter: ${issue.path.join(".") || "(root)"} — ${issue.message}`,
        });
      }
    }
  }

  if (!fm.status) {
    issues.push({ type: "error", message: "Missing required field: status" });
  }
  if (!fm.title) {
    issues.push({ type: "error", message: "Missing required field: title" });
  }
  if (!fm.updated) {
    issues.push({ type: "error", message: "Missing required field: updated" });
  }

  const bodyLineCount = countNonEmptyLines(content);
  const cjkChars = countCjkChars(content);
  const minLines = MIN_LINES[subType];
  const minChars = MIN_CJK_CHARS[subType];
  // Thin by BOTH measures = genuinely too short. A file with enough lines OR
  // enough CJK depth passes — this clears the dense-paragraph false positives
  // (real article, low line count) without rewarding padding to a line target.
  if (minLines && bodyLineCount < minLines && (!minChars || cjkChars < minChars)) {
    issues.push({
      type: "warning",
      message: `Content too short: ${bodyLineCount} non-empty lines / ${cjkChars} CJK chars (need ${minLines} lines or ${minChars ?? "—"} chars for ${subType})`,
    });
  }

  if (!HEADING_PATTERN.test(content)) {
    issues.push({ type: "warning", message: "No ## heading found in body" });
  }

  if (!FURTHER_READING_PATTERN.test(content)) {
    issues.push({ type: "warning", message: "No 延伸阅读/参考书目 section found" });
  }

  const related: string[] = Array.isArray(fm.related)
    ? fm.related
    : Array.isArray(fm.related_thinkers)
      ? fm.related_thinkers
      : [];

  if (related.length > 0) {
    const domainSlugs = allSlugs.get(contentType) ?? new Set<string>();
    for (const ref of related) {
      if (typeof ref === "string" && !domainSlugs.has(ref)) {
        const existsInOtherDomain = [...allSlugs.values()].some((s) => s.has(ref));
        if (!existsInOtherDomain) {
          issues.push({
            type: "warning",
            message: `Broken related link: "${ref}" not found in any content directory`,
          });
        }
      }
    }
  }

  if (fm.status === "published") {
    const todoLines = findTodoLines(content);
    for (const line of todoLines) {
      issues.push({
        type: "warning",
        message: `TODO/FIXME found in published file`,
        line,
      });
    }
  }

  return { file: filePath, issues };
}

/**
 * Verify every routable KB/dialogue article still resolves after the round-trip
 * Next does on its slug param (CJK slugs arrive percent-encoded). A miss here is
 * a silent 404 — exactly the class of bug that hid ~99 CJK-named KB articles.
 * Also flags search-index data slugs that point at content which no longer
 * exists (live "search result → 404" links).
 */
function checkLinkIntegrity(): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Link Integrity`);
  console.log(`${"=".repeat(60)}`);

  // Phase 0 — slug uniqueness within a domain. Two files sharing a basename in
  // the same domain make the bare wiki-link key ambiguous, so gen-wiki-links
  // drops it (see buildForward) and EVERY `[[slug]]` pointing there silently
  // degrades to plain text. Three such collisions shipped undetected before
  // this check existed, because nothing else looks at filenames across sections.
  {
    const seen = new Map<string, string[]>(); // `${domain}/${basename}` -> paths
    const walkDom = (dir: string, out: string[] = []): string[] => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walkDom(full, out);
        else if (/\.mdx?$/.test(e.name) && !e.name.endsWith(".narration.md")) out.push(full);
      }
      return out;
    };
    for (const domain of fs.readdirSync(CONTENT_ROOT)) {
      const domDir = path.join(CONTENT_ROOT, domain);
      if (!fs.existsSync(domDir) || !fs.statSync(domDir).isDirectory()) continue;
      for (const file of walkDom(domDir)) {
        const slug = path.basename(file).replace(/\.mdx?$/, "");
        const key = `${domain}/${slug}`;
        seen.set(key, [...(seen.get(key) ?? []), file]);
      }
    }
    // A collision only hurts when something actually links to the bare name:
    // KB articles route as `<category>--<name>`, so a shared basename (e.g. an
    // `概述` per era) is harmless unless a `[[概述]]` exists somewhere.
    const referenced = new Set<string>();
    for (const domain of fs.readdirSync(CONTENT_ROOT)) {
      const domDir = path.join(CONTENT_ROOT, domain);
      if (!fs.existsSync(domDir) || !fs.statSync(domDir).isDirectory()) continue;
      for (const file of walkDom(domDir)) {
        const body = fs.readFileSync(file, "utf8");
        for (const m of body.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g)) {
          referenced.add(m[1]!.trim());
        }
      }
    }
    for (const [key, paths] of seen) {
      if (paths.length < 2) continue;
      const bare = key.slice(key.indexOf("/") + 1);
      if (!referenced.has(bare)) continue; // nobody links the bare name — harmless
      console.log(
        `  \x1b[33mWARN\x1b[0m duplicate slug "${key}" in ${paths.length} files, and \`[[${bare}]]\` is referenced — the bare key is dropped as ambiguous, so those links render as plain text:`
      );
      for (const pth of paths) console.log(`         ${path.relative(CONTENT_ROOT, pth)}`);
      warnings++;
    }
  }

  // Phase 0.5 — an article must not wiki-link to itself. Writing a batch of
  // cross-domain sections makes this easy to do by mistake (2026-07-27:
  // `experimental-linguistics` linked to itself instead of `linguistic-fieldwork`),
  // and nothing downstream complains — buildBacklinks drops self-targets, so the
  // only symptom is a link that reloads the page the reader is already on.
  {
    const walkAll = (dir: string, out: string[] = []): string[] => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walkAll(full, out);
        else if (/\.mdx?$/.test(e.name) && !e.name.endsWith(".narration.md")) out.push(full);
      }
      return out;
    };
    for (const file of walkAll(CONTENT_ROOT)) {
      const slug = path.basename(file).replace(/\.mdx?$/, "");
      const body = fs.readFileSync(file, "utf8");
      const selfLinked = [...body.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g)].some(
        (m) => m[1]!.trim() === slug
      );
      if (selfLinked) {
        console.log(
          `  \x1b[33mWARN\x1b[0m ${path.relative(CONTENT_ROOT, file)} links to itself via \`[[${slug}]]\``
        );
        warnings++;
      }
    }
  }

  // Phase 0.75 — every inline wiki target in publicly routable content must
  // resolve through the exact same generated index used by MarkdownRenderer.
  // Previously a miss silently became bold-looking prose, so authors and CI
  // could not distinguish a real knowledge edge from a dead reference. Scan
  // collectArticles() rather than the filesystem to exclude editorial notes
  // and other non-public markdown by the same rules as search and backlinks.
  {
    let checked = 0;
    const missing = new Map<string, Set<string>>();
    for (const article of collectArticles()) {
      for (const match of article.body.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g)) {
        checked++;
        const slug = match[1]!.trim();
        if (!WIKI_LINK_INDEX[slug]) {
          const sources = missing.get(slug) ?? new Set<string>();
          sources.add(article.url);
          missing.set(slug, sources);
          continue;
        }
        const target = resolveWikiLink(slug, article.domain);
        if (target === article.url) {
          console.log(
            `  \x1b[31mERROR\x1b[0m ${article.url} links to itself through alias/key \`[[${slug}]]\``
          );
          errors++;
        }
      }
    }
    for (const [slug, sources] of [...missing].sort(([a], [b]) => a.localeCompare(b))) {
      console.log(
        `  \x1b[31mERROR\x1b[0m unresolved wiki target \`[[${slug}]]\` in ${sources.size} routable article(s):`
      );
      for (const source of [...sources].sort()) console.log(`         ${source}`);
      errors++;
    }
    if (missing.size === 0) {
      console.log(`  \x1b[32m${checked} inline wiki-link occurrence(s) resolve.\x1b[0m`);
    }
  }

  // Phase 1 — every real KB/dialogue file must resolve through its loader after
  // the encode that the URL applies to the slug.
  for (const domain of ["cosmology", "life-science", "mathematics", "universe-physics"]) {
    const kb = createKnowledgeBase(domain);
    for (const slug of kb.getSlugs()) {
      const article = kb.getArticleBySlug(encodeURIComponent(slug));
      if (!article || !article.content.trim()) {
        console.log(
          `  \x1b[31mERROR\x1b[0m ${domain}/knowledge-base/${slug} does not resolve (404)`
        );
        errors++;
      }
      if (domain === "mathematics" && article) {
        const cjk = countCjkChars(article.content);
        if (cjk < 2200) {
          console.log(
            `  \x1b[31mERROR\x1b[0m mathematics/knowledge-base/${slug} is too short (${cjk} CJK chars; need 2200)`
          );
          errors++;
        }
      }
    }
  }
  for (const domain of ["cosmology", "universe-physics"]) {
    const dlg = createDialogues(domain);
    for (const slug of dlg.getSlugs()) {
      if (!dlg.getBySlug(slug)) {
        console.log(`  \x1b[31mERROR\x1b[0m ${domain}/dialogues/${slug} does not resolve (404)`);
        errors++;
      }
    }
  }

  // Phase 2 — search-index data modules build URLs from their own slug lists;
  // any slug with no underlying article is a dead search result.
  const cosKb = createKnowledgeBase("cosmology");
  for (const { slug } of COSMOLOGY_KB_DATA) {
    if (!cosKb.getArticleBySlug(slug)) {
      console.log(
        `  \x1b[33mWARN\x1b[0m search-index cosmology KB slug "${slug}" has no article (dead link)`
      );
      warnings++;
    }
  }
  const cosDlg = createDialogues("cosmology");
  for (const { slug } of COSMOLOGY_DIALOGUES_DATA) {
    if (!cosDlg.getBySlug(slug)) {
      console.log(
        `  \x1b[33mWARN\x1b[0m search-index cosmology dialogue slug "${slug}" has no article (dead link)`
      );
      warnings++;
    }
  }

  if (errors === 0 && warnings === 0) {
    console.log(`  \x1b[32mAll routable content resolves.\x1b[0m`);
  }
  return { errors, warnings };
}

const MIN_FRONTIER_LINES = 60;
// Same philosophy as MIN_CJK_CHARS above: physical line count is a bad depth
// proxy — merging single-sentence paragraphs into real prose lowers it without
// removing a word. A frontier article passes on EITHER measure, so dense
// writing is not punished and padding to a line target is not rewarded.
const MIN_FRONTIER_CJK = 1800;

/**
 * Frontier articles span every domain and are not covered by the per-domain
 * .mdx pass above (they are .md under content/<domain>/frontier/). Validate
 * their frontmatter against FrontierSchema plus the same depth/citation bar.
 */
function checkFrontier(): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Frontier Articles`);
  console.log(`${"=".repeat(60)}`);

  let total = 0;
  for (const domain of FRONTIER_DOMAINS) {
    const dir = path.join(CONTENT_ROOT, domain, "frontier");
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith(".md")) continue;
      total++;
      const rel = `${domain}/frontier/${entry}`;
      const raw = fs.readFileSync(path.join(dir, entry), "utf-8");
      let parsed: matter.GrayMatterFile<string>;
      try {
        parsed = matter(raw);
      } catch {
        console.log(`  \x1b[31mERROR\x1b[0m ${rel}: failed to parse frontmatter`);
        errors++;
        continue;
      }
      const result = FrontierSchema.safeParse(parsed.data);
      if (!result.success) {
        for (const issue of result.error.issues) {
          console.log(
            `  \x1b[31mERROR\x1b[0m ${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`
          );
          errors++;
        }
      }
      const lines = countNonEmptyLines(parsed.content);
      const frontierCjk = countCjkChars(parsed.content);
      if (lines < MIN_FRONTIER_LINES && frontierCjk < MIN_FRONTIER_CJK) {
        console.log(
          `  \x1b[33mWARN\x1b[0m ${rel}: too short (${lines} lines / ${frontierCjk} CJK chars, need ${MIN_FRONTIER_LINES} lines or ${MIN_FRONTIER_CJK} chars)`
        );
        warnings++;
      }
      if (!FURTHER_READING_PATTERN.test(parsed.content)) {
        console.log(`  \x1b[33mWARN\x1b[0m ${rel}: no 延伸阅读/参考书目 section`);
        warnings++;
      }
    }
  }

  if (errors === 0 && warnings === 0) {
    console.log(`  \x1b[32m${total} frontier article(s) look good.\x1b[0m`);
  }
  return { errors, warnings };
}

// Canonical citation headings are 参考文献 (sources) and 延伸阅读 (further
// reading); these are the off-spec variants to fold back in.
const NONSTANDARD_CITATION_HEADING = /^#{2,4}[ \t]+(references?|推荐阅读(?:书目)?)[ \t]*$/i;

/** Every prose article (.md + .mdx) under content/, for cross-cutting checks. */
function findAllContentFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // history renders from data/assets, not articles — skip those payloads.
      if (entry.name === "assets" || entry.name === "lib") continue;
      results.push(...findAllContentFiles(fullPath));
    } else if (
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) &&
      !entry.name.endsWith(".narration.md")
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Cross-cutting prose hygiene over every article in every domain (.md + .mdx) —
 * the narrative/citation bar from docs/叙事与引用规范.md that the per-domain
 * frontmatter pass cannot see (it only scans the 7 .mdx domains). Warnings only:
 * these guide content rework, they do not gate the build.
 */
function checkProseHygiene(): { errors: number; warnings: number } {
  let warnings = 0;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Prose & Citation Hygiene`);
  console.log(`${"=".repeat(60)}`);

  let nonStandardHeading = 0;
  let squashed = 0;
  let appendedAfterRefs = 0;
  let fragmented = 0;
  // A bibliography heading (any accepted variant; tolerant of `{#anchor}`).
  // `引用` is deliberately absent, mirroring `lib/citations.ts`: the ~200 files
  // using it put pull quotes there, never a bibliography, so counting it as one
  // makes every later section look appended-after-references.
  const isCitationHeading = (line: string): boolean =>
    /^(参考文献|延伸阅读|进一步阅读|参考书目|参考资料|参考来源|学术文献|推荐阅读|推荐阅读书目|references?|further\s+reading)$/i.test(
      line
        .replace(/^#{2,4}\s+/, "")
        .replace(/\s*\{#[^}]*\}\s*$/, "")
        .trim()
    );
  for (const file of findAllContentFiles(CONTENT_ROOT)) {
    let body: string;
    try {
      body = matter(fs.readFileSync(file, "utf-8")).content;
    } catch {
      continue; // frontmatter parse errors are surfaced by the per-domain pass
    }
    const rel = path.relative(process.cwd(), file);

    // 1) Citation section must use the canonical 参考文献 / 延伸阅读 heading.
    const offSpec = body.split("\n").find((l) => NONSTANDARD_CITATION_HEADING.test(l));
    if (offSpec) {
      console.log(
        `  \x1b[33mWARN\x1b[0m ${rel}: non-standard citation heading "${offSpec.replace(/^#+\s*/, "").trim()}" — use 参考文献 or 延伸阅读`
      );
      warnings++;
      nonStandardHeading++;
    }

    // 2) "。 " (period + space mid-line) is the sentence-cramming artifact that
    //    hurts readability (see economics early batch). Flag dense cases.
    const runOns = body.match(/。[ 　]+(?=\S)/g);
    if (runOns && runOns.length >= 3) {
      console.log(
        `  \x1b[33mWARN\x1b[0m ${rel}: ${runOns.length} run-on sentences crammed on one line (split for readability)`
      );
      warnings++;
      squashed++;
    }

    // 3) Bibliography must be last: flag a non-citation `## ` section that
    //    appears AFTER a citation heading (the "append-after-references" debt).
    const h2s = body.split("\n").filter((l) => /^##\s+/.test(l) && !/^###/.test(l));
    let seenCite = false;
    let appended: string | null = null;
    for (const h of h2s) {
      if (isCitationHeading(h)) seenCite = true;
      else if (seenCite && appended === null) appended = h.replace(/^#+\s*/, "").trim();
    }
    if (appended) {
      console.log(
        `  \x1b[33mWARN\x1b[0m ${rel}: content section "${appended}" appears after the bibliography — move 参考文献/延伸阅读 to the end`
      );
      warnings++;
      appendedAfterRefs++;
    }

    // 4) Fragmented prose: >60% of prose paragraphs under 40 CJK chars reads
    //    like slide bullets, not an article (mirror of scripts/audit-fragmented-prose.mjs).
    //    Exclusions: blocks that lead into a formula/code/table/list/quote block
    //    (legit lead-ins), human-history `标题：` page-subtitle lines, and the
    //    human-history KB editorial meta docs (internal documents, not articles).
    if (
      !/human-history\/knowledge-base\/(索引|内容深度规范|项目规划|开发规范|工程守则|审校工作台)\.md$/.test(
        rel
      )
    ) {
      const blocks = body
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter(Boolean);
      const isBlockLead = (next: string | undefined): boolean =>
        next !== undefined &&
        (/^\$\$/.test(next) ||
          /^```/.test(next) ||
          /^\s*\|/.test(next) ||
          /^\s*(?:[-*+]|\d+\.)\s/.test(next) ||
          /^>/.test(next));
      const prose = blocks
        .map((b, i) => [b, i] as const)
        .filter(
          ([b]) =>
            /[一-鿿]/.test(b) && !/^[#>|\-*\d`$]/.test(b) && !b.includes("|") && !/^标题：/.test(b)
        );
      if (prose.length >= 8) {
        const short = prose.filter(
          ([b, i]) => countCjkChars(b) > 0 && countCjkChars(b) < 40 && !isBlockLead(blocks[i + 1])
        ).length;
        if (short / prose.length > 0.6) {
          console.log(
            `  \x1b[33mWARN\x1b[0m ${rel}: fragmented prose — ${short}/${prose.length} paragraphs under 40 CJK chars (merge into flowing paragraphs)`
          );
          warnings++;
          fragmented++;
        }
      }
    }
  }

  if (warnings === 0) {
    console.log(`  \x1b[32mAll prose passes citation/readability hygiene.\x1b[0m`);
  } else {
    console.log(
      `  ${nonStandardHeading} off-spec heading(s), ${squashed} run-on file(s), ${appendedAfterRefs} appended-after-refs file(s), ${fragmented} fragmented file(s).`
    );
  }
  return { errors: 0, warnings };
}

function main() {
  const domains: readonly string[] = MDX_DOMAINS;

  const allSlugs = new Map<string, Set<string>>();
  for (const domain of domains) {
    allSlugs.set(domain, collectAllSlugs(domain));
  }

  const results: CheckResult[] = [];
  let totalFiles = 0;

  for (const domain of domains) {
    const domainDir = path.join(CONTENT_ROOT, domain);
    const files = findMdxFiles(domainDir);
    for (const file of files) {
      totalFiles++;
      const result = checkFile(file, allSlugs);
      if (result.issues.length > 0) {
        results.push(result);
      }
    }
  }

  const relPath = (f: string) => path.relative(process.cwd(), f);

  let errorCount = 0;
  let warningCount = 0;

  for (const result of results) {
    const hasErrors = result.issues.some((i) => i.type === "error");
    const tag = hasErrors ? "\x1b[31mERROR\x1b[0m" : "\x1b[33mWARN\x1b[0m";
    console.log(`\n${tag} ${relPath(result.file)}`);
    for (const issue of result.issues) {
      const tag = issue.type === "error" ? "\x1b[31mERROR\x1b[0m" : "\x1b[33mWARN\x1b[0m";
      const loc = issue.line ? `:${issue.line}` : "";
      console.log(`  ${tag} ${issue.message}${loc}`);
      if (issue.type === "error") errorCount++;
      else warningCount++;
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Content Quality Report`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Total files scanned:  ${totalFiles}`);
  console.log(`Files with issues:    ${results.length}`);
  console.log(`Errors:               ${errorCount}`);
  console.log(`Warnings:             ${warningCount}`);
  console.log(`${"=".repeat(60)}`);

  if (results.length > 0) {
    const byDomain: Record<string, { errors: number; warnings: number; files: number }> = {};
    for (const r of results) {
      const ct = getDomain(r.file) ?? "unknown";
      byDomain[ct] ??= { errors: 0, warnings: 0, files: 0 };
      byDomain[ct]!.files++;
      for (const i of r.issues) {
        if (i.type === "error") byDomain[ct]!.errors++;
        else byDomain[ct]!.warnings++;
      }
    }
    console.log(`\nBy domain:`);
    for (const [domain, stats] of Object.entries(byDomain)) {
      console.log(
        `  ${domain}: ${stats.files} files, ${stats.errors} errors, ${stats.warnings} warnings`
      );
    }
  }

  const link = checkLinkIntegrity();
  errorCount += link.errors;
  warningCount += link.warnings;

  const frontier = checkFrontier();
  errorCount += frontier.errors;
  warningCount += frontier.warnings;

  const hygiene = checkProseHygiene();
  errorCount += hygiene.errors;
  warningCount += hygiene.warnings;

  if (errorCount > 0) {
    console.log(`\n\x1b[31mContent check FAILED with ${errorCount} error(s).\x1b[0m`);
    process.exit(1);
  } else if (warningCount > 0) {
    console.log(`\n\x1b[33mContent check PASSED with ${warningCount} warning(s).\x1b[0m`);
  } else {
    console.log(`\n\x1b[32mContent check PASSED. All files look good!\x1b[0m`);
  }
}

main();
