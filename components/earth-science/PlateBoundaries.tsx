"use client";

import { useState } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";

type BoundaryId = "divergent" | "convergent" | "transform";

const ACCENT = "#4f9d76";

const BOUNDARIES: Record<
  BoundaryId,
  {
    label: string;
    labelEn: string;
    motion: string;
    feature: string;
    example: string;
    body: string;
  }
> = {
  divergent: {
    label: "离散边界",
    labelEn: "Divergent",
    motion: "两板块相互拉开",
    feature: "洋中脊 · 裂谷",
    example: "大西洋中脊、东非大裂谷",
    body: "地幔物质上涌、冷却成新的洋壳，海底像传送带一样从中脊向两侧扩张——这正是赫斯 1962 年「海底扩张」的核心。每年增宽约 2–10 厘米。",
  },
  convergent: {
    label: "汇聚边界",
    labelEn: "Convergent",
    motion: "两板块相向挤压",
    feature: "海沟 · 俯冲带 · 火山弧",
    example: "安第斯山脉、日本海沟、喜马拉雅",
    body: "较重的洋壳俯冲到另一板块之下、沉入地幔，拖出深海沟，并在上方熔出一串火山。若两块陆壳相撞则无人肯下沉，地壳被挤皱成高山（喜马拉雅至今每年长高约 1 厘米）。",
  },
  transform: {
    label: "转换边界",
    labelEn: "Transform",
    motion: "两板块水平错动",
    feature: "走滑断层",
    example: "圣安德烈斯断层",
    body: "板块既不生长也不消亡，只是擦肩而过。应力在断层上慢慢累积，一旦突然释放就是一次地震——这正是 1906 年旧金山地震的弹性回跳机制。",
  },
};

const ORDER: BoundaryId[] = ["divergent", "convergent", "transform"];

export function PlateBoundaries() {
  const [active, setActive] = useState<BoundaryId>("divergent");
  const reduce = useReducedMotion();
  const b = BOUNDARIES[active];

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          板块边界 · 交互
        </span>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="板块边界类型">
          {ORDER.map((id) => {
            const selected = id === active;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(id)}
                className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors"
                style={{
                  borderColor: selected ? ACCENT : "var(--color-border-subtle)",
                  // dark text on the light-green accent fill (white fails AA here)
                  color: selected ? "#0e0f14" : "var(--color-fg-muted)",
                  backgroundColor: selected ? ACCENT : "transparent",
                }}
              >
                {BOUNDARIES[id].label}
              </button>
            );
          })}
        </div>
      </figcaption>

      <div className="p-4 sm:p-6">
        <BoundaryDiagram active={active} reduce={!!reduce} />

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Fact label="板块运动" value={b.motion} />
          <Fact label="典型地貌" value={b.feature} />
          <Fact label="实例" value={b.example} />
        </div>
        <p className="text-fg-secondary mt-4 text-sm leading-relaxed">{b.body}</p>
      </div>
    </figure>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <dl className="border-border-faint border-l-2 pl-3" style={{ borderLeftColor: `${ACCENT}66` }}>
      <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">{label}</dt>
      <dd className="text-fg-primary mt-0.5 text-sm">{value}</dd>
    </dl>
  );
}

/** Cross-section: two plates over the mantle, animated per boundary type. */
function BoundaryDiagram({ active, reduce }: { active: BoundaryId; reduce: boolean }) {
  // Each plate slides along x (divergent/convergent) or y (transform). The loop
  // is gentle and pauses entirely under prefers-reduced-motion.
  const dur = 4;
  const leftAnim: TargetAndTransition =
    active === "divergent"
      ? { x: [-2, -14, -2] }
      : active === "convergent"
        ? { x: [-2, 10, -2] }
        : { y: [0, -8, 0] };
  const rightAnim: TargetAndTransition =
    active === "divergent"
      ? { x: [2, 14, 2] }
      : active === "convergent"
        ? { x: [2, -2, 2] }
        : { y: [0, 8, 0] };
  const anim = (a: TargetAndTransition) =>
    reduce
      ? {}
      : { animate: a, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <svg
      viewBox="0 0 320 150"
      className="h-auto w-full"
      role="img"
      aria-label={`${BOUNDARIES[active].label}示意图：${BOUNDARIES[active].motion}`}
    >
      {/* mantle */}
      <rect x="0" y="95" width="320" height="55" fill="#3a2218" opacity="0.55" />
      <text x="8" y="142" fill="var(--color-fg-disabled)" fontSize="9" fontFamily="monospace">
        地幔
      </text>

      {active === "divergent" && (
        <>
          {/* upwelling magma */}
          <motion.path
            d="M160 150 L150 100 L160 78 L170 100 Z"
            fill="#d9542d"
            opacity={0.85}
            {...(reduce
              ? {}
              : {
                  animate: { opacity: [0.6, 0.95, 0.6] },
                  transition: { duration: dur, repeat: Infinity },
                })}
          />
          <text
            x="160"
            y="70"
            fill="#e08a3c"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
          >
            新洋壳 ▲
          </text>
        </>
      )}
      {active === "convergent" && (
        <>
          {/* trench + volcano on the overriding plate */}
          <path d="M150 95 L120 145 L130 150 L160 95 Z" fill="#2a1d14" opacity="0.7" />
          <path d="M205 95 L218 70 L231 95 Z" fill="#d9542d" opacity="0.85" />
          <text
            x="218"
            y="64"
            fill="#e08a3c"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
          >
            火山
          </text>
        </>
      )}

      {/* left plate */}
      <motion.g {...anim(leftAnim)}>
        <rect x="-20" y="78" width="180" height="20" rx="2" fill={ACCENT} opacity="0.9" />
        <Arrow
          x={70}
          y={64}
          dir={active === "divergent" ? "left" : active === "convergent" ? "right" : "up"}
        />
      </motion.g>

      {/* right plate */}
      <motion.g {...anim(rightAnim)}>
        <rect x="160" y="78" width="180" height="20" rx="2" fill="#5a9ad8" opacity="0.9" />
        <Arrow
          x={250}
          y={64}
          dir={active === "divergent" ? "right" : active === "convergent" ? "left" : "down"}
        />
      </motion.g>

      <text
        x="60"
        y="92"
        fill="#fff"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
        opacity="0.8"
      >
        板块 A
      </text>
      <text
        x="250"
        y="92"
        fill="#fff"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
        opacity="0.8"
      >
        板块 B
      </text>
    </svg>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: "left" | "right" | "up" | "down" }) {
  const rot = { left: 180, right: 0, up: 270, down: 90 }[dir];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <line x1="-10" y1="0" x2="8" y2="0" stroke="var(--color-fg-secondary)" strokeWidth="2" />
      <path d="M8 -4 L14 0 L8 4 Z" fill="var(--color-fg-secondary)" />
    </g>
  );
}
