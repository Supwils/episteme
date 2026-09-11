import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  engineArticleMetadata,
  frontierArticleMetadata,
  withCanonicalPath,
} from "../article-canonical";

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

describe("article canonical helpers", () => {
  it("merges canonical into existing alternates", () => {
    const next = withCanonicalPath("/law/foundations/what-is-law", {
      title: "法是什么",
      alternates: { languages: { "zh-CN": "/law/foundations/what-is-law" } },
    });
    expect(next.alternates).toEqual({
      languages: { "zh-CN": "/law/foundations/what-is-law" },
      canonical: "/law/foundations/what-is-law",
    });
  });

  it("builds engine and frontier metadata with a relative canonical", () => {
    const engine = engineArticleMetadata("chemistry", "concepts", "acids-and-bases");
    expect(engine.alternates).toEqual({ canonical: "/chemistry/concepts/acids-and-bases" });
    expect(String(engine.title)).toContain("酸与碱");

    const frontier = frontierArticleMetadata(
      "computer-science",
      "inference-time-compute-and-reasoning"
    );
    expect(frontier.alternates).toEqual({
      canonical: "/computer-science/frontier/inference-time-compute-and-reasoning",
    });
  });

  it("covers every generateMetadata page, including non-engine thinker and physics dialogue routes", () => {
    const pages = walkPages("app");
    const missing = pages.filter((file) => {
      const text = readFileSync(file, "utf8");
      if (!text.includes("export async function generateMetadata")) return false;
      return (
        !text.includes("engineArticleMetadata") &&
        !text.includes("frontierArticleMetadata") &&
        !text.includes("withCanonicalPath")
      );
    });
    expect(missing).toEqual([]);
    expect(readFileSync("app/philosophy/thinkers/[slug]/page.tsx", "utf8")).toContain(
      "withCanonicalPath(`/philosophy/thinkers/${slug}`"
    );
    expect(readFileSync("app/universe-physics/dialogues/[slug]/page.tsx", "utf8")).toContain(
      "withCanonicalPath(`/universe-physics/dialogues/${slug}`"
    );
  });
});
