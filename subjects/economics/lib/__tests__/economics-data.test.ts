import { describe, it, expect } from "vitest";
import {
  getAllEconomists,
  getEconomistBySlug,
  getEconomistSlugs,
  getAllTheories,
  getTheoryBySlug,
  getTheorySlugs,
  getAllConcepts,
  getConceptBySlug,
  getConceptSlugs,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getAllSchools,
  getSchoolBySlug,
  getSchoolSlugs,
  getAllDebates,
  getDebateBySlug,
  getDebateSlugs,
  getAllDialogues,
  getDialogueBySlug,
  getDialogueSlugs,
} from "../mdx";

describe("economics data access", () => {
  describe("getAllEconomists", () => {
    it("returns 30 economists", () => {
      expect(getAllEconomists()).toHaveLength(30);
    });

    it("each economist has required fields (title, slug, content)", () => {
      for (const e of getAllEconomists()) {
        expect(e.title).toBeTruthy();
        expect(e.slug).toBeTruthy();
        expect(e.content).toBeDefined();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllEconomists().map((e) => e.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getEconomistBySlug", () => {
    it("returns an economist for a valid slug", () => {
      const slugs = getEconomistSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const economist = getEconomistBySlug(slugs[0]!);
      expect(economist).not.toBeNull();
      expect(economist!.slug).toBe(slugs[0]);
      expect(economist!.title).toBeTruthy();
    });

    it("returns null for a non-existent slug", () => {
      expect(getEconomistBySlug("nonexistent-economist-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getEconomistBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getEconomistBySlug("../economists")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getEconomistBySlug("foo/bar")).toBeNull();
    });
  });

  describe("getAllTheories", () => {
    it("returns 13 theories", () => {
      expect(getAllTheories()).toHaveLength(13);
    });

    it("each theory has required fields (title, slug, content)", () => {
      for (const t of getAllTheories()) {
        expect(t.title).toBeTruthy();
        expect(t.slug).toBeTruthy();
        expect(t.content).toBeDefined();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllTheories().map((t) => t.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getTheoryBySlug", () => {
    it("returns a theory for a valid slug", () => {
      const slugs = getTheorySlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const theory = getTheoryBySlug(slugs[0]!);
      expect(theory).not.toBeNull();
      expect(theory!.slug).toBe(slugs[0]);
    });

    it("returns null for a non-existent slug", () => {
      expect(getTheoryBySlug("nonexistent-theory-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getTheoryBySlug("../../etc/passwd")).toBeNull();
    });
  });

  describe("getAllConcepts", () => {
    it("returns a non-empty array", () => {
      expect(getAllConcepts().length).toBeGreaterThan(0);
    });

    it("each concept has required fields (title, slug, content)", () => {
      for (const c of getAllConcepts()) {
        expect(c.title).toBeTruthy();
        expect(c.slug).toBeTruthy();
        expect(c.content).toBeDefined();
      }
    });
  });

  describe("getConceptBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getConceptBySlug("nonexistent-concept-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getConceptBySlug("../../etc/passwd")).toBeNull();
    });
  });

  describe("getAllCaseStudies", () => {
    it("returns a non-empty array", () => {
      expect(getAllCaseStudies().length).toBeGreaterThan(0);
    });

    it("each case study has required fields (title, slug, content)", () => {
      for (const cs of getAllCaseStudies()) {
        expect(cs.title).toBeTruthy();
        expect(cs.slug).toBeTruthy();
        expect(cs.content).toBeDefined();
      }
    });

    it("case studies are sorted by year", () => {
      const studies = getAllCaseStudies();
      for (let i = 1; i < studies.length; i++) {
        expect(studies[i - 1]!.year).toBeLessThanOrEqual(studies[i]!.year);
      }
    });
  });

  describe("getCaseStudyBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getCaseStudyBySlug("nonexistent-case-xyz")).toBeNull();
    });
  });

  describe("getAllSchools", () => {
    it("returns a non-empty array", () => {
      expect(getAllSchools().length).toBeGreaterThan(0);
    });

    it("each school has required fields (title, slug, content)", () => {
      for (const s of getAllSchools()) {
        expect(s.title).toBeTruthy();
        expect(s.slug).toBeTruthy();
        expect(s.content).toBeDefined();
      }
    });
  });

  describe("getSchoolBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getSchoolBySlug("nonexistent-school-xyz")).toBeNull();
    });
  });

  describe("getAllDebates", () => {
    it("returns a non-empty array", () => {
      expect(getAllDebates().length).toBeGreaterThan(0);
    });

    it("each debate has required fields (title, slug, content)", () => {
      for (const d of getAllDebates()) {
        expect(d.title).toBeTruthy();
        expect(d.slug).toBeTruthy();
        expect(d.content).toBeDefined();
      }
    });
  });

  describe("getDebateBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getDebateBySlug("nonexistent-debate-xyz")).toBeNull();
    });
  });

  describe("getAllDialogues", () => {
    it("returns a non-empty array", () => {
      expect(getAllDialogues().length).toBeGreaterThan(0);
    });

    it("each dialogue has required fields (title, slug, content)", () => {
      for (const d of getAllDialogues()) {
        expect(d.title).toBeTruthy();
        expect(d.slug).toBeTruthy();
        expect(d.content).toBeDefined();
      }
    });
  });

  describe("getDialogueBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getDialogueBySlug("nonexistent-dialogue-xyz")).toBeNull();
    });
  });
});
