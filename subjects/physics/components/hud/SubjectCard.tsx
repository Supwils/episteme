"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "./icons";
import { getContentForTier } from "@/subjects/physics/lib/tier-content";
import { getSectionConfig } from "@/subjects/physics/lib/section";
import { useUiStore } from "@/subjects/physics/store/useUiStore";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";

export function SubjectCard() {
  const tier = useUniverseStore((state) => state.currentTier);
  const section = useUniverseStore((state) => state.section);
  const openPanel = useUiStore((state) => state.openPanel);
  const cfg = getSectionConfig(section);
  const meta = cfg.tiers[tier] ?? cfg.tiers[cfg.defaultTier]!;
  const content = getContentForTier(tier);

  const hasAtlas = content !== null;

  return (
    <motion.section
      key={tier}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      className="pointer-events-auto w-full max-w-md"
    >
      <div className="border-fg-disabled/35 bg-bg-deep/55 relative overflow-hidden border backdrop-blur-md">
        {/* corner ticks for the engineering-drawing feel */}
        <CornerTicks />

        <div className="flex flex-col gap-2 p-4 md:gap-3 md:p-5">
          <div className="text-fg-muted hidden items-baseline gap-2 font-mono text-[10px] tracking-[0.32em] uppercase md:flex">
            <span>tier · {meta.id}</span>
            <span aria-hidden className="text-fg-disabled">
              /
            </span>
            <span data-num>{meta.unit}</span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-display text-fg-primary text-2xl leading-[1.02] tracking-tight md:text-4xl">
              {content?.name.latin ?? meta.label}
            </h1>
            <p className="text-fg-secondary text-sm tracking-wide">
              {content?.name.primary ?? meta.shortLabel}
              {content?.tagline ? (
                <>
                  <span aria-hidden className="text-fg-disabled mx-2">
                    ·
                  </span>
                  <span className="text-fg-muted">{content.tagline}</span>
                </>
              ) : null}
            </p>
          </div>

          {content?.whisper ? (
            <p className="text-fg-secondary mt-1 hidden text-[13px] leading-relaxed italic md:block">
              「{content.whisper}」
            </p>
          ) : null}

          {content ? (
            <ul className="mt-2 hidden flex-wrap gap-x-5 gap-y-2 md:flex">
              {content.dataCards.slice(0, 3).map((card) => (
                <li key={card.label} className="flex flex-col">
                  <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                    {card.label}
                  </span>
                  <span data-num className="text-fg-primary font-mono text-[13px] tracking-tight">
                    {card.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="border-fg-disabled/30 mt-2 flex items-center justify-between border-t pt-3 md:mt-4 md:pt-4">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">
              <span className="md:hidden">{hasAtlas ? "图册" : "待补充"}</span>
              <span className="hidden md:inline">
                {hasAtlas ? "atlas entry · 中文" : "atlas pending"}
              </span>
            </span>
            <button
              type="button"
              data-open-atlas
              data-atlas-tier={tier}
              disabled={!hasAtlas}
              onClick={() => hasAtlas && openPanel(tier)}
              className="ease-product text-fg-secondary hover:text-fg-primary group inline-flex shrink-0 items-center gap-2 font-mono text-[11px] tracking-[0.24em] whitespace-nowrap uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              open atlas
              <ArrowUpRight className="ease-product h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="border-fg-secondary absolute top-0 left-0 h-3 w-3 border-t border-l" />
      <span className="border-fg-secondary absolute top-0 right-0 h-3 w-3 border-t border-r" />
      <span className="border-fg-secondary absolute bottom-0 left-0 h-3 w-3 border-b border-l" />
      <span className="border-fg-secondary absolute right-0 bottom-0 h-3 w-3 border-r border-b" />
    </>
  );
}
