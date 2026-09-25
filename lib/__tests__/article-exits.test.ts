import { readFileSync } from "node:fs";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import ARTICLE_EXITS from "@/generated/article-exits.json";
import { COGNITIVE_NODES } from "@/lib/cognitive-nodes";
import { sidewaysExit, upwardExit } from "@/lib/article-exits";

describe("三向出口", () => {
  it("goes up to a higher-level article that lists this one as a prerequisite", () => {
    const byUrl = new Map(COGNITIVE_NODES.map((node) => [node.url, node]));
    // Several graph nodes can share one article URL (a curated anchor and the
    // article's own node); any of them being the prerequisite qualifies.
    const idsAt = (url: string) =>
      COGNITIVE_NODES.filter((node) => node.url === url).map((n) => n.id);
    const entries = Object.entries(
      ARTICLE_EXITS as unknown as Record<string, { level: number; up: [string, string, number] }>
    );
    expect(entries.length).toBeGreaterThan(1000);
    for (const [url, entry] of entries.slice(0, 300)) {
      const exit = upwardExit(url)!;
      expect(exit.level!, url).toBeGreaterThan(entry.level);
      const prerequisites = COGNITIVE_NODES.filter((node) => node.url === exit.href).flatMap(
        (node) => node.prerequisiteIds ?? []
      );
      expect(
        idsAt(url).some((id) => prerequisites.includes(id)),
        url
      ).toBe(true);
      expect(byUrl.has(exit.href)).toBe(true);
    }
  });

  it("has no upward exit for an article nothing builds on", () => {
    expect(upwardExit("/no/such/article")).toBeNull();
  });

  it("goes sideways to the first cross-domain neighbor the author listed", () => {
    const { content } = matter(readFileSync("content/law/foundations/why-law-exists.mdx", "utf8"));
    const side = sidewaysExit(content, "/law/foundations/why-law-exists")!;
    expect(side.title).toBe("托马斯·霍布斯");
    expect(side.domain).not.toBe("law");
  });

  it("skips same-domain neighbors and unresolvable links", () => {
    const content = "## 跨域连接\n\n- **[[no-such-slug|无处]]**：甲。\n- 普通条目";
    expect(sidewaysExit(content, "/law/x/y")).toBeNull();
  });
});
