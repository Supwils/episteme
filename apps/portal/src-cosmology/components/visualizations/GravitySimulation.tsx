"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

const G = 6.674e-11;

interface Body {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  radius: number;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
}

const SVG_SIZE = 600;
const SCALE = 1e-9;
const TIME_STEP = 3600;
const MAX_TRAIL = 150;

function createDefaultBodies(): Body[] {
  return [
    {
      id: "sun",
      name: "太阳",
      nameEn: "Sun",
      color: "#fbbf24",
      radius: 14,
      mass: 1.989e30,
      x: SVG_SIZE / 2,
      y: SVG_SIZE / 2,
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
      mass: 5.972e24,
      x: SVG_SIZE / 2 + 150,
      y: SVG_SIZE / 2,
      vx: 0,
      vy: 29780,
      trail: [],
    },
    {
      id: "moon",
      name: "月球",
      nameEn: "Moon",
      color: "#9ca3af",
      radius: 3,
      mass: 7.342e22,
      x: SVG_SIZE / 2 + 170,
      y: SVG_SIZE / 2,
      vx: 0,
      vy: 30800,
      trail: [],
    },
  ];
}

function computeGravity(b1: Body, b2: Body): { fx: number; fy: number } {
  const dx = (b2.x - b1.x) / SCALE;
  const dy = (b2.y - b1.y) / SCALE;
  const distSq = dx * dx + dy * dy;
  const dist = Math.sqrt(distSq);
  if (dist < 1e6) return { fx: 0, fy: 0 };
  const force = (G * b1.mass * b2.mass) / distSq;
  return {
    fx: (force * dx) / dist,
    fy: (force * dy) / dist,
  };
}

function stepSimulation(bodies: Body[], dt: number): Body[] {
  const forces: { fx: number; fy: number }[] = bodies.map(() => ({ fx: 0, fy: 0 }));

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const f = computeGravity(bodies[i]!, bodies[j]!);
      forces[i]!.fx += f.fx;
      forces[i]!.fy += f.fy;
      forces[j]!.fx -= f.fx;
      forces[j]!.fy -= f.fy;
    }
  }

  return bodies.map((body, i) => {
    const ax = (forces[i]!.fx / body.mass) * SCALE * SCALE;
    const ay = (forces[i]!.fy / body.mass) * SCALE * SCALE;
    const newVx = body.vx + ax * dt;
    const newVy = body.vy + ay * dt;
    const newX = body.x + newVx * dt * SCALE;
    const newY = body.y + newVy * dt * SCALE;
    const newTrail = [...body.trail, { x: newX, y: newY }];
    if (newTrail.length > MAX_TRAIL) newTrail.shift();

    return {
      ...body,
      x: newX,
      y: newY,
      vx: newVx,
      vy: newVy,
      trail: newTrail,
    };
  });
}

function ForceArrow({
  fromX,
  fromY,
  toX,
  toY,
  color,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
}) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return null;
  const nx = dx / len;
  const ny = dy / len;
  const headLen = 6;
  const ha1x = toX - headLen * (nx - ny * 0.4);
  const ha1y = toY - headLen * (ny + nx * 0.4);
  const ha2x = toX - headLen * (nx + ny * 0.4);
  const ha2y = toY - headLen * (ny - nx * 0.4);

  return (
    <g>
      <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={color} strokeWidth={1.5} opacity={0.6} />
      <polygon points={`${toX},${toY} ${ha1x},${ha1y} ${ha2x},${ha2y}`} fill={color} opacity={0.6} />
    </g>
  );
}

interface GravitySimulationProps {
  className?: string;
}

export function GravitySimulation({ className }: GravitySimulationProps) {
  const reduce = useReducedMotion();
  const [bodies, setBodies] = useState<Body[]>(createDefaultBodies);
  const [isRunning, setIsRunning] = useState(false);
  const [showTrails, setShowTrails] = useState(true);
  const [showForces, setShowForces] = useState(true);
  const [earthMassMult, setEarthMassMult] = useState(1);
  const [speedMult, setSpeedMult] = useState(1);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    lastTimeRef.current = performance.now();
  }, []);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const defaults = createDefaultBodies();
    if (defaults[1]) defaults[1].mass = 5.972e24 * earthMassMult;
    setBodies(defaults);
  }, [earthMassMult]);

  useEffect(() => {
    if (!isRunning) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;
      const steps = Math.ceil((delta / 16) * speedMult);
      let current = bodies;
      for (let s = 0; s < steps; s++) {
        current = stepSimulation(current, TIME_STEP);
      }
      setBodies(current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isRunning, bodies, speedMult]);

  const updateEarthMass = useCallback(
    (mult: number) => {
      setEarthMassMult(mult);
      setBodies((prev) =>
        prev.map((b) => {
          if (b.id === "earth") return { ...b, mass: 5.972e24 * mult };
          return b;
        }),
      );
    },
    [],
  );

  const forceVectors = bodies.map((body, i) => {
    let fx = 0;
    let fy = 0;
    for (let j = 0; j < bodies.length; j++) {
      if (i === j) continue;
      const other = bodies[j]!;
      const dx = other.x - body.x;
      const dy = other.y - body.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) continue;
      const force = (G * body.mass * other.mass) / ((dist / SCALE) * (dist / SCALE));
      fx += (force * dx) / dist;
      fy += (force * dy) / dist;
    }
    return { fx, fy };
  });

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            引力模拟 · gravity simulation
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={isRunning ? handleStop : handleStart}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isRunning
                  ? "border-red-500/40 bg-red-500/10 text-red-400"
                  : "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
              }`}
            >
              {isRunning ? "停止" : "运行"}
            </button>
            <button
              onClick={handleReset}
              className="border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              重置
            </button>
            <button
              onClick={() => setShowTrails((p) => !p)}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                showTrails
                  ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                  : "border-border-subtle bg-bg-near text-fg-muted"
              }`}
            >
              轨迹
            </button>
            <button
              onClick={() => setShowForces((p) => !p)}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                showForces
                  ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                  : "border-border-subtle bg-bg-near text-fg-muted"
              }`}
            >
              力
            </button>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="h-auto w-full"
          role="img"
          aria-label="三体引力模拟"
        >
          <defs>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <filter id="body-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={SVG_SIZE} height={SVG_SIZE} fill="#050510" />

          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={`star-${i}`}
              cx={(i * 137.5) % SVG_SIZE}
              cy={(i * 97.3) % SVG_SIZE}
              r={0.5 + (i % 3) * 0.3}
              fill="#fff"
              opacity={0.2 + (i % 5) * 0.05}
            />
          ))}

          {showTrails &&
            bodies.map((body) =>
              body.trail.length > 1 ? (
                <path
                  key={`trail-${body.id}`}
                  d={body.trail
                    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                    .join(" ")}
                  fill="none"
                  stroke={body.color}
                  strokeWidth={1}
                  opacity={0.3}
                />
              ) : null,
            )}

          {showForces &&
            bodies.map((body, i) => {
              const fv = forceVectors[i]!;
              const scale = 1e-22;
              const endX = body.x + fv.fx * scale;
              const endY = body.y + fv.fy * scale;
              return (
                <ForceArrow
                  key={`force-${body.id}`}
                  fromX={body.x}
                  fromY={body.y}
                  toX={endX}
                  toY={endY}
                  color={body.color}
                />
              );
            })}

          {bodies.map((body) => (
            <g key={body.id}>
              {body.id === "sun" && (
                <circle cx={body.x} cy={body.y} r={body.radius * 3} fill="url(#sun-glow)" />
              )}
              <circle
                cx={body.x}
                cy={body.y}
                r={body.radius}
                fill={body.color}
                fillOpacity={0.8}
                stroke={body.color}
                strokeWidth={1}
                strokeOpacity={0.5}
                filter="url(#body-glow)"
              />
              <text
                x={body.x}
                y={body.y + body.radius + 14}
                textAnchor="middle"
                fill={body.color}
                fontSize="10"
                fontFamily="monospace"
              >
                {body.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <div className="flex items-center gap-4">
            {bodies.map((body) => (
              <div key={body.id} className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: body.color }} />
                <span className="font-mono text-[9px] text-fg-muted">{body.nameEn}</span>
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] text-fg-disabled">
            F = GMm/r²
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="border-border-faint bg-bg-near border p-4 space-y-3">
          <h4 className="font-display text-fg-primary text-sm font-semibold">参数调节</h4>
          <div className="flex items-center gap-3">
            <label className="text-fg-muted w-20 shrink-0 text-xs">地球质量</label>
            <input
              type="range"
              min={0.1}
              max={10}
              step={0.1}
              value={earthMassMult}
              onChange={(e) => updateEarthMass(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="font-mono text-xs text-fg-muted w-16 text-right">
              ×{earthMassMult.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-fg-muted w-20 shrink-0 text-xs">模拟速度</label>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={speedMult}
              onChange={(e) => setSpeedMult(Number(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="font-mono text-xs text-fg-muted w-16 text-right">
              ×{speedMult.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="border-border-faint bg-bg-near border p-4">
          <h4 className="font-display text-fg-primary mb-2 text-sm font-semibold">天体数据</h4>
          <div className="space-y-2">
            {bodies.map((body) => (
              <div key={body.id} className="flex items-center justify-between">
                <span className="font-mono text-xs" style={{ color: body.color }}>
                  {body.name}
                </span>
                <span className="font-mono text-[10px] text-fg-muted">
                  {(body.mass / 1e24).toFixed(2)} × 10²⁴ kg
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
