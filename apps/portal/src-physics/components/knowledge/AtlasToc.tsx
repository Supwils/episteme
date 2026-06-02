"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src-physics/lib/cn";
import type { NarrativeSection } from "@/src-physics/lib/content";

type Props = {
  sections: NarrativeSection[];
  /** Element id prefix; ToC links scroll to `#${anchorPrefix}-${i}`. */
  anchorPrefix: string;
  /** Container the narrative sections live in (for scroll observation). */
  scrollContainer?: HTMLElement | null;
};

/**
 * Compact ToC chip strip pinned to the top of the atlas scroll area.
 * Highlights the currently-visible narrative section via IntersectionObserver
 * relative to the panel's scroll container. Click jumps with smooth scroll.
 */
export function AtlasToc({ sections, anchorPrefix, scrollContainer }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!scrollContainer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section closest to the top of the scroll container
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const idx = Number(visible.target.getAttribute("data-toc-idx"));
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { root: scrollContainer, rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((_, i) => {
      const el = document.getElementById(`${anchorPrefix}-${i}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections, anchorPrefix, scrollContainer]);

  const onJump = (i: number) => {
    const el = document.getElementById(`${anchorPrefix}-${i}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Show ToC only for tiers with substantial structure. 2-section tiers
  // don't benefit from in-page navigation; their second heading is
  // already visible as the user scrolls.
  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="Atlas table of contents"
      className="border-fg-disabled/25 bg-bg-deep/65 sticky top-0 z-[1] -mx-7 -mt-5 mb-3 flex flex-col gap-1.5 border-b px-7 py-3 backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-fg-muted shrink-0 font-mono text-[9px] tracking-[0.32em] uppercase">
          §
        </span>
        {sections.map((s, i) => (
          <button
            key={s.heading}
            type="button"
            onClick={() => onJump(i)}
            aria-current={i === active ? "true" : undefined}
            className={cn(
              "ease-product shrink-0 rounded-md px-2 py-1 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-150",
              i === active
                ? "bg-accent-warm/15 text-fg-primary"
                : "text-fg-muted hover:bg-bg-elevated/40 hover:text-fg-secondary",
            )}
            title={s.heading}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <div className="text-fg-secondary truncate text-[11px] leading-tight">
        {sections[active]?.heading}
      </div>
    </nav>
  );
}
