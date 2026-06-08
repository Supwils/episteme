import { describe, it, expect } from "vitest";
import { BIAS_TAXONOMY } from "../../components/visualizations/BiasTaxonomy";
import { getPhenomenonSlugs } from "../mdx";

describe("BiasTaxonomy navigation integrity", () => {
  it("every bias that links out maps to an existing phenomenon page", () => {
    const validSlugs = new Set(getPhenomenonSlugs());
    const broken: string[] = [];

    for (const category of BIAS_TAXONOMY) {
      for (const bias of category.biases) {
        if (bias.slug && !validSlugs.has(bias.slug)) {
          broken.push(`${bias.id} → ${bias.slug}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });
});
