import { describe, expect, it } from "vitest";
import {
  SECTIONS,
  defaultRouteForSection,
  getSectionConfig,
  getSectionFromPath,
  getSectionRoute,
  inferSectionFromTier,
  sectionSupportsView,
  viewModesForSection,
} from "./section";

describe("getSectionFromPath", () => {
  it("returns universe for root and /universe-physics/universe/*", () => {
    expect(getSectionFromPath("/")).toBe("universe");
    expect(getSectionFromPath("/universe-physics/universe")).toBe("universe");
    expect(getSectionFromPath("/universe-physics/universe/observable")).toBe("universe");
    expect(getSectionFromPath("/universe-physics/universe/handwritten/earth")).toBe("universe");
  });

  it("returns physics for /universe-physics/physics/*", () => {
    expect(getSectionFromPath("/universe-physics/physics")).toBe("physics");
    expect(getSectionFromPath("/universe-physics/physics/classical-mechanics")).toBe("physics");
  });
});

describe("getSectionConfig", () => {
  it("returns universe config with 8 tiers and both view modes", () => {
    const cfg = getSectionConfig("universe");
    expect(cfg.tierOrder).toHaveLength(8);
    expect(cfg.defaultTier).toBe("T0");
    expect(cfg.viewModes).toEqual(["3d", "handwritten"]);
    expect(cfg.hasHandwrittenSubpath).toBe(true);
  });

  it("returns physics config with 9 tiers and handwritten only", () => {
    const cfg = getSectionConfig("physics");
    expect(cfg.tierOrder).toHaveLength(9);
    expect(cfg.defaultTier).toBe("P0");
    expect(cfg.viewModes).toEqual(["handwritten"]);
    expect(cfg.hasHandwrittenSubpath).toBe(false);
  });
});

describe("viewModesForSection / sectionSupportsView", () => {
  it("physics does not support 3d", () => {
    expect(viewModesForSection("physics")).toEqual(["handwritten"]);
    expect(sectionSupportsView("physics", "3d")).toBe(false);
    expect(sectionSupportsView("physics", "handwritten")).toBe(true);
  });

  it("universe supports both modes", () => {
    expect(sectionSupportsView("universe", "3d")).toBe(true);
    expect(sectionSupportsView("universe", "handwritten")).toBe(true);
  });
});

describe("inferSectionFromTier", () => {
  it("classifies T-prefix tiers as universe", () => {
    expect(inferSectionFromTier("T0")).toBe("universe");
    expect(inferSectionFromTier("T7")).toBe("universe");
  });
  it("classifies P-prefix tiers as physics", () => {
    expect(inferSectionFromTier("P0")).toBe("physics");
    expect(inferSectionFromTier("P8")).toBe("physics");
  });
});

describe("getSectionRoute", () => {
  it("builds 3d universe routes", () => {
    expect(getSectionRoute("universe", "T0", "3d")).toBe("/universe-physics/universe/observable");
    expect(getSectionRoute("universe", "T6", "3d")).toBe("/universe-physics/universe/solar-system");
  });
  it("builds handwritten universe routes", () => {
    expect(getSectionRoute("universe", "T0", "handwritten")).toBe(
      "/universe-physics/universe/handwritten/observable"
    );
    expect(getSectionRoute("universe", "T7", "handwritten")).toBe(
      "/universe-physics/universe/handwritten/earth"
    );
  });
  it("builds physics routes (always handwritten, no subpath)", () => {
    expect(getSectionRoute("physics", "P0", "handwritten")).toBe(
      "/universe-physics/physics/classical-mechanics"
    );
    expect(getSectionRoute("physics", "P4")).toBe("/universe-physics/physics/quantum-mechanics");
  });
  it("falls back to defaultTier on cross-section tier id", () => {
    // passing P0 into universe section should not produce /universe-physics/universe/P0 — instead defaults to T0
    expect(getSectionRoute("universe", "P0")).toBe("/universe-physics/universe/observable");
  });
});

describe("defaultRouteForSection", () => {
  it("uses each section's defaultTier and defaultViewMode", () => {
    expect(defaultRouteForSection("universe")).toBe("/universe-physics/universe/observable");
    expect(defaultRouteForSection("physics")).toBe("/universe-physics/physics/classical-mechanics");
  });
});

describe("SECTIONS registry", () => {
  it("has stable order universe then physics", () => {
    expect(Object.keys(SECTIONS)).toEqual(["universe", "physics"]);
  });
});
