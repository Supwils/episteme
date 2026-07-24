import { describe, expect, it } from "vitest";
import { englishTitle } from "../articles";

/**
 * The content base uses two frontmatter spellings for the English title. The
 * retired index mirrors read them inconsistently, dropping ~54 subtitles;
 * reading both keeps every article's English subtitle searchable.
 */
describe("englishTitle", () => {
  it("reads the snake_case spelling", () => {
    expect(englishTitle({ title_en: "Bayesian Inference" })).toBe("Bayesian Inference");
  });

  it("reads the camelCase spelling", () => {
    expect(englishTitle({ titleEn: "Chaos Theory" })).toBe("Chaos Theory");
  });

  it("prefers snake_case when both are present", () => {
    expect(englishTitle({ title_en: "A", titleEn: "B" })).toBe("A");
  });

  it("returns an empty string when neither is present or usable", () => {
    expect(englishTitle({})).toBe("");
    expect(englishTitle({ title_en: 42 })).toBe("");
  });
});
