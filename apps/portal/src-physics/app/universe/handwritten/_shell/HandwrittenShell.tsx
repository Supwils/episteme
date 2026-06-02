"use client";

import type { ReactNode } from "react";
import { FloatingViewControl } from "@/src-physics/components/hud/FloatingViewControl";
import { KeyboardNav } from "@/src-physics/components/hud/KeyboardNav";
import { MobileTierStrip } from "@/src-physics/components/hud/MobileTierStrip";
import { HoverTooltip } from "@/src-physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/src-physics/components/knowledge/KnowledgePanel";
import { SkipLink } from "@/src-physics/components/hud/SkipLink";
import { SubjectCard } from "@/src-physics/components/hud/SubjectCard";
import { TierAriaLive } from "@/src-physics/components/hud/TierAriaLive";
import { TierRail } from "@/src-physics/components/hud/TierRail";
import { TopBar } from "@/src-physics/components/hud/TopBar";
import { HW_VIEWBOX_STRING } from "@/src-physics/lib/handwritten-coords";
import { ActiveHandwrittenScene } from "@/src-physics/scenes-handwritten/ActiveHandwrittenScene";
import { HandwrittenDefs } from "@/src-physics/scenes-handwritten/shared/HandwrittenDefs";
import { PaperBackground } from "@/src-physics/scenes-handwritten/shared/PaperBackground";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";
import { useHandwrittenStore } from "@/src-physics/store/useHandwrittenStore";

/**
 * Outer container for /universe/handwritten/*. Wraps the SVG canvas
 * with theme switching and re-uses the 3D version's HUD components by
 * absolute-positioning them on top. We do NOT mount HudShell directly
 * since that also renders TunnelOverlay, which is camera-coupled.
 */
export function HandwrittenShell({ children }: { children: ReactNode }) {
  const theme = useHandwrittenStore((s) => s.theme);
  const backdrop = useHandwrittenStore((s) => s.universeBackdrop);

  return (
    <div
      data-section="universe"
      data-hw-theme={theme}
      data-universe-backdrop={backdrop}
      className="relative h-dvh w-full overflow-hidden"
      style={{ background: "var(--hw-bg)", color: "var(--hw-ink)" }}
    >
      <SkipLink targetId="main-content" />
      <TierAriaLive />
      <svg
        id="main-content"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full focus:outline-none"
        viewBox={HW_VIEWBOX_STRING}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Handwritten universe scene"
      >
        <HandwrittenDefs />
        <PaperBackground />
        {/* Optional engineering-grid overlay. When active, the per-scene
           StarSpeck stays but recedes visually under the grid. */}
        {backdrop === "grid" ? <PaperGrid excludeInnerRadius={0} /> : null}
        <ActiveHandwrittenScene />
      </svg>

      {/* HUD layer — reuses 3D-version components as floating islands. */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <TopBar />
        <TierRail />
        <MobileTierStrip />
        <div className="pointer-events-none absolute right-0 bottom-16 left-0 flex justify-start px-5 pb-2 md:bottom-0 md:px-10 md:pb-10">
          <SubjectCard />
        </div>
      </div>

      <HoverTooltip />
      <KnowledgePanel />
      <FloatingViewControl />
      <KeyboardNav />

      {/* the route page components only call useSyncTier — keep them mounted */}
      <div className="hidden">{children}</div>
    </div>
  );
}
