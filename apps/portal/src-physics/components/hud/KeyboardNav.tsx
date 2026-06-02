"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { hasContentForTier } from "@/content/universe-physics";
import { getPhysicsPageCount, isPhysicsTierId } from "@/src-physics/lib/physics-tier";
import { getSectionConfig, getSectionFromPath, getSectionRoute } from "@/src-physics/lib/section";
import { isUniverseTierId, type AnyTierId } from "@/src-physics/lib/tier";
import { useTierTransition } from "@/src-physics/camera/useTierTransition";
import { useHandwrittenTransition } from "@/src-physics/scenes-handwritten/useHandwrittenTransition";
import { useUiStore } from "@/src-physics/store/useUiStore";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";
import { ShortcutOverlay } from "./ShortcutOverlay";

/**
 * Global keyboard navigation. Mounts a single window-level keydown
 * listener so users can drive the atlas without touching the mouse.
 *
 *   ← / →   physics page (when active tier has > 1 page)
 *   ↑ / ↓   tier change within current section
 *   o       open knowledge panel for current tier (if available)
 *   esc     close knowledge panel
 *
 * Input fields and contenteditable surfaces are ignored.
 */
export function KeyboardNav() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const goTo3d = useTierTransition();
  const goToHw = useHandwrittenTransition();

  const tier = useUniverseStore((s) => s.currentTier);
  const transitionActive = useUniverseStore((s) => s.transition.active);
  const page = useUniverseStore((s) => s.physicsPage);
  const setPage = useUniverseStore((s) => s.setPhysicsPage);
  const panelOpen = useUiStore((s) => s.panelOpen);
  const openPanel = useUiStore((s) => s.openPanel);
  const closePanel = useUiStore((s) => s.closePanel);

  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const closeShortcuts = useCallback(() => setShortcutsOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && isEditableTarget(target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const section = getSectionFromPath(pathname);
      const cfg = getSectionConfig(section);
      const universeIsHandwritten = pathname.startsWith("/universe/handwritten");

      if (e.key === "Escape") {
        if (shortcutsOpen) {
          e.preventDefault();
          setShortcutsOpen(false);
          return;
        }
        if (panelOpen) {
          e.preventDefault();
          closePanel();
        }
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
        return;
      }

      if (e.key === "o" || e.key === "O") {
        if (!panelOpen && hasContentForTier(tier)) {
          e.preventDefault();
          openPanel(tier);
        }
        return;
      }

      if (transitionActive) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (section === "physics" && isPhysicsTierId(tier)) {
          const total = getPhysicsPageCount(tier);
          if (total <= 1) return;
          const next = e.key === "ArrowRight" ? page + 1 : page - 1;
          if (next < 0 || next >= total) return;
          e.preventDefault();
          setPage(next);
        }
        return;
      }

      // Number keys 1–9 jump directly to that index within the current
      // section. Universe: 1→T0 ... 8→T7. Physics: 1→P0 ... 9→P8.
      if (e.key.length === 1 && e.key >= "1" && e.key <= "9") {
        const idx = Number(e.key) - 1;
        const target = cfg.tierOrder[idx];
        if (!target || target === tier || !hasContentForTier(target)) return;
        e.preventDefault();
        if (section === "universe") {
          if (universeIsHandwritten) {
            goToHw(target);
          } else if (isUniverseTierId(target)) {
            router.push(getSectionRoute("universe", target, "3d"));
            goTo3d(target);
          }
        } else {
          goToHw(target);
        }
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const idx = cfg.tierOrder.indexOf(tier);
        if (idx < 0) return;
        const step = e.key === "ArrowDown" ? 1 : -1;
        // Walk past disabled tiers (no content yet).
        let target: AnyTierId | null = null;
        for (let i = idx + step; i >= 0 && i < cfg.tierOrder.length; i += step) {
          const candidate = cfg.tierOrder[i]!;
          if (hasContentForTier(candidate)) {
            target = candidate;
            break;
          }
        }
        if (!target || target === tier) return;
        e.preventDefault();
        if (section === "universe") {
          if (universeIsHandwritten) {
            goToHw(target);
          } else if (isUniverseTierId(target)) {
            router.push(getSectionRoute("universe", target, "3d"));
            goTo3d(target);
          }
        } else {
          goToHw(target);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    pathname,
    tier,
    page,
    panelOpen,
    shortcutsOpen,
    transitionActive,
    setPage,
    openPanel,
    closePanel,
    goTo3d,
    goToHw,
    router,
  ]);

  return <ShortcutOverlay open={shortcutsOpen} onClose={closeShortcuts} />;
}

function isEditableTarget(el: HTMLElement): boolean {
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}
