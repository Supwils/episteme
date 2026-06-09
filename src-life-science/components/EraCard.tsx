"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ERA_BG, PRODUCT_EASE } from "../lib/constants";
import type { GeologicalEra } from "../lib/types";

export function EraCard({ era, index }: { era: GeologicalEra; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : Math.min(index * 0.08, 0.8),
        ease: PRODUCT_EASE,
      }}
    >
      <Link
        href={`/life-science/eras/${era.id}`}
        className="group relative flex flex-col gap-3 overflow-hidden border p-5 backdrop-blur-xl transition-all duration-500 sm:p-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.06)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
          borderRadius: "16px",
        }}
      >
        <style>{`
          .era-card-${era.id}:hover,
          .era-card-${era.id}:focus-visible {
            background: rgba(255,255,255,0.06) !important;
            border-color: ${era.borderAccent} !important;
            box-shadow: 0 20px 60px ${era.glowColor},
                        0 0 0 1px ${era.borderAccent},
                        inset 0 1px 0 rgba(255,255,255,0.05) !important;
            transform: translateY(-4px) scale(1.02) !important;
          }
          .era-card-${era.id}:focus-visible {
            outline: 2px solid ${era.glowColor};
            outline-offset: 2px;
          }
          .era-card-${era.id}:hover .era-card__glow { opacity: 1; }
          .era-card-${era.id}:hover .era-card__arrow { transform: translateX(4px); }
        `}</style>

        <div
          aria-hidden="true"
          className="era-card__glow absolute -top-16 -right-16 h-40 w-40 rounded-full transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${era.glowColor} 0%, transparent 70%)`,
            opacity: 0.3,
          }}
        />

        <div
          className="h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
          style={{ background: era.gradient }}
        />

        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
            style={{
              background: ERA_BG[era.name],
              border: `1px solid ${era.borderAccent}`,
            }}
          >
            {era.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.15rem] font-bold leading-tight text-[#e8e8f0]">
              {era.name}
            </h3>
            <p
              className="mt-0.5 font-mono text-[10px] tracking-wider"
              style={{ color: era.glowColor.replace("0.3", "0.8") }}
            >
              {era.nameEn}
            </p>
          </div>
        </div>

        <p className="font-mono text-[11px] tracking-wide text-[#9ca3af]">
          {era.timeRange}
        </p>

        <p className="flex-1 text-[0.82rem] leading-relaxed text-[#b0b0c0]">
          {era.keyFact}
        </p>

        <span
          aria-hidden
          className="era-card__arrow font-mono text-xs transition-transform duration-300"
          style={{
            color: era.glowColor.replace("0.3", "0.8"),
            transform: "translateX(0)",
          }}
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
