import { describe, it, expect } from "vitest";
import {
  getThinkerBySlug,
  getAllThinkers,
  getThinkerSlugs,
  getQuestionBySlug,
  getAllQuestions,
  getQuestionSlugs,
} from "../mdx";
import { getSchoolBySlug, getAllSchools, getSchoolSlugs } from "../schools";
import { getIsmBySlug, getAllIsms, getIsmSlugs } from "../isms";
import {
  getExperimentBySlug,
  getAllExperiments,
  getExperimentSlugs,
} from "../experiments";
import {
  getConceptBySlug,
  getAllConcepts,
  getConceptSlugs,
} from "../concepts";
import {
  getDialogueBySlug,
  getAllDialogues,
  getDialogueSlugs,
} from "../dialogues";

describe("philosophy data access", () => {
  // ─── Thinkers (mdx.ts) ───────────────────────────────────────────

  describe("getAllThinkers", () => {
    it("returns a non-empty array", () => {
      const thinkers = getAllThinkers();
      expect(thinkers.length).toBeGreaterThan(0);
    });

    it("each thinker has required fields (title, philosopher, era, school)", () => {
      for (const t of getAllThinkers()) {
        expect(t.title).toBeTruthy();
        expect(t.philosopher).toBeTruthy();
        expect(t.era).toBeTruthy();
        expect(t.school).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllThinkers().map((t) => t.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getThinkerBySlug", () => {
    it("returns a thinker for a valid slug", () => {
      const slugs = getThinkerSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const thinker = getThinkerBySlug(slugs[0]!);
      expect(thinker).not.toBeNull();
      expect(thinker!.slug).toBe(slugs[0]);
      expect(thinker!.title).toBeTruthy();
    });

    it("returns null for an invalid slug", () => {
      expect(getThinkerBySlug("nonexistent-slug-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getThinkerBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getThinkerBySlug("../mdx")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getThinkerBySlug("foo/bar")).toBeNull();
    });
  });

  // ─── Questions (mdx.ts) ─────────────────────────────────────────

  describe("getAllQuestions", () => {
    it("returns a non-empty array", () => {
      const questions = getAllQuestions();
      expect(questions.length).toBeGreaterThan(0);
    });

    it("each question has required fields (title, field)", () => {
      for (const q of getAllQuestions()) {
        expect(q.title).toBeTruthy();
        expect(q.field).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllQuestions().map((q) => q.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getQuestionBySlug", () => {
    it("returns a question for a valid slug", () => {
      const slugs = getQuestionSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const question = getQuestionBySlug(slugs[0]!);
      expect(question).not.toBeNull();
      expect(question!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getQuestionBySlug("nonexistent-question-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getQuestionBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getQuestionBySlug("../mdx")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getQuestionBySlug("foo/bar")).toBeNull();
    });
  });

  // ─── Schools ─────────────────────────────────────────────────────

  describe("getAllSchools", () => {
    it("returns a non-empty array", () => {
      expect(getAllSchools().length).toBeGreaterThan(0);
    });

    it("each school has required fields (title, era)", () => {
      for (const s of getAllSchools()) {
        expect(s.title).toBeTruthy();
        expect(s.era).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllSchools().map((s) => s.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getSchoolBySlug", () => {
    it("returns a school for a valid slug", () => {
      const slugs = getSchoolSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const school = getSchoolBySlug(slugs[0]!);
      expect(school).not.toBeNull();
      expect(school!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getSchoolBySlug("nonexistent-school-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getSchoolBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getSchoolBySlug("../schools")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getSchoolBySlug("foo/bar")).toBeNull();
    });

    it("caches result — same reference on repeated call", () => {
      const slugs = getSchoolSlugs();
      const first = getSchoolBySlug(slugs[0]!);
      const second = getSchoolBySlug(slugs[0]!);
      expect(first).toBe(second);
    });
  });

  // ─── Isms ────────────────────────────────────────────────────────

  describe("getAllIsms", () => {
    it("returns a non-empty array", () => {
      expect(getAllIsms().length).toBeGreaterThan(0);
    });

    it("each ism has required fields (title, category, era)", () => {
      for (const i of getAllIsms()) {
        expect(i.title).toBeTruthy();
        expect(i.category).toBeTruthy();
        expect(i.era).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllIsms().map((i) => i.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getIsmBySlug", () => {
    it("returns an ism for a valid slug", () => {
      const slugs = getIsmSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const ism = getIsmBySlug(slugs[0]!);
      expect(ism).not.toBeNull();
      expect(ism!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getIsmBySlug("nonexistent-ism-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getIsmBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getIsmBySlug("../isms")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getIsmBySlug("foo/bar")).toBeNull();
    });

    it("caches result — same reference on repeated call", () => {
      const slugs = getIsmSlugs();
      const first = getIsmBySlug(slugs[0]!);
      const second = getIsmBySlug(slugs[0]!);
      expect(first).toBe(second);
    });
  });

  // ─── Experiments ─────────────────────────────────────────────────

  describe("getAllExperiments", () => {
    it("returns a non-empty array", () => {
      expect(getAllExperiments().length).toBeGreaterThan(0);
    });

    it("each experiment has required fields (title, philosopher, field)", () => {
      for (const e of getAllExperiments()) {
        expect(e.title).toBeTruthy();
        expect(e.philosopher).toBeTruthy();
        expect(e.field).toBeTruthy();
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
      const exp = getExperimentBySlug(slugs[0]!);
      expect(exp).not.toBeNull();
      expect(exp!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getExperimentBySlug("nonexistent-exp-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getExperimentBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getExperimentBySlug("../experiments")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getExperimentBySlug("foo/bar")).toBeNull();
    });

    it("caches result — same reference on repeated call", () => {
      const slugs = getExperimentSlugs();
      const first = getExperimentBySlug(slugs[0]!);
      const second = getExperimentBySlug(slugs[0]!);
      expect(first).toBe(second);
    });
  });

  // ─── Concepts ────────────────────────────────────────────────────

  describe("getAllConcepts", () => {
    it("returns a non-empty array", () => {
      expect(getAllConcepts().length).toBeGreaterThan(0);
    });

    it("each concept has required fields (title, field)", () => {
      for (const c of getAllConcepts()) {
        expect(c.title).toBeTruthy();
        expect(c.field).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllConcepts().map((c) => c.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getConceptBySlug", () => {
    it("returns a concept for a valid slug", () => {
      const slugs = getConceptSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const concept = getConceptBySlug(slugs[0]!);
      expect(concept).not.toBeNull();
      expect(concept!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getConceptBySlug("nonexistent-concept-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getConceptBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getConceptBySlug("../concepts")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getConceptBySlug("foo/bar")).toBeNull();
    });

    it("caches result — same reference on repeated call", () => {
      const slugs = getConceptSlugs();
      const first = getConceptBySlug(slugs[0]!);
      const second = getConceptBySlug(slugs[0]!);
      expect(first).toBe(second);
    });
  });

  // ─── Dialogues ───────────────────────────────────────────────────

  describe("getAllDialogues", () => {
    it("returns a non-empty array", () => {
      expect(getAllDialogues().length).toBeGreaterThan(0);
    });

    it("each dialogue has required fields (title, era, field)", () => {
      for (const d of getAllDialogues()) {
        expect(d.title).toBeTruthy();
        expect(d.era).toBeTruthy();
        expect(d.field).toBeTruthy();
      }
    });

    it("no duplicate slugs", () => {
      const slugs = getAllDialogues().map((d) => d.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe("getDialogueBySlug", () => {
    it("returns a dialogue for a valid slug", () => {
      const slugs = getDialogueSlugs();
      expect(slugs.length).toBeGreaterThan(0);
      const dialogue = getDialogueBySlug(slugs[0]!);
      expect(dialogue).not.toBeNull();
      expect(dialogue!.slug).toBe(slugs[0]);
    });

    it("returns null for an invalid slug", () => {
      expect(getDialogueBySlug("nonexistent-dialogue-xyz")).toBeNull();
    });

    it("returns null for path traversal attempt", () => {
      expect(getDialogueBySlug("../../etc/passwd")).toBeNull();
    });

    it("returns null for slug with ..", () => {
      expect(getDialogueBySlug("../dialogues")).toBeNull();
    });

    it("returns null for slug with /", () => {
      expect(getDialogueBySlug("foo/bar")).toBeNull();
    });

    it("caches result — same reference on repeated call", () => {
      const slugs = getDialogueSlugs();
      const first = getDialogueBySlug(slugs[0]!);
      const second = getDialogueBySlug(slugs[0]!);
      expect(first).toBe(second);
    });
  });
});
