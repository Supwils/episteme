import { describe, expect, it } from "vitest";
import { tokenize } from "../tokenize";

describe("tokenize", () => {
  it("splits a run of Chinese characters into overlapping bigrams", () => {
    expect(tokenize("热力学")).toEqual(["热力", "力学"]);
  });

  it("keeps a lone Chinese character as its own term", () => {
    expect(tokenize("熵")).toEqual(["熵"]);
  });

  it("lowercases Latin words instead of splitting them", () => {
    expect(tokenize("WebGL")).toEqual(["webgl"]);
  });

  it("treats punctuation and whitespace as run boundaries", () => {
    expect(tokenize("熵增，混乱")).toEqual(["熵增", "混乱"]);
  });

  it("emits Latin and Chinese terms from mixed text", () => {
    expect(tokenize("DNA双螺旋")).toEqual(["dna", "双螺", "螺旋"]);
  });

  it("indexes digits as whole terms", () => {
    expect(tokenize("1905年")).toEqual(["1905", "年"]);
  });

  it("returns nothing for empty or punctuation-only input", () => {
    expect(tokenize("")).toEqual([]);
    expect(tokenize("——，。！")).toEqual([]);
  });

  it("counts an astral-plane character as a single character", () => {
    // 𠮷 is outside the BMP; naive .length would treat it as two characters and
    // emit a bigram made of half a surrogate pair.
    expect(tokenize("𠮷")).toEqual(["𠮷"]);
    expect(tokenize("𠮷野")).toEqual(["𠮷野"]);
  });

  it("makes a mid-title query a subset of the title's terms", () => {
    // The property the whole search design rests on: searching 热力学 must be
    // able to match 熵与热力学第二定律, where it sits mid-token.
    const title = new Set(tokenize("熵与热力学第二定律"));
    for (const term of tokenize("热力学")) {
      expect(title.has(term)).toBe(true);
    }
  });
});
