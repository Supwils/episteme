"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/subjects/philosophy/lib/constants";

type Thinker = {
  name: string;
  latin: string;
  era: string;
  quote: string;
  accent: string;
};

type ThinkerCarouselProps = {
  thinkers: readonly Thinker[];
};

export function ThinkerCarousel({ thinkers }: ThinkerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="border-border-faint bg-bg-deep/80 text-fg-muted hover:text-accent-gold absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border backdrop-blur-sm transition-colors duration-200"
          aria-label="Scroll left"
        >
          ←
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="border-border-faint bg-bg-deep/80 text-fg-muted hover:text-accent-gold absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border backdrop-blur-sm transition-colors duration-200"
          aria-label="Scroll right"
        >
          →
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        role="list"
        aria-label="代表哲学家，可横向滚动"
        tabIndex={0}
      >
        {thinkers.map((thinker, i) => (
          <motion.div
            key={thinker.latin}
            className="min-w-[240px] shrink-0 snap-start"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1.6 + i * 0.1, ease: PRODUCT_EASE }}
            role="listitem"
          >
            <div className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-4 border p-5 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(200,164,90,0.1)]">
              <div className="flex items-start justify-between">
                <div
                  className="border-border-subtle font-display flex h-10 w-10 items-center justify-center border text-lg italic"
                  style={{ color: thinker.accent }}
                >
                  {thinker.name[0]}
                </div>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.2em]">
                  {thinker.era}
                </span>
              </div>
              <div>
                <h3 className="font-display text-fg-primary group-hover:text-accent-gold text-lg leading-snug font-semibold transition-colors duration-300">
                  {thinker.name}
                </h3>
                <p className="text-fg-muted font-mono text-[10px] tracking-wider italic">
                  {thinker.latin}
                </p>
              </div>
              <p className="text-fg-secondary text-sm leading-relaxed italic">
                &ldquo;{thinker.quote}&rdquo;
              </p>
              <span
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: thinker.accent }}
                aria-hidden
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
