"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";

type Tool = "point" | "line" | "circle" | "select";
type Preset = "equilateral" | "pentagon" | "tangent" | "pythagoras" | "pi";

interface Point {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Line {
  id: string;
  p1: string;
  p2: string;
  construction?: boolean;
}

interface CircleShape {
  id: string;
  center: string;
  radius: number;
  construction?: boolean;
}

interface AngleArc {
  id: string;
  vertex: string;
  from: number;
  to: number;
  degrees: number;
  color: string;
}

interface DistanceLabel {
  id: string;
  x: number;
  y: number;
  value: number;
  color: string;
}

interface AnimStep {
  points: Point[];
  lines: Line[];
  circles: CircleShape[];
  angles: AngleArc[];
  distances: DistanceLabel[];
  highlight: string[];
  description: string;
}

const GRID_SIZE = 20;
const CANVAS_W = 700;
const CANVAS_H = 560;
const CX = 350;
const CY = 280;
const LABEL_OFFSET = 14;

let nextId = 0;
function uid(): string {
  return `g${++nextId}`;
}

function dist(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function snapToGrid(v: number): number {
  return Math.round(v / GRID_SIZE) * GRID_SIZE;
}

function angleDeg(ax: number, ay: number, bx: number, by: number): number {
  return (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
}

function makePoint(x: number, y: number, label: string): Point {
  return { id: uid(), x, y, label };
}

const nextLabel = (() => {
  let i = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return () => letters[i++ % letters.length]!;
})();

function generateEquilateralSteps(): AnimStep[] {
  const steps: AnimStep[] = [];
  const A = makePoint(CX - 120, CY + 80, "A");
  const B = makePoint(CX + 120, CY + 80, "B");
  const R = dist(A, B);

  steps.push({
    points: [A, B],
    lines: [{ id: uid(), p1: A.id, p2: B.id }],
    circles: [],
    angles: [],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2, y: A.y + 22, value: Math.round(R), color: "#94a3b8" },
    ],
    highlight: [A.id, B.id],
    description: "步骤 1：画线段 AB",
  });

  const c1: CircleShape = { id: uid(), center: A.id, radius: R, construction: true };
  const c2: CircleShape = { id: uid(), center: B.id, radius: R, construction: true };
  steps.push({
    points: [A, B],
    lines: [{ id: uid(), p1: A.id, p2: B.id }],
    circles: [c1],
    angles: [],
    distances: [],
    highlight: [A.id],
    description: "步骤 2：以 A 为圆心，AB 为半径画圆",
  });

  steps.push({
    points: [A, B],
    lines: [{ id: uid(), p1: A.id, p2: B.id }],
    circles: [c1, c2],
    angles: [],
    distances: [],
    highlight: [B.id],
    description: "步骤 3：以 B 为圆心，AB 为半径画圆",
  });

  const C = makePoint(CX, CY + 80 - R * Math.sin(Math.PI / 3), "C");
  steps.push({
    points: [A, B, C],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: C.id },
      { id: uid(), p1: C.id, p2: A.id },
    ],
    circles: [c1, c2],
    angles: [],
    distances: [],
    highlight: [C.id],
    description: "步骤 4：两圆交点即为第三个顶点 C",
  });

  const a60 = 60;
  steps.push({
    points: [A, B, C],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: C.id },
      { id: uid(), p1: C.id, p2: A.id },
    ],
    circles: [],
    angles: [
      { id: uid(), vertex: A.id, from: angleDeg(A.x, A.y, B.x, B.y), to: angleDeg(A.x, A.y, C.x, C.y), degrees: a60, color: "#22d3ee" },
      { id: uid(), vertex: B.id, from: angleDeg(B.x, B.y, C.x, C.y), to: angleDeg(B.x, B.y, A.x, A.y), degrees: a60, color: "#22d3ee" },
      { id: uid(), vertex: C.id, from: angleDeg(C.x, C.y, A.x, A.y), to: angleDeg(C.x, C.y, B.x, B.y), degrees: a60, color: "#22d3ee" },
    ],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2, y: A.y + 22, value: Math.round(R), color: "#f472b6" },
      { id: uid(), x: (B.x + C.x) / 2 + 14, y: (B.y + C.y) / 2, value: Math.round(R), color: "#f472b6" },
      { id: uid(), x: (C.x + A.x) / 2 - 14, y: (C.y + A.y) / 2, value: Math.round(R), color: "#f472b6" },
    ],
    highlight: [],
    description: "等边三角形完成！三个内角均为 60°，三条边等长",
  });

  return steps;
}

function generatePentagonSteps(): AnimStep[] {
  const steps: AnimStep[] = [];
  const phi = (1 + Math.sqrt(5)) / 2;
  const R = 140;

  const A = makePoint(CX, CY - R, "A");
  const B = makePoint(CX + R * Math.sin((2 * Math.PI) / 5), CY - R * Math.cos((2 * Math.PI) / 5), "B");
  const C = makePoint(CX + R * Math.sin((4 * Math.PI) / 5), CY - R * Math.cos((4 * Math.PI) / 5), "C");
  const D = makePoint(CX + R * Math.sin((6 * Math.PI) / 5), CY - R * Math.cos((6 * Math.PI) / 5), "D");
  const E = makePoint(CX + R * Math.sin((8 * Math.PI) / 5), CY - R * Math.cos((8 * Math.PI) / 5), "E");

  const baseCircle: CircleShape = { id: uid(), center: uid(), radius: R };
  const baseCenter = makePoint(CX, CY, "O");

  steps.push({
    points: [baseCenter],
    lines: [],
    circles: [{ ...baseCircle, center: baseCenter.id }],
    angles: [],
    distances: [{ id: uid(), x: CX + 12, y: CY - R - 8, value: Math.round(R), color: "#94a3b8" }],
    highlight: [baseCenter.id],
    description: "步骤 1：画外接圆",
  });

  const vLine = makePoint(CX, CY - R * (1 - 1 / phi), "V");
  steps.push({
    points: [baseCenter, vLine],
    lines: [{ id: uid(), p1: baseCenter.id, p2: vLine.id, construction: true }],
    circles: [{ ...baseCircle, center: baseCenter.id }],
    angles: [],
    distances: [],
    highlight: [vLine.id],
    description: `步骤 2：在半径上标记黄金分割点（比值 1:φ ≈ 1:${phi.toFixed(3)}）`,
  });

  const diagonalLen = R * 2 * Math.sin(Math.PI / 5);
  steps.push({
    points: [baseCenter, vLine],
    lines: [{ id: uid(), p1: baseCenter.id, p2: vLine.id, construction: true }],
    circles: [
      { ...baseCircle, center: baseCenter.id },
      { id: uid(), center: vLine.id, radius: diagonalLen, construction: true },
    ],
    angles: [],
    distances: [],
    highlight: [vLine.id],
    description: "步骤 3：以黄金分割点为圆心，画弧确定正五边形边长",
  });

  const pentLines: Line[] = [];
  const pentPts = [A, B, C, D, E];
  for (let i = 0; i < 5; i++) {
    const p1 = pentPts[i]!;
    const p2 = pentPts[(i + 1) % 5]!;
    pentLines.push({ id: uid(), p1: p1.id, p2: p2.id });
  }

  steps.push({
    points: [baseCenter, A, B, C, D, E],
    lines: pentLines,
    circles: [{ ...baseCircle, center: baseCenter.id }],
    angles: [
      { id: uid(), vertex: A.id, from: angleDeg(A.x, A.y, E.x, E.y), to: angleDeg(A.x, A.y, B.x, B.y), degrees: 108, color: "#22d3ee" },
      { id: uid(), vertex: B.id, from: angleDeg(B.x, B.y, A.x, A.y), to: angleDeg(B.x, B.y, C.x, C.y), degrees: 108, color: "#22d3ee" },
      { id: uid(), vertex: C.id, from: angleDeg(C.x, C.y, B.x, B.y), to: angleDeg(C.x, C.y, D.x, D.y), degrees: 108, color: "#22d3ee" },
      { id: uid(), vertex: D.id, from: angleDeg(D.x, D.y, C.x, C.y), to: angleDeg(D.x, D.y, E.x, E.y), degrees: 108, color: "#22d3ee" },
      { id: uid(), vertex: E.id, from: angleDeg(E.x, E.y, D.x, D.y), to: angleDeg(E.x, E.y, A.x, A.y), degrees: 108, color: "#22d3ee" },
    ],
    distances: [],
    highlight: [],
    description: `正五边形完成！每个内角 108°，对角线与边长之比为黄金比例 φ ≈ ${phi.toFixed(3)}`,
  });

  return steps;
}

function generateTangentSteps(): AnimStep[] {
  const steps: AnimStep[] = [];
  const O = makePoint(CX, CY, "O");
  const r = 100;
  const P = makePoint(CX + 220, CY - 80, "P");
  const d = dist(O, P);
  const tangentAngle = Math.acos(r / d);
  const baseAngle = Math.atan2(P.y - O.y, P.x - O.x);

  steps.push({
    points: [O, P],
    lines: [{ id: uid(), p1: O.id, p2: P.id, construction: true }],
    circles: [{ id: uid(), center: O.id, radius: r }],
    angles: [],
    distances: [{ id: uid(), x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 + 18, value: Math.round(d), color: "#94a3b8" }],
    highlight: [O.id, P.id],
    description: "步骤 1：画圆 O 和圆外一点 P",
  });

  const OP: CircleShape = { id: uid(), center: O.id, radius: d, construction: true };
  steps.push({
    points: [O, P],
    lines: [{ id: uid(), p1: O.id, p2: P.id, construction: true }],
    circles: [{ id: uid(), center: O.id, radius: r }, OP],
    angles: [],
    distances: [],
    highlight: [],
    description: "步骤 2：以 OP 为直径画圆",
  });

  const M = makePoint((O.x + P.x) / 2, (O.y + P.y) / 2, "M");
  const halfOP = d / 2;
  steps.push({
    points: [O, P, M],
    lines: [{ id: uid(), p1: O.id, p2: P.id, construction: true }],
    circles: [
      { id: uid(), center: O.id, radius: r },
      { id: uid(), center: M.id, radius: halfOP, construction: true },
    ],
    angles: [],
    distances: [],
    highlight: [M.id],
    description: "步骤 3：两圆交点即为切点",
  });

  const t1Angle = baseAngle - tangentAngle;
  const t2Angle = baseAngle + tangentAngle;
  const T1 = makePoint(O.x + r * Math.cos(t1Angle), O.y + r * Math.sin(t1Angle), "T₁");
  const T2 = makePoint(O.x + r * Math.cos(t2Angle), O.y + r * Math.sin(t2Angle), "T₂");

  steps.push({
    points: [O, P, T1, T2],
    lines: [
      { id: uid(), p1: O.id, p2: P.id, construction: true },
      { id: uid(), p1: P.id, p2: T1.id },
      { id: uid(), p1: P.id, p2: T2.id },
      { id: uid(), p1: O.id, p2: T1.id, construction: true },
      { id: uid(), p1: O.id, p2: T2.id, construction: true },
    ],
    circles: [{ id: uid(), center: O.id, radius: r }],
    angles: [
      { id: uid(), vertex: T1.id, from: angleDeg(T1.x, T1.y, O.x, O.y), to: angleDeg(T1.x, T1.y, P.x, P.y), degrees: 90, color: "#22d3ee" },
      { id: uid(), vertex: T2.id, from: angleDeg(T2.x, T2.y, O.x, O.y), to: angleDeg(T2.x, T2.y, P.x, P.y), degrees: 90, color: "#22d3ee" },
    ],
    distances: [
      { id: uid(), x: (P.x + T1.x) / 2 + 14, y: (P.y + T1.y) / 2, value: Math.round(dist(P, T1)), color: "#f472b6" },
      { id: uid(), x: (P.x + T2.x) / 2 - 14, y: (P.y + T2.y) / 2, value: Math.round(dist(P, T2)), color: "#f472b6" },
    ],
    highlight: [T1.id, T2.id],
    description: "切线构造完成！切点处的半径与切线垂直（90°），PT₁ = PT₂",
  });

  return steps;
}

function generatePythagorasSteps(): AnimStep[] {
  const steps: AnimStep[] = [];
  const a = 120;
  const b = 160;
  const c = Math.sqrt(a * a + b * b);
  const angleA = Math.atan2(b, a) * (180 / Math.PI);

  const A = makePoint(CX - a / 2, CY + b / 2, "A");
  const B = makePoint(CX + a / 2, CY + b / 2, "B");
  const Cpt = makePoint(CX - a / 2, CY - b / 2, "C");

  steps.push({
    points: [A, B, Cpt],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: Cpt.id },
      { id: uid(), p1: Cpt.id, p2: A.id },
    ],
    circles: [],
    angles: [
      { id: uid(), vertex: A.id, from: angleDeg(A.x, A.y, B.x, B.y), to: angleDeg(A.x, A.y, Cpt.x, Cpt.y), degrees: 90, color: "#22d3ee" },
    ],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2, y: A.y + 20, value: Math.round(a), color: "#94a3b8" },
      { id: uid(), x: A.x - 20, y: (A.y + Cpt.y) / 2, value: Math.round(b), color: "#94a3b8" },
    ],
    highlight: [A.id, B.id, Cpt.id],
    description: `步骤 1：画直角三角形，直角边 a=${Math.round(a)}, b=${Math.round(b)}`,
  });

  const sqA: Point[] = [
    A,
    B,
    makePoint(B.x + b, B.y, ""),
    makePoint(A.x + b, A.y, ""),
  ];
  steps.push({
    points: [A, B, Cpt, ...sqA.slice(2)],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: Cpt.id },
      { id: uid(), p1: Cpt.id, p2: A.id },
      { id: uid(), p1: B.id, p2: sqA[2]!.id },
      { id: uid(), p1: sqA[2]!.id, p2: sqA[3]!.id },
      { id: uid(), p1: sqA[3]!.id, p2: A.id },
    ],
    circles: [],
    angles: [],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2, y: A.y + 20, value: Math.round(a), color: "#94a3b8" },
      { id: uid(), x: A.x - 20, y: (A.y + Cpt.y) / 2, value: Math.round(b), color: "#94a3b8" },
      { id: uid(), x: (A.x + B.x) / 2 + b / 2, y: (A.y + B.y) / 2 + b / 2, value: Math.round(a * a), color: "#f472b6", },
    ],
    highlight: [],
    description: `步骤 2：在短边上画正方形，面积 a²=${Math.round(a * a)}`,
  });

  const sqB: Point[] = [
    A,
    Cpt,
    makePoint(Cpt.x - a, Cpt.y, ""),
    makePoint(A.x - a, A.y, ""),
  ];
  steps.push({
    points: [A, B, Cpt, ...sqA.slice(2), ...sqB.slice(2)],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: Cpt.id },
      { id: uid(), p1: Cpt.id, p2: A.id },
      { id: uid(), p1: B.id, p2: sqA[2]!.id },
      { id: uid(), p1: sqA[2]!.id, p2: sqA[3]!.id },
      { id: uid(), p1: sqA[3]!.id, p2: A.id },
      { id: uid(), p1: Cpt.id, p2: sqB[2]!.id },
      { id: uid(), p1: sqB[2]!.id, p2: sqB[3]!.id },
      { id: uid(), p1: sqB[3]!.id, p2: A.id },
    ],
    circles: [],
    angles: [],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2 + b / 2, y: (A.y + B.y) / 2 + b / 2, value: Math.round(a * a), color: "#f472b6" },
      { id: uid(), x: (A.x + Cpt.x) / 2 - a / 2, y: (A.y + Cpt.y) / 2, value: Math.round(b * b), color: "#8b5cf6" },
    ],
    highlight: [],
    description: `步骤 3：在长边上画正方形，面积 b²=${Math.round(b * b)}`,
  });

  const cSqArea = Math.round(c * c);
  steps.push({
    points: [A, B, Cpt, ...sqA.slice(2), ...sqB.slice(2)],
    lines: [
      { id: uid(), p1: A.id, p2: B.id },
      { id: uid(), p1: B.id, p2: Cpt.id },
      { id: uid(), p1: Cpt.id, p2: A.id },
      { id: uid(), p1: B.id, p2: sqA[2]!.id },
      { id: uid(), p1: sqA[2]!.id, p2: sqA[3]!.id },
      { id: uid(), p1: sqA[3]!.id, p2: A.id },
      { id: uid(), p1: Cpt.id, p2: sqB[2]!.id },
      { id: uid(), p1: sqB[2]!.id, p2: sqB[3]!.id },
      { id: uid(), p1: sqB[3]!.id, p2: A.id },
    ],
    circles: [],
    angles: [],
    distances: [
      { id: uid(), x: (A.x + B.x) / 2 + b / 2, y: (A.y + B.y) / 2 + b / 2, value: Math.round(a * a), color: "#f472b6" },
      { id: uid(), x: (A.x + Cpt.x) / 2 - a / 2, y: (A.y + Cpt.y) / 2, value: Math.round(b * b), color: "#8b5cf6" },
      { id: uid(), x: (B.x + Cpt.x) / 2, y: (B.y + Cpt.y) / 2, value: cSqArea, color: "#22d3ee" },
    ],
    highlight: [],
    description: `勾股定理：a² + b² = c² → ${Math.round(a * a)} + ${Math.round(b * b)} = ${cSqArea}`,
  });

  return steps;
}

function generatePiSteps(): AnimStep[] {
  const steps: AnimStep[] = [];
  const R = 140;
  const O = makePoint(CX, CY, "O");

  steps.push({
    points: [O],
    lines: [],
    circles: [{ id: uid(), center: O.id, radius: R }],
    angles: [],
    distances: [{ id: uid(), x: CX + 12, y: CY - R - 8, value: R, color: "#94a3b8" }],
    highlight: [O.id],
    description: "步骤 1：画单位圆（半径 R）",
  });

  function polygonPoints(n: number, offset: number): Point[] {
    const pts: Point[] = [];
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n + offset;
      pts.push(makePoint(CX + R * Math.cos(angle), CY + R * Math.sin(angle), `${i + 1}`));
    }
    return pts;
  }

  function polygonLines(pts: Point[]): Line[] {
    const lines: Line[] = [];
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i]!;
      const p2 = pts[(i + 1) % pts.length]!;
      lines.push({ id: uid(), p1: p1.id, p2: p2.id });
    }
    return lines;
  }

  function perimeter(pts: Point[]): number {
    let sum = 0;
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i]!;
      const p2 = pts[(i + 1) % pts.length]!;
      sum += dist(p1, p2);
    }
    return sum;
  }

  const hexPts = polygonPoints(6, -Math.PI / 2);
  const hexPerim = perimeter(hexPts);
  steps.push({
    points: [O, ...hexPts],
    lines: polygonLines(hexPts),
    circles: [{ id: uid(), center: O.id, radius: R }],
    angles: [],
    distances: [
      { id: uid(), x: CX, y: CY + R + 24, value: Math.round(hexPerim), color: "#f472b6" },
    ],
    highlight: [],
    description: `步骤 2：内接正六边形，周长 ≈ ${hexPerim.toFixed(1)} → π ≈ ${(hexPerim / (2 * R)).toFixed(4)}`,
  });

  const triPts = polygonPoints(12, -Math.PI / 2);
  const triPerim = perimeter(triPts);
  steps.push({
    points: [O, ...triPts],
    lines: polygonLines(triPts),
    circles: [{ id: uid(), center: O.id, radius: R }],
    angles: [],
    distances: [
      { id: uid(), x: CX, y: CY + R + 24, value: Math.round(triPerim), color: "#8b5cf6" },
    ],
    highlight: [],
    description: `步骤 3：内接正十二边形，周长 ≈ ${triPerim.toFixed(1)} → π ≈ ${(triPerim / (2 * R)).toFixed(4)}`,
  });

  const dodecPts = polygonPoints(24, -Math.PI / 2);
  const dodecPerim = perimeter(dodecPts);
  steps.push({
    points: [O, ...dodecPts],
    lines: polygonLines(dodecPts),
    circles: [{ id: uid(), center: O.id, radius: R }],
    angles: [],
    distances: [
      { id: uid(), x: CX, y: CY + R + 24, value: Math.round(dodecPerim), color: "#22d3ee" },
    ],
    highlight: [],
    description: `步骤 4：内接正二十四边形，周长 ≈ ${dodecPerim.toFixed(1)} → π ≈ ${(dodecPerim / (2 * R)).toFixed(4)}`,
  });

  const poly48 = polygonPoints(48, -Math.PI / 2);
  const poly48Perim = perimeter(poly48);
  steps.push({
    points: [O, ...poly48],
    lines: polygonLines(poly48),
    circles: [{ id: uid(), center: O.id, radius: R }],
    angles: [],
    distances: [
      { id: uid(), x: CX, y: CY + R + 24, value: Math.round(poly48Perim), color: "#10b981" },
    ],
    highlight: [],
    description: `内接正四十八边形，周长 ≈ ${poly48Perim.toFixed(1)} → π ≈ ${(poly48Perim / (2 * R)).toFixed(6)}。阿基米德用此方法得出 3.1408 < π < 3.1429`,
  });

  return steps;
}

const PRESETS: Record<Preset, { label: string; labelEn: string; icon: string }> = {
  equilateral: { label: "等边三角形", labelEn: "Equilateral", icon: "△" },
  pentagon: { label: "正五边形", labelEn: "Pentagon", icon: "⬠" },
  tangent: { label: "圆的切线", labelEn: "Tangent", icon: "⊙" },
  pythagoras: { label: "勾股定理", labelEn: "Pythagoras", icon: "◣" },
  pi: { label: "圆周率近似", labelEn: "Pi Approx", icon: "π" },
};

function getPointById(points: Point[], id: string): Point | undefined {
  return points.find((p) => p.id === id);
}

function angleArcPath(vertex: Point, fromDeg: number, toDeg: number, radius: number = 28): string {
  const fromRad = (fromDeg * Math.PI) / 180;
  const toRad = (toDeg * Math.PI) / 180;
  const x1 = vertex.x + radius * Math.cos(fromRad);
  const y1 = vertex.y + radius * Math.sin(fromRad);
  const x2 = vertex.x + radius * Math.cos(toRad);
  const y2 = vertex.y + radius * Math.sin(toRad);
  let sweep = toDeg - fromDeg;
  if (sweep < 0) sweep += 360;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function angleArcMidpoint(vertex: Point, fromDeg: number, toDeg: number, radius: number = 42): { x: number; y: number } {
  let mid = (fromDeg + toDeg) / 2;
  if (toDeg < fromDeg) mid += 180;
  const midRad = (mid * Math.PI) / 180;
  return {
    x: vertex.x + radius * Math.cos(midRad),
    y: vertex.y + radius * Math.sin(midRad),
  };
}

export default function GeometryExplorer() {
  const [activePreset, setActivePreset] = useState<Preset | null>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tool, setTool] = useState<Tool>("select");
  const [snap, setSnap] = useState(true);
  const [userPoints, setUserPoints] = useState<Point[]>([]);
  const [userLines, setUserLines] = useState<Line[]>([]);
  const [userCircles, setUserCircles] = useState<CircleShape[]>([]);
  const [lineStart, setLineStart] = useState<string | null>(null);
  const [circleCenter, setCircleCenter] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animSteps = useMemo(() => {
    if (!activePreset) return [];
    const generators: Record<Preset, () => AnimStep[]> = {
      equilateral: generateEquilateralSteps,
      pentagon: generatePentagonSteps,
      tangent: generateTangentSteps,
      pythagoras: generatePythagorasSteps,
      pi: generatePiSteps,
    };
    return generators[activePreset]();
  }, [activePreset]);

  const currentStep: AnimStep | null = animSteps[step] ?? null;

  useEffect(() => {
    if (playing && activePreset && animSteps.length > 0) {
      timerRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev >= animSteps.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, activePreset, animSteps.length]);

  function selectPreset(p: Preset) {
    if (timerRef.current) clearInterval(timerRef.current);
    nextId = 0;
    setActivePreset(p);
    setStep(0);
    setPlaying(false);
  }

  function togglePlay() {
    if (!activePreset) return;
    if (step >= animSteps.length - 1) {
      setStep(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }

  function nextStep() {
    if (step < animSteps.length - 1) setStep((s) => s + 1);
  }

  function prevStep() {
    if (step > 0) setStep((s) => s - 1);
  }

  function getSvgCoords(e: React.MouseEvent<SVGSVGElement>): { x: number; y: number } {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * CANVAS_W;
    let y = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    if (snap) {
      x = snapToGrid(x);
      y = snapToGrid(y);
    }
    return { x, y };
  }

  function handleCanvasClick(e: React.MouseEvent<SVGSVGElement>) {
    if (activePreset) return;
    const { x, y } = getSvgCoords(e);
    const label = nextLabel();

    if (tool === "point") {
      setUserPoints((prev) => [...prev, { id: uid(), x, y, label }]);
    } else if (tool === "line") {
      const clicked = userPoints.find(
        (p) => Math.abs(p.x - x) < 12 && Math.abs(p.y - y) < 12
      );
      if (clicked) {
        if (lineStart) {
          if (lineStart !== clicked.id) {
            setUserLines((prev) => [...prev, { id: uid(), p1: lineStart, p2: clicked.id }]);
          }
          setLineStart(null);
        } else {
          setLineStart(clicked.id);
        }
      } else {
        const newPt = { id: uid(), x, y, label };
        setUserPoints((prev) => [...prev, newPt]);
        if (lineStart) {
          setUserLines((prev) => [...prev, { id: uid(), p1: lineStart, p2: newPt.id }]);
          setLineStart(null);
        } else {
          setLineStart(newPt.id);
        }
      }
    } else if (tool === "circle") {
      const clicked = userPoints.find(
        (p) => Math.abs(p.x - x) < 12 && Math.abs(p.y - y) < 12
      );
      if (clicked) {
        if (circleCenter) {
          const center = userPoints.find((p) => p.id === circleCenter);
          if (center) {
            const r = dist(center, clicked);
            setUserCircles((prev) => [...prev, { id: uid(), center: circleCenter, radius: r }]);
          }
          setCircleCenter(null);
        } else {
          setCircleCenter(clicked.id);
        }
      } else {
        const newPt = { id: uid(), x, y, label };
        setUserPoints((prev) => [...prev, newPt]);
        if (circleCenter) {
          const center = userPoints.find((p) => p.id === circleCenter);
          if (center) {
            const r = dist(center, newPt);
            setUserCircles((prev) => [...prev, { id: uid(), center: circleCenter, radius: r }]);
          }
          setCircleCenter(null);
        } else {
          setCircleCenter(newPt.id);
        }
      }
    }
  }

  function clearCanvas() {
    setUserPoints([]);
    setUserLines([]);
    setUserCircles([]);
    setLineStart(null);
    setCircleCenter(null);
  }

  const displayPoints = currentStep ? currentStep.points : userPoints;
  const displayLines = currentStep ? currentStep.lines : userLines;
  const displayCircles = currentStep ? currentStep.circles : userCircles;
  const displayAngles = currentStep ? currentStep.angles : [];
  const displayDistances = currentStep ? currentStep.distances : [];
  const highlightIds = currentStep ? new Set(currentStep.highlight) : new Set<string>();

  return (
    <div className="border-border-faint bg-bg-panel w-full overflow-hidden border">
      <div className="border-border-faint flex flex-wrap items-center gap-2 border-b px-4 py-3">
        <span className="text-fg-muted mr-2 font-mono text-[10px] tracking-[0.22em] uppercase">
          预设构造
        </span>
        {(Object.entries(PRESETS) as [Preset, (typeof PRESETS)[Preset]][]).map(
          ([key, val]) => (
            <button
              key={key}
              onClick={() => selectPreset(key)}
              className={`flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] transition-all ${
                activePreset === key
                  ? "border-accent-indigo text-accent-indigo bg-accent-indigo/10"
                  : "border-border-faint text-fg-secondary hover:border-fg-disabled/40 hover:text-fg-primary"
              }`}
            >
              <span className="text-sm">{val.icon}</span>
              {val.label}
            </button>
          ),
        )}
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="bg-bg-elevated w-full cursor-crosshair border border-border-faint"
            onClick={handleCanvasClick}
          >
            <defs>
              <pattern id="grid-small" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                <path
                  d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-fg-disabled/20"
                />
              </pattern>
              <pattern id="grid-large" width={GRID_SIZE * 5} height={GRID_SIZE * 5} patternUnits="userSpaceOnUse">
                <rect width={GRID_SIZE * 5} height={GRID_SIZE * 5} fill="url(#grid-small)" />
                <path
                  d={`M ${GRID_SIZE * 5} 0 L 0 0 0 ${GRID_SIZE * 5}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  className="text-fg-disabled/30"
                />
              </pattern>
            </defs>

            <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid-large)" />

            {displayCircles.map((c) => {
              const center = getPointById(displayPoints, c.center);
              if (!center) return null;
              return (
                <circle
                  key={c.id}
                  cx={center.x}
                  cy={center.y}
                  r={c.radius}
                  fill="none"
                  stroke={c.construction ? "#475569" : "#6366f1"}
                  strokeWidth={c.construction ? 0.8 : 1.5}
                  strokeDasharray={c.construction ? "4 3" : "none"}
                  opacity={c.construction ? 0.5 : 0.8}
                />
              );
            })}

            {displayLines.map((l) => {
              const p1 = getPointById(displayPoints, l.p1);
              const p2 = getPointById(displayPoints, l.p2);
              if (!p1 || !p2) return null;
              return (
                <line
                  key={l.id}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={l.construction ? "#475569" : "#818cf8"}
                  strokeWidth={l.construction ? 0.8 : 1.8}
                  strokeDasharray={l.construction ? "4 3" : "none"}
                  opacity={l.construction ? 0.5 : 0.9}
                />
              );
            })}

            {displayAngles.map((a) => {
              const vertex = getPointById(displayPoints, a.vertex);
              if (!vertex) return null;
              const path = angleArcPath(vertex, a.from, a.to);
              const mid = angleArcMidpoint(vertex, a.from, a.to);
              return (
                <g key={a.id}>
                  <path
                    d={path}
                    fill="none"
                    stroke={a.color}
                    strokeWidth={1.2}
                    opacity={0.8}
                  />
                  <text
                    x={mid.x}
                    y={mid.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={a.color}
                    fontSize="10"
                    fontFamily="monospace"
                    opacity={0.9}
                  >
                    {a.degrees}°
                  </text>
                </g>
              );
            })}

            {displayDistances.map((d) => (
              <text
                key={d.id}
                x={d.x}
                y={d.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={d.color}
                fontSize="10"
                fontFamily="monospace"
                opacity={0.85}
              >
                {d.value}
              </text>
            ))}

            {displayPoints.map((p) => {
              const isHighlight = highlightIds.has(p.id);
              return (
                <g key={p.id}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHighlight ? 5 : 3.5}
                    fill={isHighlight ? "#22d3ee" : "#e2e8f0"}
                    stroke={isHighlight ? "#22d3ee" : "#94a3b8"}
                    strokeWidth={isHighlight ? 2 : 1}
                  />
                  {p.label && (
                    <text
                      x={p.x}
                      y={p.y - LABEL_OFFSET}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#e2e8f0"
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {p.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="border-border-faint w-full border-t p-4 lg:w-64 lg:border-t-0 lg:border-l">
          {activePreset ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-fg-primary font-display mb-1 text-sm font-semibold">
                  {PRESETS[activePreset].label}
                </h3>
                <p className="text-fg-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  {PRESETS[activePreset].labelEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  className="border-border-faint text-fg-secondary hover:text-fg-primary flex h-8 w-8 items-center justify-center border transition-colors disabled:opacity-30"
                >
                  ◀
                </button>
                <button
                  onClick={togglePlay}
                  className="border-accent-indigo text-accent-indigo hover:bg-accent-indigo/10 flex h-8 flex-1 items-center justify-center border transition-colors"
                >
                  {playing ? "⏸" : step >= animSteps.length - 1 ? "↻" : "▶"}
                </button>
                <button
                  onClick={nextStep}
                  disabled={step >= animSteps.length - 1}
                  className="border-border-faint text-fg-secondary hover:text-fg-primary flex h-8 w-8 items-center justify-center border transition-colors disabled:opacity-30"
                >
                  ▶
                </button>
              </div>

              <div className="text-fg-disabled font-mono text-[10px] tracking-[0.18em]">
                步骤 {step + 1} / {animSteps.length}
              </div>

              <div className="bg-bg-elevated border-border-faint border p-3">
                <p className="text-fg-secondary text-[13px] leading-relaxed">
                  {currentStep?.description ?? ""}
                </p>
              </div>

              <button
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setActivePreset(null);
                  setStep(0);
                  setPlaying(false);
                }}
                className="border-border-faint text-fg-muted hover:text-fg-primary w-full border py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors"
              >
                自由绘制模式
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-fg-primary font-display mb-1 text-sm font-semibold">
                  几何作图工具
                </h3>
                <p className="text-fg-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  Compass & Straightedge
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(["select", "point", "line", "circle"] as Tool[]).map((t) => {
                  const labels: Record<Tool, string> = {
                    select: "选择",
                    point: "点",
                    line: "线段",
                    circle: "圆",
                  };
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setTool(t);
                        setLineStart(null);
                        setCircleCenter(null);
                      }}
                      className={`border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] transition-all ${
                        tool === t
                          ? "border-accent-indigo text-accent-indigo bg-accent-indigo/10"
                          : "border-border-faint text-fg-secondary hover:border-fg-disabled/40"
                      }`}
                    >
                      {labels[t]}
                    </button>
                  );
                })}
              </div>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={snap}
                  onChange={(e) => setSnap(e.target.checked)}
                  className="accent-accent-indigo"
                />
                <span className="text-fg-secondary font-mono text-[11px] tracking-[0.12em]">
                  网格吸附
                </span>
              </label>

              {tool === "line" && lineStart && (
                <p className="text-accent-cyan font-mono text-[11px]">
                  已选起点，点击第二个点画线段
                </p>
              )}
              {tool === "circle" && circleCenter && (
                <p className="text-accent-cyan font-mono text-[11px]">
                  已选圆心，点击一点确定半径
                </p>
              )}

              <div className="text-fg-disabled font-mono text-[10px] leading-relaxed tracking-[0.1em]">
                <p>点：{userPoints.length} 个</p>
                <p>线段：{userLines.length} 条</p>
                <p>圆：{userCircles.length} 个</p>
              </div>

              <button
                onClick={clearCanvas}
                className="border-border-faint text-fg-muted hover:text-fg-primary w-full border py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors"
              >
                清空画布
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
