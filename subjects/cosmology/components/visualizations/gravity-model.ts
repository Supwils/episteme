export const G = 6.6743e-11;
export const SVG_SIZE = 600;
export const SCALE = 1e-9;
export const TIME_STEP = 3600;
const MAX_TRAIL = 150;

export interface Body {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  radius: number;
  mass: number;
  // Position uses SVG units; velocity remains in metres per second.
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
}

export function createDefaultBodies(): Body[] {
  const sunMass = 1.9885e30;
  return [
    {
      id: "sun",
      name: "太阳",
      nameEn: "Sun",
      color: "#fbbf24",
      radius: 14,
      mass: sunMass,
      x: 300,
      y: 300,
      vx: 0,
      vy: 0,
      trail: [],
    },
    {
      id: "earth",
      name: "地球",
      nameEn: "Earth",
      color: "#3b82f6",
      radius: 6,
      mass: 5.9722e24,
      x: 300 + 149.598,
      y: 300,
      vx: 0,
      vy: Math.sqrt((G * sunMass) / 149.598e9),
      trail: [],
    },
    {
      id: "mars",
      name: "火星",
      nameEn: "Mars",
      color: "#f87171",
      radius: 4,
      mass: 6.4169e23,
      x: 300 + 227.956,
      y: 300,
      vx: 0,
      vy: Math.sqrt((G * sunMass) / 227.956e9),
      trail: [],
    },
  ];
}

export function computeGravity(b1: Body, b2: Body): { fx: number; fy: number } {
  const dx = (b2.x - b1.x) / SCALE;
  const dy = (b2.y - b1.y) / SCALE;
  const distSq = dx * dx + dy * dy;
  // Point masses are only used for widely separated, non-colliding orbits.
  if (distSq === 0) return { fx: 0, fy: 0 };
  const factor = (G * b1.mass * b2.mass) / (distSq * Math.sqrt(distSq));
  return { fx: factor * dx, fy: factor * dy };
}

function accelerations(bodies: Body[]) {
  const result = bodies.map(() => ({ x: 0, y: 0 }));
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i]!;
      const b = bodies[j]!;
      const f = computeGravity(a, b);
      result[i]!.x += f.fx / a.mass;
      result[i]!.y += f.fy / a.mass;
      result[j]!.x -= f.fx / b.mass;
      result[j]!.y -= f.fy / b.mass;
    }
  }
  return result;
}

export function stepSimulation(bodies: Body[], dt: number): Body[] {
  const before = accelerations(bodies);
  // Velocity Verlet keeps bounded orbital energy error over repeated orbits.
  const moved = bodies.map((body, i) => ({
    ...body,
    x: body.x + (body.vx * dt + 0.5 * before[i]!.x * dt * dt) * SCALE,
    y: body.y + (body.vy * dt + 0.5 * before[i]!.y * dt * dt) * SCALE,
  }));
  const after = accelerations(moved);
  return moved.map((body, i) => ({
    ...body,
    vx: body.vx + 0.5 * (before[i]!.x + after[i]!.x) * dt,
    vy: body.vy + 0.5 * (before[i]!.y + after[i]!.y) * dt,
    trail: [...body.trail, { x: body.x, y: body.y }].slice(-MAX_TRAIL),
  }));
}
