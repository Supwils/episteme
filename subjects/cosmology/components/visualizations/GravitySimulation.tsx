"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

import {
  type Body,
  createDefaultBodies,
  computeGravity,
  stepSimulation,
  SVG_SIZE,
  TIME_STEP,
} from "./gravity-model";

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
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={color}
        strokeWidth={1.5}
        opacity={0.6}
      />
      <polygon
        points={`${toX},${toY} ${ha1x},${ha1y} ${ha2x},${ha2y}`}
        fill={color}
        opacity={0.6}
      />
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
    if (reduce) return; // honor prefers-reduced-motion: no auto-running physics
    setIsRunning(true);
    lastTimeRef.current = performance.now();
  }, [reduce]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const defaults = createDefaultBodies();
    if (defaults[1]) defaults[1].mass = 5.9722e24 * earthMassMult;
    setBodies(defaults);
  }, [earthMassMult]);

  useEffect(() => {
    if (!isRunning || reduce) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;
      const elapsed = (delta / (1000 / 60)) * speedMult * TIME_STEP;
      const steps = Math.max(1, Math.ceil(elapsed / TIME_STEP));
      // Functional update keeps `bodies` out of the deps so the RAF loop isn't
      // torn down and re-subscribed on every frame.
      setBodies((prev) => {
        let current = prev;
        for (let s = 0; s < steps; s++) current = stepSimulation(current, elapsed / steps);
        return current;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isRunning, speedMult, reduce]);

  const updateEarthMass = useCallback((mult: number) => {
    setEarthMassMult(mult);
    setBodies((prev) =>
      prev.map((b) => {
        if (b.id === "earth") return { ...b, mass: 5.9722e24 * mult };
        return b;
      })
    );
  }, []);

  const forceVectors = bodies.map((body, i) => {
    return bodies.reduce(
      (total, other, j) => {
        if (i === j) return total;
        const force = computeGravity(body, other);
        return { fx: total.fx + force.fx, fy: total.fy + force.fy };
      },
      { fx: 0, fy: 0 }
    );
  });

  return (
    <div className={className}>
      <p className="text-fg-muted mb-3 text-xs leading-relaxed">
        太阳、地球与火星的平面牛顿模型，初始轨道取近圆近似，并非实时星历。 图中 1 单位对应 10
        亿米；天体大小经过放大，箭头表示合力方向，长度按对数缩放。
      </p>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">
            引力模拟 · gravity simulation
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={isRunning ? handleStop : handleStart}
              disabled={Boolean(reduce) && !isRunning}
              title={reduce ? "已根据系统的减少动效偏好停用" : undefined}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
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
                  d={body.trail.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
                  fill="none"
                  stroke={body.color}
                  strokeWidth={1}
                  opacity={0.3}
                />
              ) : null
            )}

          {showForces &&
            bodies.map((body, i) => {
              const fv = forceVectors[i]!;
              const magnitude = Math.hypot(fv.fx, fv.fy);
              const length = 8 * Math.log10(1 + magnitude / 1e18);
              const endX = body.x + (magnitude ? (fv.fx / magnitude) * length : 0);
              const endY = body.y + (magnitude ? (fv.fy / magnitude) * length : 0);
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

        <div className="border-border-faint flex items-center justify-between border-t px-4 py-2">
          <div className="flex items-center gap-4">
            {bodies.map((body) => (
              <div key={body.id} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: body.color }}
                />
                <span className="text-fg-muted font-mono text-[9px]">{body.nameEn}</span>
              </div>
            ))}
          </div>
          <span className="text-fg-disabled font-mono text-[9px]">F = GMm/r²</span>
        </div>
      </div>

      <p className="text-fg-muted mt-3 text-xs">
        <a
          className="underline"
          href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          初始尺度与质量参考：NASA 行星数据
        </a>
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="border-border-faint bg-bg-near space-y-3 border p-4">
          <h4 className="font-display text-fg-primary text-sm font-semibold">参数调节</h4>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <label htmlFor="gravity-earth-mass" className="text-fg-muted w-20 shrink-0 text-xs">
              地球质量
            </label>
            <input
              id="gravity-earth-mass"
              type="range"
              min={0.1}
              max={10}
              step={0.1}
              value={earthMassMult}
              onChange={(e) => updateEarthMass(Number(e.target.value))}
              className="col-span-2 row-start-2 w-full min-w-0 accent-blue-500"
            />
            <span className="text-fg-muted col-start-2 row-start-1 w-16 text-right font-mono text-xs">
              ×{earthMassMult.toFixed(1)}
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <label htmlFor="gravity-speed" className="text-fg-muted w-20 shrink-0 text-xs">
              模拟速度
            </label>
            <input
              id="gravity-speed"
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={speedMult}
              onChange={(e) => setSpeedMult(Number(e.target.value))}
              className="col-span-2 row-start-2 w-full min-w-0 accent-purple-500"
            />
            <span className="text-fg-muted col-start-2 row-start-1 w-16 text-right font-mono text-xs">
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
                <span className="text-fg-muted font-mono text-[10px]">
                  {body.mass.toExponential(2)} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
