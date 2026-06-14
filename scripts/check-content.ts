import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { ALL_SCHEMAS, FrontierSchema, type ContentType } from "../lib/content-schemas.ts";
import { FRONTIER_DOMAINS } from "../lib/frontier.ts";
import { createKnowledgeBase } from "../lib/generic-kb.ts";
import { createDialogues } from "../lib/generic-dialogues.ts";
import { COSMOLOGY_KB_DATA } from "../content/cosmology/knowledge-base-data.ts";
import { COSMOLOGY_DIALOGUES_DATA } from "../content/cosmology/dialogues-data.ts";

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

function getContentType(filePath: string): ContentType | null {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const domain = rel.split(path.sep)[0];
  if (domain === "philosophy" || domain === "mathematics" || domain === "life-science") {
    return domain;
  }
  return null;
}

function getSubType(filePath: string): string | null {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const parts = rel.split(path.sep);
  return parts.length >= 2 ? parts[1]! : null;
}

function countNonEmptyLines(content: string): number {
  return content.split("\n").filter((l) => l.trim().length > 0).length;
}

function findTodoLines(content: string): number[] {
  const lines: number[] = [];
  content.split("\n").forEach((line, i) => {
    if (TODO_PATTERN.test(line)) lines.push(i + 1);
  });
  return lines;
}

function collectAllSlugs(domain: ContentType): Set<string> {
  const slugs = new Set<string>();
  const domainDir = path.join(CONTENT_ROOT, domain);
  const files = findMdxFiles(domainDir);
  for (const f of files) {
    const slug = path.basename(f, ".mdx");
    slugs.add(slug);
  }
  return slugs;
}

function checkFile(filePath: string, allSlugs: Map<ContentType, Set<string>>): CheckResult {
  const issues: Issue[] = [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const contentType = getContentType(filePath);
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

  const schemas = ALL_SCHEMAS[contentType];
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
  const minLines = MIN_LINES[subType];
  if (minLines && bodyLineCount < minLines) {
    issues.push({
      type: "warning",
      message: `Content too short: ${bodyLineCount} non-empty lines (minimum ${minLines} for ${subType})`,
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

function main() {
  const domains: ContentType[] = ["philosophy", "mathematics", "life-science"];

  const allSlugs = new Map<ContentType, Set<string>>();
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
      const ct = getContentType(r.file) ?? "unknown";
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
