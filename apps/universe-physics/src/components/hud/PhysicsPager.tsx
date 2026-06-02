"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getPhysicsPageCount, isPhysicsTierId } from "@/lib/physics-tier";
import { useUniverseStore } from "@/store/useUniverseStore";

/**
 * Floating page selector for multi-page physics tiers. Renders nothing
 * when the active tier only has one page. Lives in the bottom-right so
 * it doesn't fight the SubjectCard for the bottom-left corner.
 */
export function PhysicsPager() {
  const tier = useUniverseStore((s) => s.currentTier);
  const page = useUniverseStore((s) => s.physicsPage);
  const setPage = useUniverseStore((s) => s.setPhysicsPage);

  if (!isPhysicsTierId(tier)) return null;
  const total = getPhysicsPageCount(tier);
  if (total <= 1) return null;

  const go = (target: number) => {
    if (target < 0 || target >= total || target === page) return;
    setPage(target);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      className="hud-capsule pointer-events-auto absolute right-3 bottom-20 z-30 flex items-center gap-3 px-3 py-2 md:right-10 md:bottom-10"
      role="navigation"
      aria-label="Physics tier pages"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="text-fg-secondary hover:text-fg-primary disabled:text-fg-disabled ease-product flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 disabled:cursor-not-allowed"
      >
        ‹
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Page ${i + 1}`}
            aria-current={i === page ? "page" : undefined}
            className={cn(
              "ease-product h-1.5 rounded-full transition-all duration-200",
              i === page ? "bg-accent-warm w-6" : "bg-fg-disabled hover:bg-fg-secondary w-1.5",
            )}
          />
        ))}
      </div>
      <span data-num className="hud-meta text-fg-muted ml-1">
        {page + 1} / {total}
      </span>
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === total - 1}
        aria-label="Next page"
        className="text-fg-secondary hover:text-fg-primary disabled:text-fg-disabled ease-product flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </motion.div>
  );
}
