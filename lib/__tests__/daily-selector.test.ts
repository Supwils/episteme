import { describe, it, expect } from "vitest";
import { getDailySelected } from "../daily-selector";

// Characterization snapshots: getDailySelected drives the deterministic
// "daily knowledge" surface. These lock its exact output for fixed
// (date, seedOffset) inputs so the getDailySelected refactor cannot silently
// change what users see on any given day.
describe("getDailySelected (characterization)", () => {
  const cases: Array<[string, number]> = [
    ["2026-01-15", 0],
    ["2026-03-14", 0],
    ["2026-03-14", 1],
    ["2026-06-16", 0],
    ["2026-06-16", 2],
    ["2026-12-25", 0],
  ];
  for (const [dateStr, offset] of cases) {
    it(`is stable for ${dateStr} offset ${offset}`, () => {
      const out = getDailySelected(new Date(`${dateStr}T00:00:00`), offset);
      expect(out).toMatchSnapshot();
    });
  }

  it("is deterministic for identical inputs", () => {
    const a = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    const b = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    expect(a).toEqual(b);
  });

  it("changes the selection when the seed offset changes", () => {
    const a = getDailySelected(new Date("2026-06-16T00:00:00"), 0);
    const b = getDailySelected(new Date("2026-06-16T00:00:00"), 1);
    expect(a.seed).not.toEqual(b.seed);
  });
});
