"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { useTierTransition } from "@/camera/useTierTransition";
import { hasContentForTier } from "@/content";
import { cn } from "@/lib/cn";
import { getSectionConfig, getSectionFromPath, getSectionRoute } from "@/lib/section";
import { isUniverseTierId, type AnyTierId } from "@/lib/tier";
import { useHandwrittenTransition } from "@/scenes-handwritten/useHandwrittenTransition";
import { useUniverseStore } from "@/store/useUniverseStore";

/**
 * Mobile-only horizontal tier picker. Renders bottom-anchored under
 * SubjectCard on < md screens; on md+ the desktop TierRail handles it.
 */
export function MobileTierStrip() {
  const goTo3d = useTierTransition();
  const goToHw = useHandwrittenTransition();
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const section = getSectionFromPath(pathname);
  const cfg = getSectionConfig(section);
  const currentTier = useUniverseStore((s) => s.currentTier);
  const transitionActive = useUniverseStore((s) => s.transition.active);

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
      goToHw(id);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      aria-label="Tier picker"
      className="hud-capsule pointer-events-auto absolute right-3 bottom-3 left-3 z-20 flex items-center gap-1 overflow-x-auto px-2 py-2 md:hidden"
    >
      {cfg.tierOrder.map((id, idx) => {
        const isActive = id === currentTier;
        const drillable = hasContentForTier(id);
        const divider = section === "physics" ? physicsGroupDivider(idx) : null;
        return (
          <Fragment key={id}>
            {divider ? (
              <span className="flex shrink-0 items-center gap-1 px-0.5">
                <span aria-hidden className="bg-fg-disabled/40 h-3 w-px" />
                <span className="text-fg-disabled font-mono text-[8px] tracking-[0.3em] uppercase">
                  {divider}
                </span>
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => handleSelect(id)}
              disabled={transitionActive && isActive}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "ease-product shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-150",
                isActive
                  ? "bg-accent-warm/20 text-fg-primary"
                  : drillable
                    ? "text-fg-muted hover:bg-bg-elevated/40 hover:text-fg-secondary"
                    : "text-fg-disabled cursor-not-allowed opacity-50",
              )}
            >
              {id}
            </button>
          </Fragment>
        );
      })}
    </motion.nav>
  );
}

/** Inline group divider for the physics knowledge ladder. */
function physicsGroupDivider(idx: number): string | null {
  if (idx === 3) return "学院";
  if (idx === 6) return "前沿";
  return null;
}
