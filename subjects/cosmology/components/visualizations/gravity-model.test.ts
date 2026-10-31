import { describe, expect, it } from "vitest";
import { computeGravity, createDefaultBodies, G, SCALE, stepSimulation } from "./gravity-model";

function energy(bodies: ReturnType<typeof createDefaultBodies>) {
  let total = bodies.reduce((sum, b) => sum + 0.5 * b.mass * (b.vx ** 2 + b.vy ** 2), 0);
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i]!;
      const b = bodies[j]!;
      total -= (G * a.mass * b.mass) / (Math.hypot(a.x - b.x, a.y - b.y) / SCALE);
    }
  }
  return total;
}

describe("cosmology gravity demonstration", () => {
  it("accelerates Earth towards the Sun by about 0.00593 m/s² at 1 AU", () => {
    const [sun, earth] = createDefaultBodies();
    const next = stepSimulation([sun!, earth!], 1);
    expect(next[1]!.vx - earth!.vx).toBeCloseTo(-0.00593, 5);
    expect(next[1]!.x).toBeLessThan(earth!.x);
  });

  it("applies equal opposite forces to unequal masses", () => {
    const [sun, earth] = createDefaultBodies();
    const a = computeGravity(sun!, earth!);
    const b = computeGravity(earth!, sun!);
    expect(a.fx / -b.fx).toBeCloseTo(1, 12);
    expect(a.fy + b.fy).toBeCloseTo(0, 12);
  });

  it("returns a near-circular Earth orbit after one analytical two-body period", () => {
    let bodies = createDefaultBodies().slice(0, 2);
    const r = (bodies[1]!.x - bodies[0]!.x) / SCALE;
    const period = 2 * Math.PI * Math.sqrt(r ** 3 / (G * bodies[0]!.mass));
    const steps = Math.ceil(period / 3600);
    for (let i = 0; i < steps; i++) bodies = stepSimulation(bodies, period / steps);
    const relativeX = bodies[1]!.x - bodies[0]!.x;
    const relativeY = bodies[1]!.y - bodies[0]!.y;
    expect(Math.hypot(relativeX - r * SCALE, relativeY)).toBeLessThan(0.02);
  });

  it("bounds energy drift over five simulated years with the default three bodies", () => {
    let bodies = createDefaultBodies();
    const initial = energy(bodies);
    for (let i = 0; i < 5 * 365 * 24; i++) bodies = stepSimulation(bodies, 3600);
    expect(Math.abs((energy(bodies) - initial) / initial)).toBeLessThan(1e-5);
    expect(bodies.every((b) => Number.isFinite(b.x) && Number.isFinite(b.vy))).toBe(true);
  });
});
