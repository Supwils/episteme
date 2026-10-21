import { describe, expect, it } from "vitest";
import { normalizeSearchQuery, truncateSearchQuery } from "../query";

describe("search query policy", () => {
  it.each([
    { input: "热".repeat(119) + "𠀀", expected: "热".repeat(119) + "𠀀" },
    { input: "𠀀".repeat(121), expected: "𠀀".repeat(120) },
    { input: "热".repeat(119) + "😀更多", expected: "热".repeat(119) + "😀" },
    { input: "a".repeat(121), expected: "a".repeat(120) },
    { input: "DNA 与自然选择", expected: "DNA 与自然选择" },
    { input: "x\ud800y\udc00z", expected: "x�y�z" },
  ])("limits complete code points and makes direct strings URL-safe", ({ input, expected }) => {
    expect(truncateSearchQuery(input)).toBe(expected);
    expect(() => encodeURIComponent(truncateSearchQuery(input))).not.toThrow();
  });

  it("preserves spaces while editing, then canonicalizes before searching", () => {
    expect(truncateSearchQuery("  自然选择  ")).toBe("  自然选择  ");
    expect(normalizeSearchQuery("  自然选择  ")).toBe("自然选择");
    expect(normalizeSearchQuery("  " + "𠀀".repeat(121))).toBe("𠀀".repeat(120));
    expect(normalizeSearchQuery("热".repeat(119) + "  尾部")).toBe("热".repeat(119));
  });
});
