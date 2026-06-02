"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ArrowUpRight } from "@/src-physics/components/hud/icons";
import { hasContentForTier } from "@/src-physics/content";
import { cn } from "@/src-physics/lib/cn";
import { parseCrossLink, tierSection } from "@/src-physics/lib/cross-link";
import { getSectionConfig, getSectionRoute } from "@/src-physics/lib/section";
import type { AnyTierId } from "@/src-physics/lib/tier";
import type { TierContent } from "@/src-physics/lib/content";
import { useUiStore } from "@/src-physics/store/useUiStore";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

/**
 * Cross-tier reference strip. Mines the current tier's markers and
 * dataCards for embedded tier ids and renders them as navigable chips.
 * Dedups so the same target tier only shows once.
 */
export function RelatedTiers({ content }: { content: TierContent }) {
  const router = useRouter();
  const setTier = useUniverseStore((s) => s.setTier);
  const openPanel = useUiStore((s) => s.openPanel);

  const links = useMemo(() => collectCrossLinks(content), [content]);
  if (links.length === 0) return null;

  const currentSection = tierSection(content.tier);

  const go = (tier: AnyTierId) => {
    const section = tierSection(tier);
    // Switch the scene route + tier; keep the atlas panel open with the
    // new tier's content so users can read laterally without losing flow.
    setTier(tier);
    router.push(getSectionRoute(section, tier, "handwritten"));
    if (hasContentForTier(tier)) openPanel(tier);
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="text-fg-muted flex items-baseline gap-3 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="text-accent-cool/80">互文 · cross-links</span>
        <span aria-hidden className="text-fg-disabled">
          {links.length}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const linkSection = tierSection(link.tier);
          const meta = getSectionConfig(linkSection).tiers[link.tier];
          if (!meta) return null;
          const isCross = linkSection !== currentSection;
          return (
            <li key={link.tier}>
              <button
                type="button"
                onClick={() => go(link.tier)}
                title={isCross ? `跨板块 → ${linkSection}` : `同板块 → ${linkSection}`}
                className={cn(
                  "ease-product group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-150",
                  isCross
                    ? "border-accent-cool/50 bg-accent-cool/8 hover:border-accent-cool hover:bg-accent-cool/15"
                    : "border-fg-disabled/40 bg-bg-elevated/30 hover:border-accent-warm/60 hover:bg-bg-elevated/60",
                )}
              >
                <span
                  data-num
                  className={cn(
                    "font-mono text-[10px] tracking-[0.2em] uppercase",
                    isCross ? "text-accent-cool" : "text-accent-warm/90",
                  )}
                >
                  {link.tier}
                </span>
                <span className="text-fg-primary text-[12px] tracking-tight">
                  {meta.shortLabel}
                </span>
                {link.rest ? (
                  <span className="text-fg-muted text-[11px]">· {link.rest}</span>
                ) : null}
                <ArrowUpRight className="text-fg-muted ease-product h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Aggregate cross-link tiers from a content's markers + dataCards.
 *  Excludes the current tier itself; the first seen rest-label wins. */
function collectCrossLinks(content: TierContent): Array<{ tier: AnyTierId; rest: string }> {
  const seen = new Map<AnyTierId, string>();
  const visit = (value: string) => {
    const link = parseCrossLink(value);
    if (!link) return;
    if (link.tier === content.tier) return;
    if (!seen.has(link.tier)) {
      seen.set(link.tier, link.rest);
    }
  };
  for (const card of content.dataCards) {
    if (card.hint) visit(card.hint);
    visit(card.value);
  }
  for (const m of content.markers ?? []) {
    for (const d of m.data ?? []) {
      visit(d.value);
      visit(d.label);
    }
    visit(m.description);
  }
  return Array.from(seen, ([tier, rest]) => ({ tier, rest }));
}
