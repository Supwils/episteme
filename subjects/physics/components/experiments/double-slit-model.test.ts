import { describe, expect, it } from "vitest";
import { sampleScreenPosition, screenDensity, type SlitMode } from "./double-slit-model";

function seededRandom() {
  let seed = 1947;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

function sampleWindows(mode: SlitMode) {
  const random = seededRandom();
  let minima = 0;
  let maxima = 0;
  for (let i = 0; i < 20000; i++) {
    const position = sampleScreenPosition(mode, random);
    expect(position).toBeGreaterThanOrEqual(-1);
    expect(position).toBeLessThanOrEqual(1);
    if (Math.abs(Math.abs(position) - 0.125) < 0.02) minima++;
    if (Math.abs(Math.abs(position) - 0.25) < 0.02) maxima++;
  }
  return minima / maxima;
}

describe("double-slit screen statistics", () => {
  it("keeps the diffraction envelope when path records remove the interference term", () => {
    expect(screenDensity(0, "wave")).toBe(1);
    expect(screenDensity(0.125, "wave")).toBeLessThan(1e-20);
    expect(screenDensity(0.125, "observe")).toBeGreaterThan(0.9);
  });

  it("accumulates dark and bright fringes only in the coherent sample", () => {
    expect(sampleWindows("wave")).toBeLessThan(0.08);
    expect(sampleWindows("observe")).toBeGreaterThan(0.8);
  });
});
