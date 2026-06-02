"use client";

import type { ReactNode } from "react";
import { FloatingViewControl } from "@/components/hud/FloatingViewControl";
import { KeyboardNav } from "@/components/hud/KeyboardNav";
import { MobileTierStrip } from "@/components/hud/MobileTierStrip";
import { PhysicsPager } from "@/components/hud/PhysicsPager";
import { SkipLink } from "@/components/hud/SkipLink";
import { SubjectCard } from "@/components/hud/SubjectCard";
import { SwipePager } from "@/components/hud/SwipePager";
import { TierAriaLive } from "@/components/hud/TierAriaLive";
import { TierRail } from "@/components/hud/TierRail";
import { TopBar } from "@/components/hud/TopBar";
import { HoverTooltip } from "@/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { HW_VIEWBOX_STRING } from "@/lib/handwritten-coords";
import { ActivePhysicsHandwrittenScene } from "@/scenes-handwritten/physics/ActivePhysicsHandwrittenScene";
import { HandwrittenDefs } from "@/scenes-handwritten/shared/HandwrittenDefs";
import { PaperBackground } from "@/scenes-handwritten/shared/PaperBackground";
import { useHandwrittenStore } from "@/store/useHandwrittenStore";

/**
 * Physics section shell. SVG-only (no R3F canvas); reuses the universe
 * handwritten primitives + HUD by lifting them onto the SVG layer. The
 * FloatingViewControl reads section from pathname and adapts its
 * segments accordingly.
 */
export function PhysicsShell({ children }: { children: ReactNode }) {
  const theme = useHandwrittenStore((s) => s.theme);
  const palette = useHandwrittenStore((s) => s.physicsPalette);

  return (
    <div
      data-section="physics"
      data-hw-theme={theme}
      data-force-night={palette === "night" ? "true" : undefined}
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
        aria-label="Physics atlas scene"
      >
        <HandwrittenDefs />
        <PaperBackground />
        <ActivePhysicsHandwrittenScene />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-20">
        <TopBar />
        <TierRail />
        <MobileTierStrip />
        <div className="pointer-events-none absolute right-0 bottom-16 left-0 flex justify-start px-5 pb-2 md:bottom-0 md:px-10 md:pb-10">
          <SubjectCard />
        </div>
        <PhysicsPager />
      </div>

      <HoverTooltip />
      <KnowledgePanel />
      <FloatingViewControl />
      <KeyboardNav />
      <SwipePager />

      <div className="hidden">{children}</div>
    </div>
  );
}
