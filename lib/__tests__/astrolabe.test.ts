import { describe, expect, it } from "vitest";
import {
  astrolabeDomainOfDay,
  astrolabeConfluences,
  astrolabeReadouts,
  dailyShelf,
} from "@/lib/astrolabe";
import { DOMAIN_WEDGES } from "@/lib/knowledge-geometry";

describe("astrolabe data", () => {
  it("gives every wedge a readout with a five-step spine in level order", () => {
    const readouts = astrolabeReadouts();
    expect(readouts.map((r) => r.domain)).toEqual(DOMAIN_WEDGES.map((w) => w.domain));
    for (const readout of readouts) {
      expect(readout.question.length, readout.domain).toBeGreaterThan(4);
      expect(
        readout.steps.map((s) => s.level),
        readout.domain
      ).toEqual([1, 2, 3, 4, 5]);
      for (const step of readout.steps) expect(step.url).toMatch(/^\/[a-z-]+\//);
    }
    const today = astrolabeDomainOfDay(new Date(2026, 8, 24));
    expect(readouts.some((r) => r.domain === today)).toBe(true);
  });

  it("places each confluence on a real bearing", () => {
    const confluences = astrolabeConfluences();
    expect(confluences.length).toBeGreaterThanOrEqual(5);
    for (const c of confluences) {
      expect(c.angleDeg).toBeGreaterThanOrEqual(0);
      expect(c.angleDeg).toBeLessThan(360);
    }
  });

  it("rotates six L2–L3 picks from six different domains, stable within a day", () => {
    const monday = dailyShelf(new Date(2026, 8, 21, 8));
    expect(monday).toHaveLength(6);
    expect(new Set(monday.map((p) => p.domain)).size).toBe(6);
    expect(monday.every((p) => p.level === 2 || p.level === 3)).toBe(true);
    expect(dailyShelf(new Date(2026, 8, 21, 22))).toEqual(monday);
    expect(dailyShelf(new Date(2026, 8, 22, 8))).not.toEqual(monday);
  });
});
