import { describe, expect, it } from "vitest";
import { selectRecentArticles } from "@/lib/recent-articles";
import { collectArticles } from "@/lib/search/articles";
import { RECENT_ARTICLES } from "@/lib/site-stats";

describe("recent article discovery", () => {
  it("uses publication metadata and keeps subjects varied with deterministic ties", () => {
    const articles = [
      { title: "旧稿", domain: "law", url: "/law/foundations/old", updated: "2026-08-01" },
      { title: "新稿乙", domain: "law", url: "/law/foundations/b", updated: "2026-10-01" },
      { title: "新稿甲", domain: "law", url: "/law/foundations/a", updated: "2026-10-01" },
      {
        title: "心理学",
        domain: "psychology",
        url: "/psychology/phenomena/example",
        updated: "2026-09-30",
        status: "published",
      },
      {
        title: "草稿",
        domain: "physics",
        url: "/physics/draft",
        updated: "2026-10-02",
        status: "draft",
      },
      { title: "无日期", domain: "history", url: "/history/example", updated: "" },
    ];
    const original = [...articles];
    expect(selectRecentArticles(articles, 2).map((article) => article.title)).toEqual([
      "新稿甲",
      "心理学",
    ]);
    expect(articles).toEqual(original);
  });

  it("publishes only dated, routable source articles in the generated portal feed", () => {
    const sources = new Map(collectArticles().map((article) => [article.url, article]));
    expect(RECENT_ARTICLES.length).toBeGreaterThan(0);
    expect(new Set(RECENT_ARTICLES.map((article) => article.domain)).size).toBe(
      RECENT_ARTICLES.length
    );
    for (const article of RECENT_ARTICLES) {
      const source = sources.get(article.url);
      expect(source?.title).toBe(article.title);
      expect(source?.updated).toBe(article.updated);
      expect(article.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source?.status || "published").toBe("published");
    }
  });
});
