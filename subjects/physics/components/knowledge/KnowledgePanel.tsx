"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Close } from "@/subjects/physics/components/hud/icons";
import { AtlasToc } from "./AtlasToc";
import { DataCard } from "./DataCard";
import { NarrativeSection } from "./NarrativeSection";
import { RelatedTiers } from "./RelatedTiers";
import { SourcesList } from "./SourcesList";
import { getContentForTier } from "@/subjects/physics/lib/tier-content";
import { SECTIONS } from "@/subjects/physics/lib/section";
import { isPhysicsTierId } from "@/subjects/physics/lib/physics-tier";
import { TIER_ROUTES, isUniverseTierId, type AnyTierId } from "@/subjects/physics/lib/tier";
import { useUiStore } from "@/subjects/physics/store/useUiStore";

const PRODUCT_EASE = [0.22, 0.61, 0.36, 1] as const;

export function KnowledgePanel() {
  const open = useUiStore((state) => state.panelOpen);
  const contentId = useUiStore((state) => state.panelContentId);
  const close = useUiStore((state) => state.closePanel);

  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    // Defer focus until the slide-in finishes so screen readers announce
    // the panel header rather than the close button mid-flight.
    const id = window.setTimeout(() => closeButtonRef.current?.focus(), 360);
    return () => {
      window.clearTimeout(id);
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const tier = contentId as AnyTierId | null;
  const content = tier ? getContentForTier(tier) : null;
  const meta = tier ? sectionMetaForTier(tier) : null;
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);

  return (
    <AnimatePresence>
      {open && content && tier && meta ? (
        <>
          {/* Transparent click-catcher: clicking outside the panel closes
              it, but the underlying scene stays sharp and interactive
              everywhere the panel does not cover. */}
          <div
            key="panel-catcher"
            aria-hidden
            className="fixed inset-0 right-[min(480px,100vw)] z-40 bg-transparent"
            onClick={close}
          />
          <motion.aside
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${meta.tierLabel} knowledge atlas`}
            className="bg-bg-deep/80 border-fg-disabled/30 fixed top-0 right-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            initial={{ x: "102%" }}
            animate={{ x: 0 }}
            exit={{ x: "102%" }}
            transition={{ duration: 0.42, ease: PRODUCT_EASE }}
          >
            <PanelHeader
              tier={tier}
              tierLabel={meta.tierLabel}
              onClose={close}
              closeButtonRef={closeButtonRef}
            />
            <div ref={setScrollEl} className="flex-1 overflow-y-auto px-7 pt-5 pb-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
                }}
                className="flex flex-col gap-7"
              >
                <Reveal>
                  <Hero tier={tier} />
                </Reveal>

                <Reveal>
                  <RelatedTiers content={content} />
                </Reveal>

                <Reveal>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {content.dataCards.map((card) => (
                      <DataCard key={card.label} card={card} />
                    ))}
                  </div>
                </Reveal>

                <AtlasToc
                  sections={content.narrative}
                  anchorPrefix="atlas-section"
                  scrollContainer={scrollEl}
                />

                {content.narrative.map((section, i) => (
                  <Reveal key={section.heading}>
                    <NarrativeSection section={section} index={i} id={`atlas-section-${i}`} />
                  </Reveal>
                ))}

                <Reveal>
                  <SourcesList sources={content.sources} />
                </Reveal>

                <Reveal>
                  <Footer tier={tier} tierLabel={meta.tierLabel} tierUnit={meta.tierUnit} />
                </Reveal>
              </motion.div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/** Resolve display-friendly metadata for a tier regardless of section. */
function sectionMetaForTier(tier: AnyTierId): { tierLabel: string; tierUnit: string } | null {
  const sectionId = isPhysicsTierId(tier) ? "physics" : "universe";
  const cfg = SECTIONS[sectionId];
  const meta = cfg.tiers[tier];
  if (!meta) return null;
  return { tierLabel: meta.label, tierUnit: meta.unit };
}

function PanelHeader({
  tier,
  tierLabel,
  onClose,
  closeButtonRef,
}: {
  tier: AnyTierId;
  tierLabel: string;
  onClose: () => void;
  closeButtonRef: React.Ref<HTMLButtonElement>;
}) {
  return (
    <header className="border-fg-disabled/25 bg-bg-deep/70 sticky top-0 z-10 flex items-center justify-between border-b px-7 py-4 backdrop-blur-md">
      <div className="text-fg-muted flex items-baseline gap-3 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="text-fg-primary">{tier}</span>
        <span className="text-fg-disabled">/</span>
        <span>{tierLabel}</span>
      </div>
      <button
        type="button"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close knowledge atlas"
        className="border-fg-disabled/40 text-fg-secondary hover:border-fg-secondary hover:text-fg-primary ease-product flex h-7 w-7 items-center justify-center border transition-colors duration-200"
      >
        <Close className="h-3 w-3" />
      </button>
    </header>
  );
}

function Hero({ tier }: { tier: AnyTierId }) {
  const content = getContentForTier(tier);
  if (!content) return null;
  return (
    <div className="flex flex-col gap-3">
      <span className="text-accent-cool/80 font-mono text-[10px] tracking-[0.3em] uppercase">
        atlas entry
      </span>
      <h2 className="font-display text-fg-primary text-4xl leading-[1.04] tracking-tight md:text-5xl">
        {content.name.latin}
      </h2>
      <p className="text-fg-secondary text-base tracking-wide">
        {content.name.primary}
        <span aria-hidden className="text-fg-disabled mx-2">
          ·
        </span>
        <span className="text-fg-muted">{content.tagline}</span>
      </p>
      {content.whisper ? (
        <p className="text-fg-secondary/90 mt-2 text-[13px] leading-relaxed italic">
          「{content.whisper}」
        </p>
      ) : null}
      {/* Reciprocal of the cosmology→3D link: same scale, readable long-form. */}
      {isUniverseTierId(tier) ? (
        <Link
          href={`/cosmology/universe/${TIER_ROUTES[tier]}`}
          className="border-accent-cool/30 bg-accent-cool/[0.06] text-fg-secondary hover:bg-accent-cool/[0.12] hover:text-fg-primary ease-product mt-3 inline-flex w-fit items-center gap-2 border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200"
        >
          阅读此尺度的图文详解 →
        </Link>
      ) : null}
    </div>
  );
}

function Footer({
  tier,
  tierLabel: _tierLabel,
  tierUnit,
}: {
  tier: AnyTierId;
  tierLabel: string;
  tierUnit: string;
}) {
  return (
    <footer className="border-fg-disabled/25 text-fg-muted flex items-baseline justify-between border-t pt-5 font-mono text-[10px] tracking-[0.22em] uppercase">
      <span>tier · {tier}</span>
      <span data-num>scale · {tierUnit}</span>
      <span>esc · close</span>
    </footer>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: PRODUCT_EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
