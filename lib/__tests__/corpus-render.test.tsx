import React from "react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

function articleFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return articleFiles(path);
    return /\.mdx?$/.test(name) && !name.endsWith(".narration.md") && name !== "CREDITS.md"
      ? [path]
      : [];
  });
}

const cjk = (text: string) => (text.match(/[一-鿿]/g) ?? []).length;

/** Prose the reader should see: minus the title line, footnote syntax and link targets. */
function visibleSource(content: string): string {
  return content
    .replace(/^# .*$/m, "")
    .replace(/^\[\^[^\]]+\]:.*$/gm, "")
    .replace(/\[\[[^\]|]+\|/g, "[[")
    .replace(/\]\([^)]*\)/g, "]");
}

// The section-type components (T-DESIGN-06d) regroup prose into cards, stacks
// and plates. This guard renders every article and checks nothing throws and no
// reader-visible Chinese text goes missing along the way.
describe("article corpus through MarkdownRenderer", () => {
  it("renders every article without losing text", () => {
    const failures: string[] = [];
    for (const file of articleFiles("content")) {
      let content: string;
      try {
        content = matter(readFileSync(file, "utf8")).content;
      } catch {
        continue; // Frontmatter the site's own loaders reject is covered by check-content.
      }
      try {
        const html = renderToStaticMarkup(
          <MarkdownRenderer content={content} domain={file.split("/")[1]} />
        );
        const text = html.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, "");
        if (cjk(text) < cjk(visibleSource(content)) * 0.98) failures.push(`${file}: text lost`);
      } catch (error) {
        failures.push(`${file}: ${(error as Error).message}`);
      }
    }
    expect(failures).toEqual([]);
  }, 120_000);
});
