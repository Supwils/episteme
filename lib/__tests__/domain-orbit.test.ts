import { describe, expect, it } from "vitest";
import { buildDomainOrbit } from "@/lib/domain-orbit";
import { KNOWLEDGE_DOMAINS } from "@/lib/new-domains";

describe("buildDomainOrbit", () => {
  it("returns a bounded, well-formed orbit for every engine domain", () => {
    for (const domain of Object.keys(KNOWLEDGE_DOMAINS)) {
      const orbit = buildDomainOrbit(domain);
      expect(orbit, domain).not.toBeNull();
      const { nodes, edges } = orbit!;
      expect(nodes.length, domain).toBeGreaterThanOrEqual(6);
      expect(nodes.length, domain).toBeLessThanOrEqual(72);
      expect(edges.length, domain).toBeLessThanOrEqual(170);
      for (const [a, b] of edges) {
        expect(a, domain).not.toBe(b);
        expect(nodes[a], domain).toBeDefined();
        expect(nodes[b], domain).toBeDefined();
      }
      for (const node of nodes) {
        expect(node.url.startsWith(`/${domain}/`), `${domain} ${node.url}`).toBe(true);
        expect([1, 2, 3, 4, 5]).toContain(node.level);
      }
    }
  });

  it("keeps the curated spine and places it at the path's levels", () => {
    const orbit = buildDomainOrbit("chemistry")!;
    const spine = orbit.nodes.filter((node) => node.spine);
    expect(spine.map((node) => node.level)).toEqual([1, 2, 3, 4, 5]);
    expect(spine[0]?.label).toBe("水");
  });

  it("memoises per domain", () => {
    expect(buildDomainOrbit("law")).toBe(buildDomainOrbit("law"));
  });
});
