"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/src-physics/lib/cn";
import { usePrefersReducedMotion } from "@/src-physics/scenes-handwritten/shared/usePrefersReducedMotion";
import { DataCardGrid, type DataCardItem } from "./DataCardGrid";

export type KnowledgePanelProps = {
  tierName: string;
  dataCards: DataCardItem[];
  narrative: { title: string; paragraphs: string[] }[];
  sources: { label: string; url?: string }[];
  deepReading?: {
    introduction: string;
    sections: { title: string; content: string[] }[];
  };
  className?: string;
};

const PRODUCT_EASE = [0.22, 0.61, 0.36, 1] as const;

export function KnowledgePanel({
  tierName,
  dataCards,
  narrative,
  sources,
  deepReading,
  className,
}: KnowledgePanelProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
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
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea',
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

  const duration = reducedMotion ? 0 : 0.42;

  return (
    <>
      <KnowledgePanelButton tierName={tierName} onClick={toggle} open={open} />

      <AnimatePresence>
        {open && (
          <>
            <div
              key="kp-catcher"
              aria-hidden
              className="fixed inset-0 right-[min(480px,100vw)] z-40 bg-transparent"
              onClick={close}
            />
            <motion.aside
              key="kp-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${tierName} knowledge panel`}
              className={cn(
                "bg-bg-deep/80 border-fg-disabled/30 fixed top-0 right-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l",
                "shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl",
                className,
              )}
              initial={{ x: "102%" }}
              animate={{ x: 0 }}
              exit={{ x: "102%" }}
              transition={{ duration, ease: PRODUCT_EASE }}
            >
              <PanelHeader tierName={tierName} onClose={close} closeButtonRef={closeButtonRef} />

              <div className="flex-1 overflow-y-auto px-7 pt-5 pb-12">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: reducedMotion ? 0 : 0.12 } },
                  }}
                  className="flex flex-col gap-7"
                >
                  <Reveal reducedMotion={reducedMotion}>
                    <DataCardGrid cards={dataCards} />
                  </Reveal>

                  <Reveal reducedMotion={reducedMotion}>
                    <NarrativeBlock sections={narrative} reducedMotion={reducedMotion} />
                  </Reveal>

                  <Reveal reducedMotion={reducedMotion}>
                    <SourcesBlock sources={sources} />
                  </Reveal>

                  {deepReading ? (
                    <Reveal reducedMotion={reducedMotion}>
                      <DeepReadingBlock data={deepReading} reducedMotion={reducedMotion} />
                    </Reveal>
                  ) : null}

                  <Reveal reducedMotion={reducedMotion}>
                    <footer className="border-fg-disabled/25 text-fg-muted flex items-baseline justify-between border-t pt-5 font-mono text-[10px] tracking-[0.22em] uppercase">
                      <span>tier · {tierName}</span>
                      <span>esc · close</span>
                    </footer>
                  </Reveal>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function KnowledgePanelButton({
  tierName,
  onClick,
  open,
}: {
  tierName: string;
  onClick: () => void;
  open: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={`Open knowledge panel for ${tierName}`}
      className={cn(
        "pointer-events-auto border-fg-disabled/40 bg-bg-deep/60 text-fg-secondary",
        "hover:border-fg-secondary hover:text-fg-primary ease-product",
        "fixed bottom-20 right-5 z-30 flex items-center gap-2 border px-3.5 py-2",
        "font-mono text-[11px] tracking-[0.2em] uppercase backdrop-blur-md",
        "transition-colors duration-200 md:bottom-10 md:right-10",
      )}
    >
      <BookIcon className="h-3.5 w-3.5" />
      <span>深度阅读</span>
    </button>
  );
}

function PanelHeader({
  tierName,
  onClose,
  closeButtonRef,
}: {
  tierName: string;
  onClose: () => void;
  closeButtonRef: React.Ref<HTMLButtonElement>;
}) {
  return (
    <header className="border-fg-disabled/25 bg-bg-deep/70 sticky top-0 z-10 flex items-center justify-between border-b px-7 py-4 backdrop-blur-md">
      <div className="text-fg-muted flex items-baseline gap-3 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="text-fg-primary">{tierName}</span>
        <span className="text-fg-disabled">/</span>
        <span>深度阅读</span>
      </div>
      <button
        type="button"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close knowledge panel"
        className="border-fg-disabled/40 text-fg-secondary hover:border-fg-secondary hover:text-fg-primary ease-product flex h-7 w-7 items-center justify-center border transition-colors duration-200"
      >
        <CloseIcon className="h-3 w-3" />
      </button>
    </header>
  );
}

function NarrativeBlock({
  sections,
  reducedMotion,
}: {
  sections: { title: string; paragraphs: string[] }[];
  reducedMotion: boolean;
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
        narrative · 叙述
      </h3>
      {sections.map((section, idx) => {
        const isExpanded = expandedIdx === idx;
        return (
          <div
            key={section.title}
            className="border-fg-disabled/25 border-t pt-4"
          >
            <button
              type="button"
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              className="group flex w-full items-center justify-between gap-3 text-left"
              aria-expanded={isExpanded}
            >
              <header className="flex items-baseline gap-3">
                <span data-num className="text-accent-warm/80 font-mono text-[11px] tracking-[0.32em] uppercase">
                  §{String(idx + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-fg-primary text-xl leading-tight md:text-2xl">
                  {section.title}
                </h4>
              </header>
              <span
                aria-hidden
                className={cn(
                  "text-fg-disabled inline-block font-mono text-[10px] transition-transform duration-200",
                  isExpanded ? "rotate-90" : "rotate-0",
                )}
              >
                ▸
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                height: { duration: reducedMotion ? 0 : 0.3, ease: PRODUCT_EASE },
                opacity: { duration: reducedMotion ? 0 : 0.2 },
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-3 pb-1">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-fg-secondary text-[15px] leading-[1.78] tracking-[0.01em]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

function SourcesBlock({ sources }: { sources: { label: string; url?: string }[] }) {
  return (
    <section className="border-fg-disabled/25 flex flex-col gap-3 border-t pt-6">
      <h3 className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
        sources · 引用
      </h3>
      <ul className="flex flex-col">
        {sources.map((src) => (
          <li
            key={src.label}
            className="border-fg-disabled/15 hover:border-fg-secondary/50 ease-product border-b transition-colors duration-200 last:border-b-0"
          >
            {src.url ? (
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-2.5"
              >
                <span className="text-fg-secondary group-hover:text-fg-primary ease-product text-[13px] transition-colors">
                  {src.label}
                </span>
                <ExternalLinkIcon className="text-fg-disabled group-hover:text-fg-secondary ease-product h-3 w-3 shrink-0 transition-colors" />
              </a>
            ) : (
              <span className="text-fg-muted block py-2.5 text-[13px]">{src.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DeepReadingBlock({
  data,
  reducedMotion,
}: {
  data: { introduction: string; sections: { title: string; content: string[] }[] };
  reducedMotion: boolean;
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="border-fg-disabled/25 flex flex-col gap-4 border-t pt-6">
      <div className="flex items-baseline gap-3">
        <h3 className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
          deep reading · 深度阅读
        </h3>
      </div>
      <p className="text-fg-secondary text-[14px] leading-[1.75]">
        {data.introduction}
      </p>
      <div className="flex flex-col gap-1">
        {data.sections.map((section, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={section.title}
              className="border-fg-disabled/15 border-b last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className="group flex w-full items-center justify-between gap-3 py-3 text-left"
                aria-expanded={isExpanded}
              >
                <span className="text-fg-primary text-[14px] font-medium tracking-wide">
                  {section.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "text-fg-disabled inline-block font-mono text-[10px] transition-transform duration-200",
                    isExpanded ? "rotate-90" : "rotate-0",
                  )}
                >
                  ▸
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{
                  height: { duration: reducedMotion ? 0 : 0.25, ease: PRODUCT_EASE },
                  opacity: { duration: reducedMotion ? 0 : 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2.5 pb-3">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-fg-secondary text-[14px] leading-[1.75]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Reveal({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reducedMotion ? 0 : 0.4, ease: PRODUCT_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function BookIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M2 2h4.5c.83 0 1.5.67 1.5 1.5V14l-1-.67L5.5 14 4 13.33 2.5 14 2 13.67V2z" />
      <path d="M14 2H9.5C8.67 2 8 2.67 8 3.5V14l1-.67 1.5.67 1.5-.67L13.5 14 14 13.67V2z" />
    </svg>
  );
}

function CloseIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M2 2 L10 10" />
      <path d="M10 2 L2 10" />
    </svg>
  );
}

function ExternalLinkIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path d="M5 2 H2 V10 H10 V7" />
      <path d="M7 2 H10 V5" />
      <path d="M5 7 L10 2" />
    </svg>
  );
}
