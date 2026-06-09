"use client";

import type { ReactNode } from "react";
import { FloatingViewControl } from "@/subjects/physics/components/hud/FloatingViewControl";
import { KeyboardNav } from "@/subjects/physics/components/hud/KeyboardNav";
import { MobileTierStrip } from "@/subjects/physics/components/hud/MobileTierStrip";
import { PhysicsPager } from "@/subjects/physics/components/hud/PhysicsPager";
import { SkipLink } from "@/subjects/physics/components/hud/SkipLink";
import { SubjectCard } from "@/subjects/physics/components/hud/SubjectCard";
import { SwipePager } from "@/subjects/physics/components/hud/SwipePager";
import { TierAriaLive } from "@/subjects/physics/components/hud/TierAriaLive";
import { TierRail } from "@/subjects/physics/components/hud/TierRail";
import { TopBar } from "@/subjects/physics/components/hud/TopBar";
import { HoverTooltip } from "@/subjects/physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/subjects/physics/components/knowledge/KnowledgePanel";
import { TierDeepReadingPanel } from "@/subjects/physics/components/TierDeepReadingPanel";
import { HW_VIEWBOX_STRING } from "@/subjects/physics/lib/handwritten-coords";
import { ActivePhysicsHandwrittenScene } from "@/subjects/physics/scenes-handwritten/physics/ActivePhysicsHandwrittenScene";
import { HandwrittenDefs } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenDefs";
import { PaperBackground } from "@/subjects/physics/scenes-handwritten/shared/PaperBackground";
import { useHandwrittenStore } from "@/subjects/physics/store/useHandwrittenStore";

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
        <div className="pointer-events-none absolute bottom-16 left-0 right-0 flex justify-start px-5 pb-2 md:bottom-0 md:px-10 md:pb-10">
          <SubjectCard />
        </div>
        <PhysicsPager />
      </div>

      <HoverTooltip />
      <KnowledgePanel />
      <TierDeepReadingPanel />
      <FloatingViewControl />
      <KeyboardNav />
      <SwipePager />

      <div className="hidden">{children}</div>
    </div>
  );
}
