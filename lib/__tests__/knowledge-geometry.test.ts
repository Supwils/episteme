import { describe, expect, it } from "vitest";
import { DOMAINS } from "@/lib/data";
import { DOMAIN_CLUSTERS } from "@/lib/domain-clusters";
import {
  CLUSTER_ARCS,
  CLUSTER_GAP_DEG,
  DOMAIN_WEDGES,
  RING_ORDER,
  annularSectorPath,
  domainWedge,
  levelBand,
  levelHeight,
  levelRadius,
  placeInWedge,
  polarToXY,
} from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

const LEVELS: KnowledgeLevel[] = [1, 2, 3, 4, 5];

describe("knowledge geometry — angle is discipline", () => {
  it("places every catalog domain exactly once, inside its own cluster", () => {
    const ringDomains = DOMAIN_WEDGES.map((wedge) => wedge.domain);
    expect([...ringDomains].sort()).toEqual(DOMAINS.map((d) => d.id).sort());
    for (const domain of DOMAINS) {
      expect(domainWedge(domain.id).cluster, domain.id).toBe(domain.cluster);
    }
  });

  it("walks the clusters clockwise in catalog order and closes the circle", () => {
    expect(CLUSTER_ARCS.map((arc) => arc.cluster)).toEqual(DOMAIN_CLUSTERS.map((c) => c.id));
    const first = DOMAIN_WEDGES[0]!;
    const last = DOMAIN_WEDGES.at(-1)!;
    expect(first.startDeg).toBeCloseTo(CLUSTER_GAP_DEG / 2);
    expect(360 - last.endDeg).toBeCloseTo(CLUSTER_GAP_DEG / 2);
    for (let i = 1; i < CLUSTER_ARCS.length; i++) {
      expect(CLUSTER_ARCS[i]!.startDeg - CLUSTER_ARCS[i - 1]!.endDeg).toBeCloseTo(CLUSTER_GAP_DEG);
    }
  });

  it("gives every domain the same wedge width, contiguous within a cluster", () => {
    const widths = DOMAIN_WEDGES.map((w) => w.endDeg - w.startDeg);
    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1e-9);
    for (const arc of CLUSTER_ARCS) {
      const wedges = arc.domains.map(domainWedge);
      for (let i = 1; i < wedges.length; i++) {
        expect(wedges[i]!.startDeg).toBeCloseTo(wedges[i - 1]!.endDeg);
      }
    }
  });

  it("keeps the ring order explicit and complete", () => {
    expect(Object.keys(RING_ORDER).sort()).toEqual(DOMAIN_CLUSTERS.map((c) => c.id).sort());
    expect(() => domainWedge("astrology")).toThrow(/unknown domain/);
  });

  it("makes the cross-cluster neighbours the ones the astrolabe tells a story about", () => {
    const ring = DOMAIN_WEDGES.map((w) => w.domain);
    const neighbours = (a: string, b: string) => {
      const gap = Math.abs(ring.indexOf(a) - ring.indexOf(b));
      return gap === 1 || gap === ring.length - 1;
    };
    expect(neighbours("philosophy", "mathematics")).toBe(true);
    expect(neighbours("engineering", "universe-physics")).toBe(true);
    expect(neighbours("chemistry", "life-science")).toBe(true);
    expect(neighbours("law", "human-history")).toBe(true);
  });
});

describe("knowledge geometry — distance is cognitive stage", () => {
  it("puts L1 on the rim and L5 nearest the core, in equal bands", () => {
    expect(levelRadius(1)).toBe(1);
    const radii = LEVELS.map(levelRadius);
    for (let i = 1; i < radii.length; i++) expect(radii[i]!).toBeLessThan(radii[i - 1]!);
    const widths = LEVELS.map((level) => levelBand(level).outer - levelBand(level).inner);
    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1e-9);
    expect(levelBand(5).inner).toBeGreaterThan(0);
  });

  it("reads the same stage as height on the summit", () => {
    expect(LEVELS.map(levelHeight)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });
});

describe("knowledge geometry — placement", () => {
  it("maps 0° to the top and turns clockwise", () => {
    const top = polarToXY(0, 1);
    const right = polarToXY(90, 1);
    expect(top.x).toBeCloseTo(0);
    expect(top.y).toBeCloseTo(-1);
    expect(right.x).toBeCloseTo(1);
    expect(right.y).toBeCloseTo(0);
  });

  it("keeps placed points inside their wedge and level band", () => {
    for (const wedge of DOMAIN_WEDGES) {
      for (const level of LEVELS) {
        for (const [along, depth] of [
          [0, 0],
          [1, 1],
          [0.5, 0.5],
        ] as const) {
          const point = placeInWedge(wedge.domain, level, along, depth);
          const band = levelBand(level);
          expect(point.angleDeg).toBeGreaterThan(wedge.startDeg);
          expect(point.angleDeg).toBeLessThan(wedge.endDeg);
          expect(point.radius).toBeLessThan(band.outer);
          expect(point.radius).toBeGreaterThan(band.inner);
          expect(Math.hypot(point.x, point.y)).toBeCloseTo(point.radius);
        }
      }
    }
  });

  it("draws an annular sector path at the requested scale", () => {
    const path = annularSectorPath(0, 90, 0.5, 1, 100);
    expect(path).toBe("M0 -100 A100 100 0 0 1 100 0 L50 0 A50 50 0 0 0 0 -50 Z");
  });
});
