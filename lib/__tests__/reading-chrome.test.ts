import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function walkPages(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory()
      ? walkPages(path)
      : path.endsWith("/page.tsx")
        ? [path]
        : [];
  });
}

const TOC_MARKERS = ["TableOfContents", "ThinkerSidebar"];
const PROGRESS_MARKERS = ["ReadingProgressBar", "ArticleLayout"];
const MODE_MARKERS = ["ReadingModeControls", "ArticleLayout"];
// The design specimen renders a short author-kit sample, not an article.
const NON_ARTICLE_PAGES = new Set(["app/design/page.tsx"]);

describe("article reading chrome", () => {
  it("gives MarkdownRenderer pages a TOC, progress bar, and reading modes", () => {
    const missingToc: string[] = [];
    const missingProgress: string[] = [];
    const missingMode: string[] = [];

    for (const file of walkPages("app")) {
      if (NON_ARTICLE_PAGES.has(file)) continue;
      const text = readFileSync(file, "utf8");
      if (!text.includes('from "@/components/MarkdownRenderer"')) continue;
      if (!TOC_MARKERS.some((marker) => text.includes(marker))) missingToc.push(file);
      if (!PROGRESS_MARKERS.some((marker) => text.includes(marker))) missingProgress.push(file);
      if (!MODE_MARKERS.some((marker) => text.includes(marker))) missingMode.push(file);
    }

    expect({ missingToc, missingProgress, missingMode }).toEqual({
      missingToc: [],
      missingProgress: [],
      missingMode: [],
    });
  });

  it("centers custom article columns the same way as ArticleLayout", () => {
    const drifted: string[] = [];
    for (const file of walkPages("app")) {
      if (NON_ARTICLE_PAGES.has(file)) continue;
      const text = readFileSync(file, "utf8");
      if (!text.includes("article-reading-surface") && !text.includes("ARTICLE_SURFACE_CLASS")) {
        continue;
      }
      const hasCenteredRow =
        text.includes("ARTICLE_BODY_ROW_CLASS") || text.includes("lg:justify-center");
      const hasUncenteredRow =
        /lg:flex-row/.test(text) && !/lg:flex-row[\s\S]{0,80}lg:justify-center/.test(text);
      if (hasUncenteredRow && !hasCenteredRow) drifted.push(file);
    }
    expect(drifted).toEqual([]);
  });

  it("keeps titles inside the centered reading column", () => {
    const layout = readFileSync("components/ArticleLayout.tsx", "utf8");
    const articleAt = layout.indexOf("<article className={cn(ARTICLE_SURFACE_BASE_CLASS");
    const headerAt = layout.indexOf("<header className=");
    expect(articleAt).toBeGreaterThan(-1);
    expect(headerAt).toBeGreaterThan(articleAt);

    const drifted: string[] = [];
    for (const file of walkPages("app")) {
      if (NON_ARTICLE_PAGES.has(file)) continue;
      const text = readFileSync(file, "utf8");
      const rowAt = text.indexOf("<div className={ARTICLE_BODY_ROW_CLASS}>");
      if (rowAt < 0) continue;
      const headerAtPage = text.indexOf("<header");
      if (headerAtPage >= 0 && headerAtPage < rowAt) drifted.push(file);
    }
    expect(drifted).toEqual([]);
  });

  it("keeps the cosmology and extinction shells on the shared reading chrome", () => {
    const cosmologyKb = readFileSync("app/cosmology/knowledge-base/[slug]/page.tsx", "utf8");
    const cosmologyDialogue = readFileSync("app/cosmology/dialogues/[slug]/page.tsx", "utf8");
    const extinctions = readFileSync("app/life-science/extinctions/[slug]/page.tsx", "utf8");

    for (const text of [cosmologyKb, cosmologyDialogue, extinctions]) {
      expect(text).toContain("ArticleLayout");
      expect(text).toContain("TableOfContents");
    }
  });

  it("does not keep the unused physics handwritten placeholder scene", () => {
    expect(existsSync("subjects/physics/scenes-handwritten/physics/PlaceholderScene.tsx")).toBe(
      false
    );
  });
});
