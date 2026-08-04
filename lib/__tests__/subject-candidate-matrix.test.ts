import { describe, expect, it } from "vitest";
import { KNOWLEDGE_DOMAINS } from "@/lib/knowledge-continuum";
import {
  LAUNCHED_SUBJECT_CANDIDATE_IDS,
  RANKED_NEXT_SUBJECT_CANDIDATES,
  RANKED_SUBJECT_CANDIDATES,
  RECOMMENDED_SUBJECT_CANDIDATE,
  SUBJECT_CANDIDATES,
  SUBJECT_SCORE_DIMENSIONS,
  calculateCandidateScore,
} from "@/lib/subject-candidate-matrix";
import {
  ALL_LINGUISTICS_ARTICLES,
  LINGUISTICS_GLOBAL_COVERAGE,
  LINGUISTICS_SECTIONS,
  LINGUISTICS_VISUALIZATIONS,
} from "@/lib/linguistics-subject-plan";

describe("new subject candidate matrix", () => {
  it("compares every candidate with weights that sum to one", () => {
    expect(SUBJECT_CANDIDATES.map((candidate) => candidate.id)).toEqual([
      "linguistics",
      "comparative-law",
      "arts-aesthetics",
      "engineering",
      "literature-narrative",
    ]);
    const totalWeight = Object.values(SUBJECT_SCORE_DIMENSIONS).reduce(
      (total, dimension) => total + dimension.weight,
      0
    );
    expect(totalWeight).toBeCloseTo(1);
  });

  it("requires a complete L1-L5 spine and valid existing-domain bridges", () => {
    const validDomains = new Set(Object.keys(KNOWLEDGE_DOMAINS));
    for (const candidate of SUBJECT_CANDIDATES) {
      expect(
        candidate.learningSpine.map((stage) => stage.level),
        candidate.id
      ).toEqual([1, 2, 3, 4, 5]);
      expect(candidate.bridgeDomains.length, candidate.id).toBeGreaterThanOrEqual(6);
      expect(
        candidate.bridgeDomains.every((domain) => validDomains.has(domain)),
        candidate.id
      ).toBe(true);
    }
  });

  it("enforces platform launch scope and global coverage", () => {
    for (const candidate of SUBJECT_CANDIDATES) {
      expect(candidate.releaseArticleCount, candidate.id).toBeGreaterThanOrEqual(30);
      // Upper bound moved 50 → 60 on 2026-08-02 (T-CONTENT-47): the band was a
      // launch gate, but live subjects keep growing — linguistics reached 51.
      expect(candidate.releaseArticleCount, candidate.id).toBeLessThanOrEqual(60);
      expect(candidate.visualizations.length, candidate.id).toBeGreaterThanOrEqual(3);
      expect(candidate.visualizations.length, candidate.id).toBeLessThanOrEqual(5);
      expect(candidate.globalCoverageCommitments.length, candidate.id).toBeGreaterThanOrEqual(6);
      expect(
        candidate.sources.some((source) => source.access === "open"),
        candidate.id
      ).toBe(true);
    }
  });

  it("selects the highest weighted unlaunched candidate", () => {
    const scores = RANKED_SUBJECT_CANDIDATES.map((candidate) =>
      calculateCandidateScore(candidate.scores)
    );
    expect(scores).toEqual([...scores].sort((left, right) => right - left));
    expect(LAUNCHED_SUBJECT_CANDIDATE_IDS).toEqual(
      new Set(["linguistics", "comparative-law", "arts-aesthetics", "engineering"])
    );
    expect(RANKED_NEXT_SUBJECT_CANDIDATES.map((candidate) => candidate.id)).toEqual([
      "literature-narrative",
    ]);
    expect(RECOMMENDED_SUBJECT_CANDIDATE.id).toBe("literature-narrative");
    expect(calculateCandidateScore(RECOMMENDED_SUBJECT_CANDIDATE.scores)).toBeCloseTo(4.0);
  });
});

describe("linguistics release plan", () => {
  it("defines six balanced sections with unique articles", () => {
    expect(LINGUISTICS_SECTIONS).toHaveLength(6);
    // Balance is the invariant worth holding, not the launch count: every
    // section must stay populated and none may drift far ahead of the others.
    // Pinning each section to exactly six would freeze the domain at its
    // launch size and reject any later article.
    const perSection = LINGUISTICS_SECTIONS.map((section) => section.articles.length);
    expect(Math.min(...perSection)).toBeGreaterThanOrEqual(6);
    expect(Math.max(...perSection) - Math.min(...perSection)).toBeLessThanOrEqual(3);
    expect(ALL_LINGUISTICS_ARTICLES).toHaveLength(perSection.reduce((a, b) => a + b, 0));
    expect(new Set(ALL_LINGUISTICS_ARTICLES.map((article) => article.slug)).size).toBe(
      ALL_LINGUISTICS_ARTICLES.length
    );
  });

  it("covers every level and every declared visualization prerequisite", () => {
    expect(new Set(ALL_LINGUISTICS_ARTICLES.map((article) => article.level))).toEqual(
      new Set([1, 2, 3, 4, 5])
    );
    const articleSlugs = new Set(ALL_LINGUISTICS_ARTICLES.map((article) => article.slug));
    for (const visualization of LINGUISTICS_VISUALIZATIONS) {
      expect(
        visualization.prerequisiteSlugs.every((slug) => articleSlugs.has(slug)),
        visualization.id
      ).toBe(true);
    }
    expect(LINGUISTICS_VISUALIZATIONS).toHaveLength(5);
    expect(LINGUISTICS_GLOBAL_COVERAGE).toHaveLength(7);
  });

  it("bridges the eight existing domains promised by the candidate", () => {
    const represented = new Set(
      ALL_LINGUISTICS_ARTICLES.flatMap((article) => article.bridgeDomains)
    );
    const linguisticsCandidate = SUBJECT_CANDIDATES.find(
      (candidate) => candidate.id === "linguistics"
    )!;
    for (const domain of linguisticsCandidate.bridgeDomains) {
      expect(represented.has(domain), domain).toBe(true);
    }
  });
});
