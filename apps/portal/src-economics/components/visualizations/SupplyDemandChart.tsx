"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

const SVG_W = 600;
const SVG_H = 400;
const MARGIN = { top: 30, right: 30, bottom: 50, left: 60 };
const CHART_W = SVG_W - MARGIN.left - MARGIN.right;
const CHART_H = SVG_H - MARGIN.top - MARGIN.bottom;

const SUPPLY_COLOR = "#10b981";
const DEMAND_COLOR = "#ef4444";
const EQUI_COLOR = "#e8b84a";
const CS_FILL = "rgba(239,68,68,0.12)";
const PS_FILL = "rgba(16,185,129,0.12)";
const GRID_COLOR = "rgba(255,255,255,0.06)";
const AXIS_COLOR = "rgba(255,255,255,0.25)";
const TEXT_COLOR = "rgba(255,255,255,0.6)";

const Q_MAX = 100;
const P_MAX = 100;

function toX(q: number): number {
  return MARGIN.left + (q / Q_MAX) * CHART_W;
}

function toY(p: number): number {
  return MARGIN.top + CHART_H - (p / P_MAX) * CHART_H;
}

function supplyPrice(q: number, shift: number): number {
  return 10 + 0.7 * q + shift;
}

function demandPrice(q: number, shift: number): number {
  return 90 - 0.7 * q + shift;
}

function findEquilibrium(demandShift: number, supplyShift: number): { q: number; p: number } | null {
  const q = (80 + demandShift - supplyShift) / 1.4;
  const p = supplyPrice(q, supplyShift);
  if (q < 0 || q > Q_MAX || p < 0 || p > P_MAX) return null;
  return { q, p };
}

function buildCurvePath(priceFn: (q: number) => number): string {
  const steps = 80;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const q = (i / steps) * Q_MAX;
    const p = priceFn(q);
    const clamped = Math.max(0, Math.min(P_MAX, p));
    const cmd = i === 0 ? "M" : "L";
    points.push(`${cmd}${toX(q).toFixed(1)},${toY(clamped).toFixed(1)}`);
  }
  return points.join(" ");
}

function buildSurplusPath(
  priceFn: (q: number) => number,
  equilibrium: { q: number; p: number },
  isConsumer: boolean,
): string {
  const steps = 60;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const q = (i / steps) * equilibrium.q;
    const p = priceFn(q);
    points.push([toX(q), toY(p)]);
  }
  const eqX = toX(equilibrium.q);
  const eqY = toY(equilibrium.p);
  const axisY = isConsumer ? toY(P_MAX) : toY(0);
  const poly = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return `${poly} L${eqX.toFixed(1)},${eqY.toFixed(1)} L${toX(0).toFixed(1)},${axisY.toFixed(1)} Z`;
}

interface TooltipData {
  x: number;
  y: number;
  q: number;
  p: number;
  type: "supply" | "demand";
}

export function SupplyDemandChart() {
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const equilibrium = useMemo(
    () => findEquilibrium(demandShift, supplyShift),
    [demandShift, supplyShift],
  );

  const supplyFn = useCallback((q: number) => supplyPrice(q, supplyShift), [supplyShift]);
  const demandFn = useCallback((q: number) => demandPrice(q, demandShift), [demandShift]);

  const supplyPath = useMemo(() => buildCurvePath(supplyFn), [supplyFn]);
  const demandPath = useMemo(() => buildCurvePath(demandFn), [demandFn]);

  const csPath = useMemo(
    () => (equilibrium ? buildSurplusPath(demandFn, equilibrium, true) : ""),
    [equilibrium, demandFn],
  );
  const psPath = useMemo(
    () => (equilibrium ? buildSurplusPath(supplyFn, equilibrium, false) : ""),
    [equilibrium, supplyFn],
  );

  const handleSvgMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = SVG_W / rect.width;
      const scaleY = SVG_H / rect.height;
      const svgX = (e.clientX - rect.left) * scaleX;
      const svgY = (e.clientY - rect.top) * scaleY;

      const q = ((svgX - MARGIN.left) / CHART_W) * Q_MAX;
      if (q < 0 || q > Q_MAX) {
        setTooltip(null);
        return;
      }

      const sp = supplyPrice(q, supplyShift);
      const dp = demandPrice(q, demandShift);
      const distS = Math.abs(svgY - toY(sp));
      const distD = Math.abs(svgY - toY(dp));

      if (Math.min(distS, distD) > 30) {
        setTooltip(null);
        return;
      }

      if (distS < distD) {
        setTooltip({ x: svgX, y: toY(sp), q: Math.round(q), p: Math.round(sp), type: "supply" });
      } else {
        setTooltip({ x: svgX, y: toY(dp), q: Math.round(q), p: Math.round(dp), type: "demand" });
      }
    },
    [supplyShift, demandShift],
  );

  const handleSvgLeave = useCallback(() => setTooltip(null), []);

  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 1; i < 5; i++) {
      const q = (i / 5) * Q_MAX;
      lines.push({ x1: toX(q), y1: MARGIN.top, x2: toX(q), y2: MARGIN.top + CHART_H });
    }
    for (let i = 1; i < 5; i++) {
      const p = (i / 5) * P_MAX;
      lines.push({ x1: MARGIN.left, y1: toY(p), x2: MARGIN.left + CHART_W, y2: toY(p) });
    }
    return lines;
  }, []);

  const transitionStyle = prefersReducedMotion ? {} : { transition: "all 0.2s ease-out" };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <label className="flex flex-1 items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: DEMAND_COLOR }}>
            需求冲击
          </span>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={demandShift}
            onChange={(e) => setDemandShift(Number(e.target.value))}
            className="slider-demand h-1.5 flex-1 cursor-pointer appearance-none rounded-full"
            aria-label="需求冲击滑块"
          />
          <span className="w-10 text-right font-mono text-[11px] tabular-nums" style={{ color: TEXT_COLOR }}>
            {demandShift > 0 ? "+" : ""}{demandShift}
          </span>
        </label>
        <label className="flex flex-1 items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: SUPPLY_COLOR }}>
            供给冲击
          </span>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={supplyShift}
            onChange={(e) => setSupplyShift(Number(e.target.value))}
            className="slider-supply h-1.5 flex-1 cursor-pointer appearance-none rounded-full"
            aria-label="供给冲击滑块"
          />
          <span className="w-10 text-right font-mono text-[11px] tabular-nums" style={{ color: TEXT_COLOR }}>
            {supplyShift > 0 ? "+" : ""}{supplyShift}
          </span>
        </label>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="h-auto w-full select-none"
        role="img"
        aria-label="供需曲线交互图"
        onMouseMove={handleSvgMove}
        onMouseLeave={handleSvgLeave}
      >
        <defs>
          <filter id="equi-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow-x" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={AXIS_COLOR} />
          </marker>
          <marker id="arrow-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={AXIS_COLOR} />
          </marker>
        </defs>

        {gridLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={GRID_COLOR}
            strokeWidth={0.5}
          />
        ))}

        <line
          x1={MARGIN.left}
          y1={MARGIN.top}
          x2={MARGIN.left}
          y2={MARGIN.top + CHART_H}
          stroke={AXIS_COLOR}
          strokeWidth={1}
          markerEnd="url(#arrow-y)"
        />
        <line
          x1={MARGIN.left}
          y1={MARGIN.top + CHART_H}
          x2={MARGIN.left + CHART_W}
          y2={MARGIN.top + CHART_H}
          stroke={AXIS_COLOR}
          strokeWidth={1}
          markerEnd="url(#arrow-x)"
        />

        <text
          x={MARGIN.left + CHART_W / 2}
          y={SVG_H - 6}
          textAnchor="middle"
          fill={TEXT_COLOR}
          fontSize={12}
          fontFamily="monospace"
        >
          产量 (Q)
        </text>
        <text
          x={16}
          y={MARGIN.top + CHART_H / 2}
          textAnchor="middle"
          fill={TEXT_COLOR}
          fontSize={12}
          fontFamily="monospace"
          transform={`rotate(-90,16,${MARGIN.top + CHART_H / 2})`}
        >
          价格 (P)
        </text>

        {equilibrium && (
          <>
            <path d={csPath} fill={CS_FILL} stroke="none" style={transitionStyle} />
            <path d={psPath} fill={PS_FILL} stroke="none" style={transitionStyle} />
          </>
        )}

        <path
          d={supplyPath}
          fill="none"
          stroke={SUPPLY_COLOR}
          strokeWidth={2.5}
          strokeLinecap="round"
          style={transitionStyle}
        />
        <path
          d={demandPath}
          fill="none"
          stroke={DEMAND_COLOR}
          strokeWidth={2.5}
          strokeLinecap="round"
          style={transitionStyle}
        />

        {supplyShift === 0 && (
          <text
            x={toX(Q_MAX) - 4}
            y={toY(supplyPrice(Q_MAX, 0)) - 8}
            textAnchor="end"
            fill={SUPPLY_COLOR}
            fontSize={11}
            fontFamily="monospace"
            opacity={0.7}
          >
            S
          </text>
        )}
        {demandShift === 0 && (
          <text
            x={toX(Q_MAX) - 4}
            y={toY(demandPrice(Q_MAX, 0)) + 16}
            textAnchor="end"
            fill={DEMAND_COLOR}
            fontSize={11}
            fontFamily="monospace"
            opacity={0.7}
          >
            D
          </text>
        )}

        {supplyShift !== 0 && (
          <text
            x={toX(Q_MAX) - 4}
            y={toY(supplyPrice(Q_MAX, supplyShift)) - 8}
            textAnchor="end"
            fill={SUPPLY_COLOR}
            fontSize={11}
            fontFamily="monospace"
          >
            S&apos;
          </text>
        )}
        {demandShift !== 0 && (
          <text
            x={toX(Q_MAX) - 4}
            y={toY(demandPrice(Q_MAX, demandShift)) + 16}
            textAnchor="end"
            fill={DEMAND_COLOR}
            fontSize={11}
            fontFamily="monospace"
          >
            D&apos;
          </text>
        )}

        {equilibrium && (
          <>
            <line
              x1={toX(equilibrium.q)}
              y1={toY(equilibrium.p)}
              x2={toX(equilibrium.q)}
              y2={MARGIN.top + CHART_H}
              stroke={EQUI_COLOR}
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.6}
              style={transitionStyle}
            />
            <line
              x1={MARGIN.left}
              y1={toY(equilibrium.p)}
              x2={toX(equilibrium.q)}
              y2={toY(equilibrium.p)}
              stroke={EQUI_COLOR}
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.6}
              style={transitionStyle}
            />
            <circle
              cx={toX(equilibrium.q)}
              cy={toY(equilibrium.p)}
              r={5}
              fill={EQUI_COLOR}
              filter="url(#equi-glow)"
              style={transitionStyle}
            />
            <text
              x={toX(equilibrium.q) + 10}
              y={toY(equilibrium.p) - 10}
              fill={EQUI_COLOR}
              fontSize={11}
              fontFamily="monospace"
              fontWeight={600}
              style={transitionStyle}
            >
              E({equilibrium.q.toFixed(0)}, {equilibrium.p.toFixed(0)})
            </text>
          </>
        )}

        {tooltip && (
          <g>
            <line
              x1={tooltip.x}
              y1={tooltip.y}
              x2={tooltip.x}
              y2={MARGIN.top + CHART_H}
              stroke={tooltip.type === "supply" ? SUPPLY_COLOR : DEMAND_COLOR}
              strokeWidth={0.5}
              strokeDasharray="2 2"
              opacity={0.5}
            />
            <circle
              cx={tooltip.x}
              cy={tooltip.y}
              r={4}
              fill={tooltip.type === "supply" ? SUPPLY_COLOR : DEMAND_COLOR}
              stroke="#000"
              strokeWidth={1}
            />
            <rect
              x={Math.min(tooltip.x + 10, SVG_W - 120)}
              y={tooltip.y - 32}
              width={110}
              height={28}
              rx={4}
              fill="rgba(0,0,0,0.85)"
              stroke={tooltip.type === "supply" ? SUPPLY_COLOR : DEMAND_COLOR}
              strokeWidth={0.5}
            />
            <text
              x={Math.min(tooltip.x + 16, SVG_W - 114)}
              y={tooltip.y - 14}
              fill="#fff"
              fontSize={10}
              fontFamily="monospace"
            >
              Q={tooltip.q} P={tooltip.p}
            </text>
          </g>
        )}

        {[1, 2, 3, 4].map((i) => {
          const q = (i / 5) * Q_MAX;
          return (
            <text
              key={`qx-${i}`}
              x={toX(q)}
              y={MARGIN.top + CHART_H + 18}
              textAnchor="middle"
              fill={TEXT_COLOR}
              fontSize={9}
              fontFamily="monospace"
            >
              {q.toFixed(0)}
            </text>
          );
        })}
        {[1, 2, 3, 4].map((i) => {
          const p = (i / 5) * P_MAX;
          return (
            <text
              key={`py-${i}`}
              x={MARGIN.left - 10}
              y={toY(p) + 3}
              textAnchor="end"
              fill={TEXT_COLOR}
              fontSize={9}
              fontFamily="monospace"
            >
              {p.toFixed(0)}
            </text>
          );
        })}
      </svg>

      {equilibrium && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]" style={{ color: TEXT_COLOR }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: EQUI_COLOR }} />
            均衡: P={equilibrium.p.toFixed(1)} Q={equilibrium.q.toFixed(1)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: DEMAND_COLOR, opacity: 0.4 }} />
            消费者剩余
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: SUPPLY_COLOR, opacity: 0.4 }} />
            生产者剩余
          </span>
        </div>
      )}

      <style>{`
        .slider-demand::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${DEMAND_COLOR};
          cursor: pointer;
          border: 2px solid #000;
        }
        .slider-demand::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${DEMAND_COLOR};
          cursor: pointer;
          border: 2px solid #000;
        }
        .slider-supply::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${SUPPLY_COLOR};
          cursor: pointer;
          border: 2px solid #000;
        }
        .slider-supply::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${SUPPLY_COLOR};
          cursor: pointer;
          border: 2px solid #000;
        }
        .slider-demand, .slider-supply {
          background: linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.08));
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
