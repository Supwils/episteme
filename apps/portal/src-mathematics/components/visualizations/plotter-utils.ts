export type PresetFunction = {
  id: string;
  label: string;
  labelEn: string;
  fn: (x: number) => number;
  derivative: (x: number) => number;
  integral: (x: number) => number;
  domain: [number, number];
};

export const PRESETS: PresetFunction[] = [
  {
    id: "sin",
    label: "sin(x)",
    labelEn: "正弦函数",
    fn: Math.sin,
    derivative: Math.cos,
    integral: (x) => -Math.cos(x),
    domain: [-2 * Math.PI, 2 * Math.PI],
  },
  {
    id: "x2",
    label: "x²",
    labelEn: "抛物线",
    fn: (x) => x * x,
    derivative: (x) => 2 * x,
    integral: (x) => (x * x * x) / 3,
    domain: [-4, 4],
  },
  {
    id: "exp",
    label: "eˣ",
    labelEn: "指数函数",
    fn: Math.exp,
    derivative: Math.exp,
    integral: Math.exp,
    domain: [-4, 4],
  },
  {
    id: "ln",
    label: "ln(x)",
    labelEn: "对数函数",
    fn: Math.log,
    derivative: (x) => 1 / x,
    integral: (x) => x * Math.log(x) - x,
    domain: [0.1, 8],
  },
  {
    id: "inv",
    label: "1/x",
    labelEn: "反比例",
    fn: (x) => 1 / x,
    derivative: (x) => -1 / (x * x),
    integral: (x) => Math.log(Math.abs(x)),
    domain: [-6, 6],
  },
  {
    id: "abs",
    label: "|x|",
    labelEn: "绝对值",
    fn: Math.abs,
    derivative: (x) => (x > 0 ? 1 : x < 0 ? -1 : 0),
    integral: (x) => (x * Math.abs(x)) / 2,
    domain: [-6, 6],
  },
];

export const SVG_WIDTH = 800;
export const SVG_HEIGHT = 500;
export const PADDING = 40;

export const COLORS = {
  fn: "#3b82f6",
  derivative: "#ef4444",
  integral: "#22c55e",
  grid: "rgba(99, 102, 241, 0.08)",
  gridMajor: "rgba(99, 102, 241, 0.15)",
  axis: "rgba(99, 102, 241, 0.4)",
  trace: "#f59e0b",
  bg: "rgba(6, 6, 15, 0.6)",
};

export function niceStep(range: number): number {
  const raw = range / 8;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;
  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

export function formatNumber(n: number): string {
  if (Math.abs(n) < 1e-10) return "0";
  if (Math.abs(n - Math.round(n)) < 1e-10) return Math.round(n).toString();
  const s = n.toFixed(2);
  return s.replace(/\.?0+$/, "");
}

type Point = { x: number; y: number };

function mapCoordX(x: number, viewXMin: number, viewXMax: number): number {
  return PADDING + ((x - viewXMin) / (viewXMax - viewXMin)) * (SVG_WIDTH - 2 * PADDING);
}

function mapCoordY(y: number, viewYMin: number, viewYMax: number): number {
  return SVG_HEIGHT - PADDING - ((y - viewYMin) / (viewYMax - viewYMin)) * (SVG_HEIGHT - 2 * PADDING);
}

function pointsToPath(
  points: Point[],
  viewXMin: number,
  viewXMax: number,
  viewYMin: number,
  viewYMax: number,
): string {
  return points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${mapCoordX(p.x, viewXMin, viewXMax).toFixed(2)},${mapCoordY(p.y, viewYMin, viewYMax).toFixed(2)}`,
    )
    .join(" ");
}

export function buildPath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  viewXMin: number,
  viewXMax: number,
  viewYMin: number,
  viewYMax: number,
  steps = 400,
): string {
  const segments: string[] = [];
  let currentSegment: Point[] = [];

  const dx = (xMax - xMin) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    let y: number;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }

    if (!isFinite(y) || Math.abs(y) > 1e6 || isNaN(y)) {
      if (currentSegment.length > 1) {
        segments.push(pointsToPath(currentSegment, viewXMin, viewXMax, viewYMin, viewYMax));
      }
      currentSegment = [];
      continue;
    }

    currentSegment.push({ x, y });
  }

  if (currentSegment.length > 1) {
    segments.push(pointsToPath(currentSegment, viewXMin, viewXMax, viewYMin, viewYMax));
  }

  return segments.join(" ");
}

export function buildIntegralPath(
  fn: (x: number) => number,
  a: number,
  b: number,
  viewXMin: number,
  viewXMax: number,
  viewYMin: number,
  viewYMax: number,
): string {
  const steps = 200;
  const dx = (b - a) / steps;
  const zeroY = mapCoordY(0, viewYMin, viewYMax);

  const topPoints: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = a + i * dx;
    let y: number;
    try {
      y = fn(x);
    } catch {
      y = 0;
    }
    if (!isFinite(y) || Math.abs(y) > 1e6) y = 0;
    topPoints.push({ x, y });
  }

  const pathTop = topPoints
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${mapCoordX(p.x, viewXMin, viewXMax).toFixed(2)},${mapCoordY(p.y, viewYMin, viewYMax).toFixed(2)}`,
    )
    .join(" ");

  return `${pathTop} L${mapCoordX(b, viewXMin, viewXMax).toFixed(2)},${zeroY.toFixed(2)} L${mapCoordX(a, viewXMin, viewXMax).toFixed(2)},${zeroY.toFixed(2)} Z`;
}
