import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { MOLECULES } from "../molecules";

describe("molecule related reading", () => {
  it("points relatedHref at real article routes", () => {
    const valid = buildValidRoutes();
    const resolves = (url: string) => {
      if (valid.has(url)) return true;
      const parts = url.split("/");
      const last = parts.at(-1);
      if (!last) return false;
      parts[parts.length - 1] = encodeURIComponent(decodeURIComponent(last));
      return valid.has(parts.join("/"));
    };
    const broken = MOLECULES.filter((m) => m.relatedHref && !resolves(m.relatedHref)).map(
      (m) => `${m.pdbId} → ${m.relatedHref}`
    );
    expect(broken).toEqual([]);
  });

  it("sends hemoglobin to protein folding, not cardiovascular disease", () => {
    const hb = MOLECULES.find((m) => m.pdbId === "1HHO");
    expect(hb?.relatedHref).toBe("/life-science/knowledge-base/分子生物学--蛋白质折叠");
    expect(hb?.relatedLabel).toBe("蛋白质折叠");
  });

  it("sends GFP to bioluminescence, not a dead end", () => {
    const gfp = MOLECULES.find((m) => m.pdbId === "1EMA");
    expect(gfp?.relatedHref).toBe("/life-science/knowledge-base/进化专题--生物发光");
    expect(gfp?.relatedLabel).toBe("生物发光");
  });

  it("sends the Dickerson dodecamer to DNA, not CRISPR", () => {
    const dna = MOLECULES.find((m) => m.pdbId === "1BNA");
    expect(dna?.relatedHref).toBe("/life-science/knowledge-base/人体--DNA与遗传");
    expect(dna?.relatedLabel).toBe("DNA 与遗传");
  });
});

describe("molecule gallery copy", () => {
  it("does not hardcode white text that vanishes in the light theme", () => {
    const source = readFileSync("app/molecules/page.tsx", "utf-8");
    expect(source).not.toMatch(/text-white\//);
  });
});
