import { describe, expect, it } from "vitest";
import { formatChineseCount } from "../format-count";
import { SITE_TOTALS } from "../site-stats";
import { DOMAINS } from "../data";
import { CURIOSITY_SUBJECTS } from "../curiosities";
import { COVERAGE_DOMAIN_COUNT } from "../knowledge-continuum-coverage-meta";

describe("Chinese navigation counts", () => {
  it.each([
    [0, "零"],
    [6, "六"],
    [10, "十"],
    [11, "十一"],
    [20, "二十"],
    [22, "二十二"],
    [99, "九十九"],
    [100, "100"],
  ] as const)("formats %i as %s", (count, text) => {
    expect(formatChineseCount(count)).toBe(text);
  });

  it("keeps the generated domain total aligned with the current registries", () => {
    expect(SITE_TOTALS.domains).toBe(DOMAINS.length);
    expect(SITE_TOTALS.domains).toBe(Object.keys(CURIOSITY_SUBJECTS).length);
    expect(SITE_TOTALS.domains).toBe(COVERAGE_DOMAIN_COUNT);
  });
});
