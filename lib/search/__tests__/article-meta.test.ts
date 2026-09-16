import { describe, expect, it } from "vitest";
import type { Article } from "../articles";
import { articleType, searchSectionForDomain, toCorpusSearchDoc } from "../article-meta";

function article(partial: Partial<Article> & Pick<Article, "domain" | "url">): Article {
  return {
    section: "concepts",
    slug: "x",
    title: "标题",
    titleEn: "",
    body: "",
    headings: [],
    keys: [],
    tags: [],
    relations: [],
    ...partial,
  };
}

describe("search article metadata", () => {
  it("remaps route prefixes to the overlay section keys", () => {
    expect(searchSectionForDomain("universe-physics")).toBe("physics");
    expect(searchSectionForDomain("human-history")).toBe("history");
    expect(searchSectionForDomain("philosophy")).toBe("philosophy");
  });

  it("labels frontier and engine-driven entries the way the generator does", () => {
    expect(
      articleType({
        domain: "chemistry",
        url: "/chemistry/frontier/green-hydrogen",
      })
    ).toBe("frontier");
    expect(
      articleType({
        domain: "mathematics",
        url: "/mathematics/theorems/pythagorean-theorem",
      })
    ).toBe("entry");
    expect(
      articleType({
        domain: "philosophy",
        url: "/philosophy/thinkers/socrates",
      })
    ).toBe("article");
  });

  it("writes fallback corpus docs with remapped sections, not route ids", () => {
    const doc = toCorpusSearchDoc(
      article({
        domain: "universe-physics",
        section: "physics",
        url: "/universe-physics/physics/thermodynamics",
        title: "热力学",
      })
    );
    expect(doc.c).toBe("physics");
    expect(doc.u).toBe("/universe-physics/physics/thermodynamics");
    expect(doc.k).toBe("article");
  });
});
