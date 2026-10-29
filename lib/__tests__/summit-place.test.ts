import { readFileSync } from "node:fs";
import { brotliCompressSync } from "node:zlib";
import { PerspectiveCamera, Vector3 } from "three";
import { beforeAll, describe, expect, it } from "vitest";
import {
  CORE_RADIUS,
  domainWedge,
  levelBand,
  levelHeight,
  levelRadius,
  polarToXY,
} from "@/lib/knowledge-geometry";
import { astrolabeConfluences } from "@/lib/astrolabe";
import { summitEye, SUMMIT_CAMERA_UP, SUMMIT_LOOK_AT } from "@/lib/summit-camera";
import {
  placeSummitNode,
  prerequisiteSteps,
  quantizeSummit,
  ridgeHeight,
  routeDomainForGraph,
  SUMMIT_NODE_LIFT,
} from "@/lib/summit-place";
import { summitCardFile } from "@/lib/summit-cards";
import { summitRouteDomains } from "@/lib/summit-catalog";
import { buildSummitModel, type SummitModel } from "@/lib/summit-model";
import { SUMMIT_GRID, summitTerrainMesh } from "@/lib/summit-terrain";

describe("summit placement", () => {
  it("points the homepage climb link at the summit", () => {
    const invite = readFileSync("components/portal/ClimbInvite.tsx", "utf8");
    expect(invite).toContain('href="/knowledge-summit"');
    expect(invite.trimStart().startsWith('"use client"')).toBe(false);
  });

  it("maps the three graph domain ids that differ from routes", () => {
    expect(routeDomainForGraph("physics")).toBe("universe-physics");
    expect(routeDomainForGraph("history")).toBe("human-history");
    expect(routeDomainForGraph("life-science")).toBe("life-science");
  });

  it("keeps L1 farther out than L5, inside the level band", () => {
    const outer = placeSummitNode("philosophy", 1, "philosophy:outer", 0);
    const inner = placeSummitNode("philosophy", 5, "philosophy:inner", 0);
    expect(outer.radius).toBeGreaterThan(inner.radius);
    expect(outer.radius).toBeGreaterThan(levelRadius(5));
    expect(inner.radius).toBeLessThan(levelRadius(1));
    expect(outer.y).toBeCloseTo(levelHeight(1) + SUMMIT_NODE_LIFT);
    expect(inner.y).toBeCloseTo(levelHeight(5) + SUMMIT_NODE_LIFT);
  });

  it("stays inside the domain wedge and uses the astrolabe axes", () => {
    const point = placeSummitNode("chemistry", 3, "chemistry:axes", 0);
    const wedge = domainWedge("chemistry");
    expect(point.angleDeg).toBeGreaterThan(wedge.startDeg);
    expect(point.angleDeg).toBeLessThan(wedge.endDeg);
    const flat = polarToXY(point.angleDeg, point.radius);
    expect(point.x).toBeCloseTo(flat.x);
    expect(point.z).toBeCloseTo(flat.y);
    expect(point.y).toBeGreaterThan(ridgeHeight(point.radius));
  });

  it("nudges prerequisites inward without leaving the band", () => {
    const calm = placeSummitNode("law", 2, "law:nudge", 0);
    const deep = placeSummitNode("law", 2, "law:nudge", 8);
    const band = levelBand(2);
    expect(deep.radius).toBeLessThan(calm.radius);
    expect(deep.radius).toBeGreaterThanOrEqual(
      band.inner + (band.outer - band.inner) * 0.08 - 1e-9
    );
    expect(deep.y).toBeCloseTo(calm.y);
  });

  it("caps cyclic prerequisites", () => {
    const parents = [[1], [0]];
    expect(prerequisiteSteps(0, parents)).toBeLessThanOrEqual(8);
    expect(prerequisiteSteps(0, [[1], [2], []])).toBe(2);
  });

  it("builds terraces: the foot is lower than the summit", () => {
    expect(ridgeHeight(1)).toBe(0);
    expect(ridgeHeight(levelRadius(5) - 0.01)).toBe(1);
    expect(ridgeHeight(0)).toBeGreaterThan(1);
    expect(ridgeHeight(CORE_RADIUS)).toBeGreaterThan(ridgeHeight(1));
  });
});

describe("summit camera", () => {
  it("stays above the plateau and puts north at a fixed up vector", () => {
    const overhead = summitEye({ tilt: 0, azimuth: 0, distance: 1 });
    const threeQuarter = summitEye({ tilt: 1, azimuth: 0, distance: 1 });
    expect(overhead.y).toBeGreaterThan(threeQuarter.y);
    expect(threeQuarter.y).toBeGreaterThan(1.02);
    expect(overhead.z).toBeGreaterThan(0);
    expect(summitEye({ tilt: 1, azimuth: Math.PI / 2, distance: 1 }).x).toBeGreaterThan(0);
    expect(SUMMIT_CAMERA_UP).toEqual({ x: 0, y: 0, z: -1 });
  });

  it("keeps the subject ring inside the default square view", () => {
    for (const tilt of [0, 1]) {
      const eye = summitEye({ tilt, azimuth: 0.4, distance: 1 });
      const camera = new PerspectiveCamera(42, 1, 0.05, 20);
      camera.position.set(eye.x, eye.y, eye.z);
      camera.up.set(SUMMIT_CAMERA_UP.x, SUMMIT_CAMERA_UP.y, SUMMIT_CAMERA_UP.z);
      camera.lookAt(SUMMIT_LOOK_AT.x, SUMMIT_LOOK_AT.y, SUMMIT_LOOK_AT.z);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      const scratch = new Vector3();
      for (let step = 0; step < 8; step++) {
        const angle = (step / 8) * Math.PI * 2;
        scratch.set(Math.sin(angle) * 1.16, 0, -Math.cos(angle) * 1.16);
        scratch.project(camera);
        expect(Math.abs(scratch.x)).toBeLessThan(0.98);
        expect(Math.abs(scratch.y)).toBeLessThan(0.98);
      }
    }
  });
});

describe("summit model", () => {
  let model: SummitModel;

  beforeAll(() => {
    model = buildSummitModel();
  }, 120_000);

  it("places every node on its own terrace and matches the astrolabe beacons", () => {
    expect(model.nodes.length).toBeGreaterThan(3000);
    for (const node of model.nodes) {
      const band = levelBand(node.level);
      expect(node.radius).toBeGreaterThan(band.inner);
      expect(node.radius).toBeLessThan(band.outer);
    }
    const confluences = astrolabeConfluences();
    expect(model.beacons).toHaveLength(confluences.length);
    for (const beacon of model.beacons) {
      const source = confluences.find((item) => item.id === beacon.id);
      if (!source) throw new Error(`missing confluence ${beacon.id}`);
      const flat = polarToXY(source.angleDeg, CORE_RADIUS * 0.55);
      expect(beacon.x).toBeCloseTo(flat.x);
      expect(beacon.z).toBeCloseTo(flat.y);
      expect(beacon.y).toBeGreaterThan(1.02);
    }
  });

  it("writes a layout file inside the 80 KB brotli budget", () => {
    const bytes = readFileSync("public/summit-layout.json");
    expect(bytes.length).toBeLessThanOrEqual(200 * 1024);
    expect(brotliCompressSync(bytes).length).toBeLessThanOrEqual(80 * 1024);
    const first = model.nodes[0];
    if (!first) throw new Error("summit model is empty");
    const parsed = JSON.parse(bytes.toString()) as { nodes: number[] };
    expect(parsed.nodes.length / 6).toBe(model.nodes.length);
    expect(parsed.nodes[0]).toBe(quantizeSummit(first.x));
    expect(parsed.nodes[1]).toBe(quantizeSummit(first.y));
    expect(parsed.nodes[2]).toBe(quantizeSummit(first.z));
  });

  it("keeps the card file and the twenty-two domain routes inside their budgets", () => {
    expect(summitRouteDomains()).toHaveLength(22);
    const bytes = readFileSync("public/summit-cards.json");
    // Decision 34: raw cap rose to 640 KB after 514085 bytes with brotli still under 180 KB.
    expect(bytes.length).toBeLessThanOrEqual(640 * 1024);
    expect(brotliCompressSync(bytes).length).toBeLessThanOrEqual(200 * 1024);
    const cards = summitCardFile(model.nodes);
    const parsed = JSON.parse(bytes.toString()) as { l: string[]; u: string[] };
    expect(parsed.l).toEqual(cards.l);
    expect(parsed.u).toEqual(cards.u);
    const page = readFileSync("app/knowledge-summit/[domain]/page.tsx", "utf8");
    expect(page).toContain("export const dynamicParams = false");
    expect(page).toContain("generateStaticParams");
  });

  it("packs a terrain mesh from the same height field", () => {
    expect(model.layout.height).toHaveLength(SUMMIT_GRID * SUMMIT_GRID);
    expect(model.layout.nodes.length / 6).toBe(model.nodes.length);
    const mesh = summitTerrainMesh(model.layout.height, model.layout.scale);
    expect(mesh.indices.length).toBeGreaterThan(0);
    expect(mesh.indices.length % 3).toBe(0);
  });
});
