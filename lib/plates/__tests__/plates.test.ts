import { describe, expect, it } from "vitest";
import { DOMAINS } from "@/lib/data";
import { DOMAIN_SEALS, sealCharacters, type SealDomain } from "@/lib/design/seals";
import { SEAL_GLYPHS } from "@/lib/design/seal-glyphs.generated";
import { sealFramePath } from "@/lib/design/seal-frame";
import { PLATE_GENERATORS, drawPlate } from "@/lib/plates";
import { seededRandom } from "@/lib/plates/random";

const DOMAIN_IDS = Object.keys(DOMAIN_SEALS) as SealDomain[];

describe("domain seals", () => {
  it("cover exactly the catalog domains with distinct characters", () => {
    expect([...DOMAIN_IDS].sort()).toEqual(DOMAINS.map((d) => d.id).sort());
    // 22 domain characters plus the two of the site seal 格致.
    expect(sealCharacters()).toHaveLength(DOMAIN_IDS.length + 2);
  });

  it("have an extracted outline for every character (else run pnpm gen-seal-glyphs)", () => {
    for (const char of sealCharacters()) {
      expect(SEAL_GLYPHS[char], char).toMatch(/^M[\d.]+ [\d.]+/);
    }
  });

  it("draw a stable, per-domain frame", () => {
    expect(sealFramePath("law")).toBe(sealFramePath("law"));
    expect(sealFramePath("law")).not.toBe(sealFramePath("arts"));
  });
});

describe("specimen plates", () => {
  it("has one generator per catalog domain", () => {
    expect(Object.keys(PLATE_GENERATORS).sort()).toEqual(DOMAINS.map((d) => d.id).sort());
  });

  it.each(DOMAIN_IDS)("%s draws a deterministic, well-formed plate within budget", (domain) => {
    const plate = drawPlate(domain);
    expect(drawPlate(domain)).toEqual(plate);
    expect(plate.length).toBeGreaterThan(1);
    expect(plate.some((s) => s.role === "accent")).toBe(true);
    for (const s of plate) {
      expect(s.d, domain).toMatch(/^M/);
      expect(s.d, domain).not.toMatch(/NaN|Infinity|undefined/);
    }
    // Inline SVG on a landing hero: keep each plate small in HTML and RSC.
    const bytes = plate.reduce((sum, s) => sum + s.d.length, 0);
    expect(bytes, `${domain} plate path bytes`).toBeLessThan(24_000);
  });

  it("seeds identical sequences from identical seeds", () => {
    const a = seededRandom("x");
    const b = seededRandom("x");
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});
