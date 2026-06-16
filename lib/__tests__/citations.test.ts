import { describe, it, expect } from "vitest";
import { extractBibliography, bibliographyToJsonLd, formatCitation } from "../citations";

describe("extractBibliography", () => {
  it("pulls numbered entries from a 参考文献 section", () => {
    const md = [
      "# 标题",
      "正文段落。",
      "## 参考文献",
      "1. Born, M.; Wolf, E. *Principles of Optics*. CUP, 1999.",
      "2. Feynman, R. **QED**. Princeton, 1985.",
    ].join("\n");
    expect(extractBibliography(md)).toEqual([
      "Born, M.; Wolf, E. Principles of Optics. CUP, 1999.",
      "Feynman, R. QED. Princeton, 1985.",
    ]);
  });

  it("supports the 延伸阅读 / References variants and bullet lists", () => {
    const md = ["## 延伸阅读", "- A. 第一本", "## References", "- B. second"].join("\n");
    // both variant headings count
    expect(extractBibliography(md)).toEqual(["A. 第一本", "B. second"]);
  });

  it("stops collecting once a new section heading appears", () => {
    const md = ["## 参考文献", "1. Kept entry", "## 相关条目", "1. Not a citation"].join("\n");
    expect(extractBibliography(md)).toEqual(["Kept entry"]);
  });

  it("returns nothing when there is no bibliography section", () => {
    expect(extractBibliography("## 正文\n这是一段没有来源的内容。")).toEqual([]);
    expect(bibliographyToJsonLd("没有任何标题或列表")).toEqual([]);
  });

  it("strips markdown links down to their label", () => {
    const md = "## 参考文献\n1. [NASA Exoplanet Archive](https://example.org)";
    expect(extractBibliography(md)).toEqual(["NASA Exoplanet Archive"]);
  });
});

describe("formatCitation", () => {
  it("composes author, year, title, publisher, doi", () => {
    expect(
      formatCitation({
        author: "Riess, A.",
        year: 2022,
        title: "A Comprehensive Measurement of H0",
        publisher: "ApJL",
        doi: "10.3847/2041-8213/ac5c5b",
      })
    ).toBe(
      "Riess, A.. (2022). A Comprehensive Measurement of H0. ApJL. DOI: 10.3847/2041-8213/ac5c5b"
    );
  });

  it("works with only a title", () => {
    expect(formatCitation({ title: "Just a book" })).toBe("Just a book");
  });
});
