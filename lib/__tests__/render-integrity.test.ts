/**
 * Render-integrity guards — two static checks born from real production bugs
 * (2026-08-02, sessions #221):
 *
 * 1. Every 117 philosophy thinker article rendered its [[wiki links]] as
 *    literal text because the page used a weak custom renderer. Guard B pins
 *    every app/[slug] article page to the shared MarkdownRenderer (or an
 *    explicit, justified exception).
 *
 * 2. Four link clusters (ThinkersList, ThinkerNav, SchoolsList, school-detail)
 *    pointed at /thinkers/... and /schools/... — missing the /philosophy
 *    prefix, all 404. Guard A validates every literal/template href in tsx
 *    against the first segments of the real route table (buildValidRoutes).
 */
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { buildValidRoutes } from "@/scripts/valid-routes";

const ROOT = process.cwd();

function walk(dir: string, match: RegExp): string[] {
  const out: string[] = [];
  const walkDir = (d: string) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        walkDir(full);
      } else if (match.test(entry.name)) {
        out.push(full);
      }
    }
  };
  walkDir(dir);
  return out;
}

const SLUG_ARTICLE_RENDERER = /@\/components\/MarkdownRenderer|DomainArticle|FrontierArticleView/;

/**
 * [slug] pages that legitimately do NOT render article markdown through the
 * shared renderer. Each entry must justify itself — add new exceptions only
 * with a reason, or this guard is toothless.
 */
const RENDERER_EXCEPTIONS: Record<string, string> = {
  "app/human-history/eras/[slug]/page.tsx": "registry-driven era page, no markdown body",
  "app/human-history/events/[slug]/page.tsx": "registry-driven event page, no markdown body",
  "app/human-history/figures/[slug]/page.tsx": "registry-driven figure page, no markdown body",
  "app/human-history/knowledge/[slug]/page.tsx":
    "custom renderer WITH its own wiki-link resolver (LinkResolver → index)",
  "app/life-science/extinctions/[slug]/page.tsx": "data-driven extinction registry page",
  "app/philosophy/dialogues/[slug]/interactive/page.tsx": "interactive tool, no article markdown",
  "app/philosophy/experiments/[slug]/interactive/page.tsx": "interactive tool, no article markdown",
  "app/read/[slug]/page.tsx": "reading-path directory page, no article markdown",
};

describe("render integrity", () => {
  it("every [slug] article page renders markdown through the wiki-capable shared renderer", () => {
    const slugPages = walk(join(ROOT, "app"), /page\.tsx$/).filter((f) => f.includes("[slug]"));
    const violations: string[] = [];
    for (const file of slugPages) {
      const rel = relative(ROOT, file);
      if (RENDERER_EXCEPTIONS[rel]) continue;
      const source = readFileSync(file, "utf8");
      if (!SLUG_ARTICLE_RENDERER.test(source)) {
        violations.push(rel);
      }
    }
    expect(
      violations,
      `[slug] pages rendering markdown without the shared renderer (add to RENDERER_EXCEPTIONS with a reason, or switch to MarkdownRenderer):\n${violations.join("\n")}`
    ).toEqual([]);
  });

  it("every literal/template href targets a real route root", () => {
    const validRoutes = buildValidRoutes();
    const validRoots = new Set<string>();
    for (const route of validRoutes) {
      const seg = route.split("/")[1];
      if (seg) validRoots.add(seg);
    }

    const files = [
      ...walk(join(ROOT, "components"), /\.tsx$/),
      ...walk(join(ROOT, "app"), /\.tsx$/),
      ...walk(join(ROOT, "subjects"), /\.tsx$/),
    ];

    // href="/segment/..." and href={`/segment/...`} — dynamic first segments
    // (`/${domain}/...`) can't be checked statically and are skipped.
    const hrefPattern = /href=\{?["'`](\/[a-zA-Z0-9-]+)(\/|["'`])/g;

    const violations: string[] = [];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(hrefPattern)) {
        const segment = match[1]!.slice(1);
        if (!validRoots.has(segment)) {
          const line = source.slice(0, match.index).split("\n").length;
          violations.push(`${relative(ROOT, file)}:${line} → ${match[1]}`);
        }
      }
    }
    expect(
      violations,
      `href targets with no matching route root (missing domain prefix?):\n${violations.join("\n")}`
    ).toEqual([]);
  });
});
