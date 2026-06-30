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
  "psychology",
  "computer-science",
  "political-science",
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
  experiments: 80,
  questions: 60,
  dialogues: 80,
  paradoxes: 80,
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
  experiments: 1700,
  questions: 1300,
  dialogues: 1700,
  paradoxes: 1700,
};

const TODO_PATTERN = /\b(TODO|FIXME|HACK|XXX)\b/i;
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

  // Phase 1 — every real KB/dialogue file must resolve through its loader after
  // the encode that the URL applies to the slug.
  for (const domain of ["cosmology", "life-science", "universe-physics"]) {
    const kb = createKnowledgeBase(domain);
    for (const slug of kb.getSlugs()) {
      const article = kb.getArticleBySlug(encodeURIComponent(slug));
      if (!article || !article.content.trim()) {
        console.log(
          `  \x1b[31mERROR\x1b[0m ${domain}/knowledge-base/${slug} does not resolve (404)`
        );
        errors++;
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
      if (lines < MIN_FRONTIER_LINES) {
        console.log(
          `  \x1b[33mWARN\x1b[0m ${rel}: too short (${lines} lines, min ${MIN_FRONTIER_LINES})`
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
  // A bibliography heading (any accepted variant; tolerant of `{#anchor}`).
  const isCitationHeading = (line: string): boolean =>
    /^(参考文献|延伸阅读|进一步阅读|参考书目|参考资料|参考来源|引用|学术文献|推荐阅读|推荐阅读书目|references?|further\s+reading)$/i.test(
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
  }

  if (warnings === 0) {
    console.log(`  \x1b[32mAll prose passes citation/readability hygiene.\x1b[0m`);
  } else {
    console.log(
      `  ${nonStandardHeading} off-spec heading(s), ${squashed} run-on file(s), ${appendedAfterRefs} appended-after-refs file(s).`
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
