import { describe, expect, it } from "vitest";
import { buildValidRoutes } from "@/scripts/valid-routes";
import {
  READING_PATHS,
  getReadingPath,
  readingPathChaptersFor,
  totalReadingSteps,
} from "@/lib/reading-paths";

/**
 * The catalog was split into reading-paths-data.ts; these guard that the
 * accessors still see the data and that the public shape holds.
 */
describe("reading paths", () => {
  it("exposes the catalog with unique slugs", () => {
    expect(READING_PATHS.length).toBeGreaterThan(0);
    const slugs = READING_PATHS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds a path by slug and misses cleanly", () => {
    const first = READING_PATHS[0]!;
    expect(getReadingPath(first.slug)).toBe(first);
    expect(getReadingPath("__nonexistent__")).toBeUndefined();
  });

  it("counts every step across all paths", () => {
    const expected = READING_PATHS.reduce((n, p) => n + p.steps.length, 0);
    expect(totalReadingSteps()).toBe(expected);
    expect(totalReadingSteps()).toBeGreaterThan(0);
  });

  it("gives every step a non-empty title and absolute href", () => {
    for (const path of READING_PATHS) {
      for (const step of path.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("points every chapter at a real route", () => {
    const valid = buildValidRoutes();
    const broken = READING_PATHS.flatMap((path) =>
      path.steps
        .filter((step) => !valid.has(step.href))
        .map((step) => `${path.slug}: ${step.title} → ${step.href}`)
    );
    expect(broken).toEqual([]);
  });

  it("covers the four newest subjects with a spine-shaped path", () => {
    const byDomain = new Map(READING_PATHS.map((path) => [path.domain, path.slug]));
    expect(byDomain.get("literature")).toBe("from-story-to-canon");
    expect(byDomain.get("religion")).toBe("from-religion-to-secularization");
    expect(byDomain.get("anthropology")).toBe("from-culture-to-repatriation");
    expect(byDomain.get("education")).toBe("from-learning-to-comparison");
  });

  it("can recover the chapter index from an article href", () => {
    const education = readingPathChaptersFor(
      "/education/cognition-and-memory/memory-spacing-and-transfer"
    );
    expect(education[0]?.path.slug).toBe("from-learning-to-comparison");
    expect(education[0]?.step).toBe(3);
    expect(
      readingPathChaptersFor("/education/cognition-and-memory/memory-spacing-and-transfer/")
    ).toEqual(education);
    expect(readingPathChaptersFor("/education/spacing-lab")).toEqual([]);
  });
});
