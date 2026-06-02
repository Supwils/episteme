"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTierTransition } from "@/src-physics/camera/useTierTransition";
import { hasContentForTier } from "@/content/universe-physics";
import { cn } from "@/src-physics/lib/cn";
import { formatScaleMeters } from "@/src-physics/lib/format";
import { getSectionConfig, getSectionFromPath, getSectionRoute } from "@/src-physics/lib/section";
import { isUniverseTierId, type AnyTierId } from "@/src-physics/lib/tier";
import { useHandwrittenTransition } from "@/src-physics/scenes-handwritten/useHandwrittenTransition";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

/**
 * Vertical scale ladder pinned to the right edge. Section-aware: the
 * list of tiers, their meta, and the matching route helper all come
 * from getSectionConfig, so universe and physics share one component.
 * In Physics the rail is segmented into 3 depth groups
 * (intuition / academic / frontier).
 */
export function TierRail() {
  const goTo3d = useTierTransition();
  const goToHw = useHandwrittenTransition();
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const section = getSectionFromPath(pathname);
  const cfg = getSectionConfig(section);
  const currentTier = useUniverseStore((state) => state.currentTier);
  const transitionActive = useUniverseStore((state) => state.transition.active);

  const universeIsHandwritten = pathname.startsWith("/universe/handwritten");

  const handleSelect = (id: AnyTierId) => {
    if (transitionActive || id === currentTier) return;
    if (section === "universe") {
      if (universeIsHandwritten) {
        goToHw(id);
      } else if (isUniverseTierId(id)) {
        router.push(getSectionRoute("universe", id, "3d"));
        goTo3d(id);
      }
    } else {
      // physics: handwritten-only view, no 3D camera move
      goToHw(id);
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
      aria-label="Scale ladder"
      className="hud-capsule pointer-events-auto absolute top-1/2 right-4 z-20 hidden w-14 -translate-y-1/2 flex-col items-stretch gap-2 px-1.5 py-4 md:right-6 md:flex"
    >
      <div className="hud-meta text-fg-muted px-1 text-center">
        {section === "universe" ? "scale" : "depth"}
      </div>

      <ol className="flex flex-col gap-1.5 px-1">
        {cfg.tierOrder.map((id, idx) => {
          const meta = cfg.tiers[id]!;
          const isActive = id === currentTier;
          const drillable = hasContentForTier(id);
          const groupLabel = section === "physics" ? physicsGroupLabel(idx) : null;
          return (
            <Fragment key={id}>
              {groupLabel ? (
                <li
                  aria-hidden
                  className="text-fg-muted mt-1.5 mb-0.5 px-1 text-center font-mono text-[8px] leading-none tracking-[0.28em] uppercase first:mt-0"
                >
                  <span className="bg-fg-disabled/40 mx-auto mb-1 block h-px w-4" />
                  {groupLabel}
                </li>
              ) : null}
              <li className="group relative flex items-center">
                <button
                  type="button"
                  onClick={() => handleSelect(id)}
                  disabled={transitionActive && isActive}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${meta.id} ${meta.label}`}
                  className={cn(
                    "ease-product relative flex w-full items-center gap-2 py-1.5 transition-opacity duration-200",
                    drillable ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50",
                  )}
                >
                  <span
                    className={cn(
                      "ease-product block h-px transition-all duration-300",
                      isActive
                        ? "bg-accent-warm w-8"
                        : "bg-fg-disabled group-hover:bg-fg-secondary w-3 group-hover:w-6",
                    )}
                  />
                  <span
                    data-num
                    className={cn(
                      "font-mono text-[10px] tracking-[0.18em] uppercase transition-colors",
                      isActive ? "text-fg-primary" : "text-fg-muted group-hover:text-fg-secondary",
                    )}
                  >
                    {id}
                  </span>
                </button>

                <span
                  className={cn(
                    "ease-product pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 text-right whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "opacity-100"
                      : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "font-display block text-sm leading-none",
                      isActive ? "text-fg-primary" : "text-fg-secondary",
                    )}
                  >
                    {meta.shortLabel}
                  </span>
                  <span
                    data-num
                    className="text-fg-muted mt-1 block font-mono text-[10px] tracking-[0.18em] uppercase"
                  >
                    {section === "universe" ? formatScaleMeters(meta.scaleMeters) : meta.unit}
                  </span>
                </span>
              </li>
            </Fragment>
          );
        })}
      </ol>

      <div className="hud-meta text-fg-muted px-1 text-center">
        {section === "universe" ? "↑ zoom" : "↑ depth"}
      </div>
    </motion.aside>
  );
}

/**
 * Physics depth groups: P0–P2 daily-life intuition, P3–P5 undergrad/grad
 * core, P6–P8 frontier research. Returns the header label when `idx`
 * starts a new group, otherwise null.
 */
function physicsGroupLabel(idx: number): string | null {
  if (idx === 0) return "intuition · 直觉";
  if (idx === 3) return "academic · 学院";
  if (idx === 6) return "frontier · 前沿";
  return null;
}
