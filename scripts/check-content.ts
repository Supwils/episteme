import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  ALL_SCHEMAS,
  type ContentType,
} from "../lib/content-schemas.ts";

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
const FURTHER_READING_PATTERN = /延伸阅读|进一步阅读|参考书目|推荐阅读|推荐阅读书目/;

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
    if (hasErrors) {
      console.log(`\n\x1b[31mERROR\x1b[0m ${relPath(result.file)}`);
    }
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
      console.log(`  ${domain}: ${stats.files} files, ${stats.errors} errors, ${stats.warnings} warnings`);
    }
  }

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
