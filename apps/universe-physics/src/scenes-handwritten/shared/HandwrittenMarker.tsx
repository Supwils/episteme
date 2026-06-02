"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { SceneMarker } from "@/lib/content";
import { useUiStore } from "@/store/useUiStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type HandwrittenMarkerProps = {
  marker: SceneMarker;
  x: number;
  y: number;
  /** Visual size in viewBox units; defaults from marker.size or 6. */
  radius?: number;
  /** Tier "kind" hint changes the visual. Universe: halo / diamond /
   * starpoint / pin. Physics: vector (force/field arrow), wave (sine
   * curve for ψ or EM wave), orbit (atomic or planetary ring). */
  variant?: "halo" | "diamond" | "starpoint" | "pin" | "vector" | "wave" | "orbit";
  delay?: number;
};

/**
 * A marker reading from src/content/cosmos/T*.ts. We translate the whole
 * group to (x, y) and draw the inner shapes around origin (0, 0) so that
 * the scale animation pivots on the marker centre — no SVG
 * transform-origin gymnastics needed.
 *
 * Click opens the existing knowledge panel; hover broadcasts to
 * useUiStore so the shared HoverTooltip can pick it up. Stores are
 * reused from the 3D variant on purpose.
 */
export function HandwrittenMarker({
  marker,
  x,
  y,
  radius = 6,
  variant = "halo",
  delay = 0,
}: HandwrittenMarkerProps) {
  const reduce = usePrefersReducedMotion();
  const setHover = useUiStore((s) => s.setHoveredMarker);
  const setPos = useUiStore((s) => s.setHoverMousePos);
  const openPanel = useUiStore((s) => s.openPanel);
  const [hovered, setHovered] = useState(false);

  const color = marker.color ?? "var(--hw-gold)";
  const onEnter = (e: React.MouseEvent) => {
    setHovered(true);
    setHover(marker);
    setPos({ x: e.clientX, y: e.clientY });
  };
  const onMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
  const onLeave = () => {
    setHovered(false);
    setHover(null);
  };
  const onClick = () => openPanel(marker.id);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPanel(marker.id);
    }
  };

  const baseScale = hovered ? 1.25 : 1.0;
  const scaleSpring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 18 };

  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        role="button"
        tabIndex={0}
        aria-label={`${marker.name.primary} (${marker.name.latin})`}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onFocus={onEnter as unknown as (e: React.FocusEvent) => void}
        onBlur={onLeave}
        onClick={onClick}
        onKeyDown={onKey}
        style={{ cursor: "pointer", outline: "none" }}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: baseScale }}
        transition={hovered ? scaleSpring : { duration: reduce ? 0 : 0.5, delay }}
      >
        {/* Outer dashed reference ring (visible on hover) */}
        <motion.circle
          cx={0}
          cy={0}
          r={radius * 2.6}
          fill="none"
          stroke={color}
          strokeWidth={0.7}
          strokeDasharray="2 3"
          initial={false}
          animate={{ opacity: hovered ? 0.7 : 0 }}
          transition={{ duration: 0.18 }}
        />

        {variant === "diamond" ? (
          <Diamond r={radius} color={color} />
        ) : variant === "pin" ? (
          <PinNeedle r={radius} color={color} />
        ) : variant === "starpoint" ? (
          <StarPoint r={radius} color={color} />
        ) : variant === "vector" ? (
          <VectorArrow r={radius} color={color} />
        ) : variant === "wave" ? (
          <WaveCurve r={radius} color={color} />
        ) : variant === "orbit" ? (
          <OrbitRing r={radius} color={color} />
        ) : (
          <HaloDisk r={radius} color={color} />
        )}
      </motion.g>
    </g>
  );
}

function HaloDisk({ r, color }: { r: number; color: string }) {
  return (
    <>
      <circle cx={0} cy={0} r={r * 2.2} fill={color} fillOpacity={0.08} />
      <circle cx={0} cy={0} r={r * 1.4} fill={color} fillOpacity={0.18} />
      <circle
        cx={0}
        cy={0}
        r={r}
        fill={color}
        fillOpacity={0.85}
        stroke="var(--hw-ink)"
        strokeWidth={0.6}
      />
    </>
  );
}

function Diamond({ r, color }: { r: number; color: string }) {
  const d = `M0 ${-r} L${r} 0 L0 ${r} L${-r} 0 Z`;
  return (
    <>
      <circle cx={0} cy={0} r={r * 1.8} fill={color} fillOpacity={0.1} />
      <path
        d={d}
        fill={color}
        fillOpacity={0.6}
        stroke="var(--hw-ink)"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
    </>
  );
}

function StarPoint({ r, color }: { r: number; color: string }) {
  const r2 = r * 0.4;
  return (
    <>
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((a) => {
        const ox = Math.cos(a) * r * 2;
        const oy = Math.sin(a) * r * 2;
        return (
          <line
            key={a}
            x1={0}
            y1={0}
            x2={ox}
            y2={oy}
            stroke={color}
            strokeWidth={0.5}
            opacity={0.6}
          />
        );
      })}
      <circle cx={0} cy={0} r={r} fill={color} fillOpacity={0.92} />
      <circle cx={0} cy={0} r={r2} fill="var(--hw-ink)" fillOpacity={0.95} />
    </>
  );
}

function PinNeedle({ r, color }: { r: number; color: string }) {
  return (
    <>
      <line x1={0} y1={-r * 3} x2={0} y2={0} stroke="var(--hw-ink-soft)" strokeWidth={0.6} />
      <circle cx={0} cy={0} r={r * 0.8} fill={color} stroke="var(--hw-ink)" strokeWidth={0.5} />
    </>
  );
}

/** Force / momentum / field-strength arrow pointing up by default. */
function VectorArrow({ r, color }: { r: number; color: string }) {
  const len = r * 3.2;
  const headW = r * 0.9;
  const headH = r * 0.9;
  return (
    <>
      <circle cx={0} cy={0} r={r * 0.8} fill={color} fillOpacity={0.18} />
      <line x1={0} y1={0} x2={0} y2={-len} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
      <path
        d={`M ${-headW} ${-len + headH} L 0 ${-len} L ${headW} ${-len + headH}`}
        fill="none"
        stroke={color}
        strokeWidth={1.3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={0} cy={0} r={r * 0.35} fill={color} />
    </>
  );
}

/** Hand-drawn sine curve: ψ(x), photon wave, or quantum wavepacket. */
function WaveCurve({ r, color }: { r: number; color: string }) {
  const samples = 24;
  const width = r * 5;
  const amp = r * 0.9;
  const cycles = 1.6;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = -width / 2 + t * width;
    const y = -Math.sin(t * Math.PI * 2 * cycles) * amp;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <>
      <circle cx={0} cy={0} r={r * 2} fill={color} fillOpacity={0.06} />
      <path
        d={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        filter="url(#hw-wobble-tiny)"
      />
    </>
  );
}

/** Ellipse-shaped orbital ring (atomic / planetary) with a small mass on the curve. */
function OrbitRing({ r, color }: { r: number; color: string }) {
  return (
    <>
      <ellipse
        cx={0}
        cy={0}
        rx={r * 2.6}
        ry={r * 1.4}
        fill="none"
        stroke={color}
        strokeWidth={0.9}
        filter="url(#hw-wobble-tiny)"
      />
      <circle cx={0} cy={0} r={r * 0.7} fill={color} fillOpacity={0.85} />
      <circle
        cx={r * 2.6}
        cy={0}
        r={r * 0.5}
        fill={color}
        stroke="var(--hw-ink)"
        strokeWidth={0.4}
      />
    </>
  );
}
