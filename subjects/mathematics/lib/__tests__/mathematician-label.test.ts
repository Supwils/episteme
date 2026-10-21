import { describe, expect, it } from "vitest";
import { getTheoremBySlug, getAllTheorems } from "../theorems";
import { mathematicianDisplayName } from "../mathematician-label";

describe("mathematicianDisplayName", () => {
  it("keeps the theorem entity slug and shows a readable name", () => {
    const theorem = getTheoremBySlug("p-vs-np");
    expect(theorem?.mathematician).toBe("cook");
    expect(mathematicianDisplayName("cook")).toBe("库克");
    expect(mathematicianDisplayName("laplace")).toBe("拉普拉斯");
    expect(mathematicianDisplayName("gauss")).toBe("高斯");
  });

  it("resolves every theorem person away from the raw slug", () => {
    for (const slug of [
      "chinese-remainder-theorem",
      "fundamental-theorem-of-arithmetic",
      "spectral-theorem",
      "rank-nullity",
      "fermats-little-theorem",
      "cayley-hamilton",
      "lagrange-group-theorem",
      "binomial-theorem",
      "inclusion-exclusion",
      "pigeonhole-principle",
      "ramsey-theorem",
      "euler-polyhedron-formula",
    ]) {
      expect(getTheoremBySlug(slug)?.mathematician).toBe("");
    }
    for (const theorem of getAllTheorems()) {
      if (!theorem.mathematician) continue;
      const label = mathematicianDisplayName(theorem.mathematician);
      expect(label).not.toBe(theorem.mathematician);
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it("leaves an unknown slug unchanged", () => {
    expect(mathematicianDisplayName("not-a-person")).toBe("not-a-person");
  });
});
