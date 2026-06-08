import { describe, it, expect } from "vitest";
import {
  getAllEconomists,
  getAllTheories,
  getAllConcepts,
  getEconomistSlugs,
  getTheorySlugs,
  getConceptSlugs,
} from "../mdx";

describe("economics data integrity", () => {
  const allEconomistSlugs = new Set(getEconomistSlugs());
  const allTheorySlugs = new Set(getTheorySlugs());
  const allConceptSlugs = new Set(getConceptSlugs());
  const allValidSlugs = new Set([
    ...allEconomistSlugs,
    ...allTheorySlugs,
    ...allConceptSlugs,
  ]);

  describe("economist related links", () => {
    it("all related slugs point to existing economics content", () => {
      const missing: string[] = [];

      for (const economist of getAllEconomists()) {
        for (const rel of economist.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`economist ${economist.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getEconomistSlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("theory related links", () => {
    it("all related slugs point to existing economics content", () => {
      const missing: string[] = [];

      for (const theory of getAllTheories()) {
        for (const rel of theory.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`theory ${theory.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getTheorySlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("concept related links", () => {
    it("all related slugs point to existing economics content", () => {
      const missing: string[] = [];

      for (const concept of getAllConcepts()) {
        for (const rel of concept.related) {
          if (!allValidSlugs.has(rel)) {
            missing.push(`concept ${concept.slug} → ${rel}`);
          }
        }
      }

      expect(missing).toEqual([]);
    });

    it("no duplicate slugs", () => {
      const slugs = getConceptSlugs();
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });
});
