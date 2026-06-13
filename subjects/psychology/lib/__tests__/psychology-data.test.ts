import { describe, it, expect } from "vitest";
import {
  getAllTheorists,
  getTheoristBySlug,
  getTheoristSlugs,
  getAllExperiments,
  getExperimentBySlug,
  getExperimentSlugs,
  getAllPhenomena,
  getPhenomenonBySlug,
  getPhenomenonSlugs,
  getAllSchools,
  getSchoolBySlug,
  getSchoolSlugs,
  getAllDisorders,
  getDisorderBySlug,
  getDisorderSlugs,
  getAllDebates,
  getDebateBySlug,
  getDebateSlugs,
  getAllDialogues,
  getDialogueBySlug,
  getDialogueSlugs,
} from "../mdx";

describe("psychology data access", () => {
  describe("getAllTheorists", () => {
    it("returns 44 theorists", () => {
      expect(getAllTheorists()).toHaveLength(44);
    });

    it("each theorist has required fields (title, slug, content)", () => {
      for (const t of getAllTheorists()) {
        expect(t.title).toBeTruthy();
        expect(t.slug).toBeTruthy();
        expect(t.content).toBeDefined();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllTheorists().map((t) => t.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getTheoristBySlug", () => {
    it("returns a theorist for a valid slug", () => {
      const slugs = getTheoristSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const theorist = getTheoristBySlug(slugs[0]!);
      expect(theorist).not.toBeNull();
      expect(theorist!.slug).toBe(slugs[0]);
      expect(theorist!.title).toBeTruthy();
    });

    it("returns null for a non-existent slug", () => {
      expect(getTheoristBySlug("nonexistent-theorist-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getTheoristBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getTheoristBySlug("../theorists")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getTheoristBySlug("foo/bar")).toBeNull();
    });
  });

  describe("getAllExperiments", () => {
    it("returns 26 experiments", () => {
      expect(getAllExperiments()).toHaveLength(26);
    });

    it("each experiment has required fields (title, slug, content)", () => {
      for (const e of getAllExperiments()) {
        expect(e.title).toBeTruthy();
        expect(e.slug).toBeTruthy();
        expect(e.content).toBeDefined();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllExperiments().map((e) => e.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getExperimentBySlug", () => {
    it("returns an experiment for a valid slug", () => {
      const slugs = getExperimentSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const experiment = getExperimentBySlug(slugs[0]!);
      expect(experiment).not.toBeNull();
      expect(experiment!.slug).toBe(slugs[0]);
    });

    it("returns null for a non-existent slug", () => {
      expect(getExperimentBySlug("nonexistent-experiment-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getExperimentBySlug("../../etc/passwd")).toBeNull();
    });
  });

  describe("getAllPhenomena", () => {
    it("returns all phenomena", () => {
      expect(getAllPhenomena().length).toBeGreaterThanOrEqual(52);
    });

    it("each phenomenon has required fields (title, slug, content)", () => {
      for (const p of getAllPhenomena()) {
        expect(p.title).toBeTruthy();
        expect(p.slug).toBeTruthy();
        expect(p.content).toBeDefined();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllPhenomena().map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getPhenomenonBySlug", () => {
    it("returns a phenomenon for a valid slug", () => {
      const slugs = getPhenomenonSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const phenomenon = getPhenomenonBySlug(slugs[0]!);
      expect(phenomenon).not.toBeNull();
      expect(phenomenon!.slug).toBe(slugs[0]);
    });

    it("returns null for a non-existent slug", () => {
      expect(getPhenomenonBySlug("nonexistent-phenomenon-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getPhenomenonBySlug("../../etc/passwd")).toBeNull();
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

  describe("getAllDisorders", () => {
    it("returns a non-empty array", () => {
      expect(getAllDisorders().length).toBeGreaterThan(0);
    });

    it("each disorder has required fields (title, slug, content)", () => {
      for (const d of getAllDisorders()) {
        expect(d.title).toBeTruthy();
        expect(d.slug).toBeTruthy();
        expect(d.content).toBeDefined();
      }
    });
  });

  describe("getDisorderBySlug", () => {
    it("returns null for a non-existent slug", () => {
      expect(getDisorderBySlug("nonexistent-disorder-xyz")).toBeNull();
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
