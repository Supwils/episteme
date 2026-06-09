import { describe, it, expect } from "vitest";
import {
  getAllTheorists,
  getAllExperiments,
  getAllPhenomena,
  getAllSchools,
  getAllDisorders,
  getAllDebates,
  getAllDialogues,
  getTheoristSlugs,
  getExperimentSlugs,
  getPhenomenonSlugs,
} from "../mdx";

describe("psychology data integrity", () => {
  const allTheoristSlugs = new Set(getTheoristSlugs());
  const allExperimentSlugs = new Set(getExperimentSlugs());
  const allPhenomenonSlugs = new Set(getPhenomenonSlugs());
  const allValidSlugs = new Set([
    ...allTheoristSlugs,
    ...allExperimentSlugs,
    ...allPhenomenonSlugs,
  ]);

  describe("theorist related links", () => {
    it("related slugs reference existing content across all types", () => {
      const missing: string[] = [];

      for (const theorist of getAllTheorists()) {
        for (const rel of theorist.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`theorist ${theorist.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getTheoristSlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("experiment related links", () => {
    it("relatedTheorists reference existing content across all types", () => {
      const missing: string[] = [];

      for (const experiment of getAllExperiments()) {
        for (const rel of experiment.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`experiment ${experiment.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getExperimentSlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("phenomenon related links", () => {
    it("related slugs reference existing content across all types", () => {
      const missing: string[] = [];

      for (const phenomenon of getAllPhenomena()) {
        for (const rel of phenomenon.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`phenomenon ${phenomenon.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getPhenomenonSlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });
});
