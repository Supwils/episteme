import { describe, expect, it } from "vitest";
import { READING_PATHS, getReadingPath, totalReadingSteps } from "@/lib/reading-paths";

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
});
