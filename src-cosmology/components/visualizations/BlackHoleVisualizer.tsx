"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

interface BlackHoleVisualizerProps {
  className?: string;
}

export function BlackHoleVisualizer({ className }: BlackHoleVisualizerProps) {
  const reduce = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const svgSize = 500;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const eventHorizonR = 50;
  const photonSphereR = 75;
  const accretionInnerR = 85;
  const accretionOuterR = 180;

  useEffect(() => {
    if (reduce) return;
    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setRotation((r) => r + (delta / 1000) * 0.3);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce]);

  const accretionDiskPoints = useMemo(() => {
    const points: { x: number; y: number; opacity: number }[] = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rotation;
      const r = accretionInnerR + Math.random() * (accretionOuterR - accretionInnerR);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r * 0.3;
      const distFromCenter = Math.abs(r - (accretionInnerR + accretionOuterR) / 2) / ((accretionOuterR - accretionInnerR) / 2);
      const opacity = Math.max(0.1, 1 - distFromCenter * 0.8);
      points.push({ x, y, opacity });
    }
    return points;
  }, [rotation, cx, cy, accretionInnerR, accretionOuterR]);

  const lensingArcs = useMemo(() => {
    const arcs: { d: string; opacity: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + rotation * 0.5;
      const r = eventHorizonR + 10 + i * 3;
      const startAngle = angle - 0.3;
      const endAngle = angle + 0.3;
      const x1 = cx + Math.cos(startAngle) * r;
      const y1 = cy + Math.sin(startAngle) * r;
      const x2 = cx + Math.cos(endAngle) * r;
      const y2 = cy + Math.sin(endAngle) * r;
      arcs.push({
        d: `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`,
        opacity: 0.3 - i * 0.03,
      });
    }
    return arcs;
  }, [rotation, cx, cy, eventHorizonR]);

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            黑洞可视化 · black hole
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLabels((prev) => !prev)}
              className="border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {showLabels ? "隐藏标注" : "显示标注"}
            </button>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="h-auto w-full"
          role="img"
          aria-label="黑洞结构交互式可视化"
        >
          <defs>
            <radialGradient id="bh-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="60%" stopColor="#050510" />
              <stop offset="100%" stopColor="#0a0a1a" />
            </radialGradient>
            <radialGradient id="singularity" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="photon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#f97316" stopOpacity="0" />
              <stop offset="85%" stopColor="#f97316" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
            <filter id="bh-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="star-glow">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          <rect width={svgSize} height={svgSize} fill="url(#bh-bg)" />

          {Array.from({ length: 80 }).map((_, i) => {
            const x = ((i * 137.5) % svgSize);
            const y = ((i * 97.3) % svgSize);
            const r = 0.5 + (i % 3) * 0.5;
            const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
            if (dist < accretionOuterR + 20) return null;
            return (
              <circle
                key={`star-${i}`}
                cx={x}
                cy={y}
                r={r}
                fill="#fff"
                opacity={0.3 + (i % 5) * 0.1}
              />
            );
          })}

          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = accretionOuterR + 40 + (i % 3) * 30;
            const x = cx + Math.cos(angle) * dist;
            const y = cy + Math.sin(angle) * dist;
            const lensR = 3 + (i % 2) * 2;
            return (
              <g key={`lensed-${i}`}>
                <ellipse
                  cx={x}
                  cy={y}
                  rx={lensR}
                  ry={lensR * 2.5}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={0.5}
                  opacity={0.2}
                  transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x}, ${y})`}
                />
              </g>
            );
          })}

          {accretionDiskPoints.map((pt, i) => (
            <circle
              key={`disk-${i}`}
              cx={pt.x}
              cy={pt.y}
              r={1.5 + Math.random()}
              fill={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fbbf24" : "#ef4444"}
              opacity={pt.opacity * 0.6}
            />
          ))}

          <circle
            cx={cx}
            cy={cy}
            r={photonSphereR}
            fill="url(#photon-glow)"
          />

          {lensingArcs.map((arc, i) => (
            <path
              key={`lensing-${i}`}
              d={arc.d}
              fill="none"
              stroke="#f97316"
              strokeWidth={1.5}
              opacity={arc.opacity}
            />
          ))}

          <circle
            cx={cx}
            cy={cy}
            r={eventHorizonR}
            fill="url(#singularity)"
            stroke="#f97316"
            strokeWidth={1}
            strokeOpacity={0.4}
          />

          <circle
            cx={cx}
            cy={cy}
            r={8}
            fill="#000"
            stroke="#ef4444"
            strokeWidth={0.5}
            strokeOpacity={0.5}
          />

          {showLabels && (
            <g>
              <line
                x1={cx}
                y1={cy - eventHorizonR}
                x2={cx}
                y2={cy - eventHorizonR - 40}
                stroke="#f97316"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <text
                x={cx}
                y={cy - eventHorizonR - 45}
                textAnchor="middle"
                fill="#f97316"
                fontSize="9"
                fontFamily="monospace"
              >
                事件视界 Event Horizon
              </text>

              <line
                x1={cx + photonSphereR}
                y1={cy}
                x2={cx + photonSphereR + 40}
                y2={cy - 20}
                stroke="#fbbf24"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <text
                x={cx + photonSphereR + 45}
                y={cy - 22}
                textAnchor="start"
                fill="#fbbf24"
                fontSize="9"
                fontFamily="monospace"
              >
                光子层 Photon Sphere
              </text>

              <line
                x1={cx + accretionOuterR}
                y1={cy + 10}
                x2={cx + accretionOuterR + 30}
                y2={cy + 30}
                stroke="#ef4444"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <text
                x={cx + accretionOuterR + 35}
                y={cy + 32}
                textAnchor="start"
                fill="#ef4444"
                fontSize="9"
                fontFamily="monospace"
              >
                吸积盘 Accretion Disk
              </text>

              <line
                x1={cx - 8}
                y1={cy + 8}
                x2={cx - 30}
                y2={cy + 30}
                stroke="#888"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <text
                x={cx - 35}
                y={cy + 32}
                textAnchor="end"
                fill="#888"
                fontSize="9"
                fontFamily="monospace"
              >
                奇点 Singularity
              </text>
            </g>
          )}
        </svg>

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
              <span className="font-mono text-[9px] text-fg-muted">事件视界</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="font-mono text-[9px] text-fg-muted">光子层</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="font-mono text-[9px] text-fg-muted">吸积盘</span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-fg-disabled">
            史瓦西半径模型
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">事件视界</p>
          <p className="text-fg-primary font-mono text-sm">r_s = 2GM/c²</p>
          <p className="text-fg-disabled mt-1 text-[10px]">光无法逃逸的边界</p>
        </div>
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">光子层</p>
          <p className="text-fg-primary font-mono text-sm">r = 1.5 r_s</p>
          <p className="text-fg-disabled mt-1 text-[10px]">光子可绕黑洞运行</p>
        </div>
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">引力透镜</p>
          <p className="text-fg-primary font-mono text-sm">光线弯曲</p>
          <p className="text-fg-disabled mt-1 text-[10px]">时空弯曲导致的光偏折</p>
        </div>
      </div>
    </div>
  );
}
