"use client";

import { MobileTierStrip } from "./MobileTierStrip";
import { SubjectCard } from "./SubjectCard";
import { TierRail } from "./TierRail";
import { TopBar } from "./TopBar";
import { TunnelOverlay } from "./TunnelOverlay";

/**
 * Floating HUD layer pinned above the Canvas. The canvas itself spans
 * the full viewport — every HUD element is its own floating island so
 * nothing clips the visual.
 *
 *   ┌─[brand]────────────────────[tier · frame]─┐
 *   │                                           │
 *   │                              ┌─────┐      │
 *   │                              │     │      │
 *   │                              │ T0  │      │  ← TierRail
 *   │                              │ T1  │      │     (floating)
 *   │                              │ ⋮   │      │
 *   │                              └─────┘      │
 *   │  ┌─────────────┐                          │
 *   │  │ SubjectCard │                          │
 *   │  └─────────────┘                          │
 *   └───────────────────────────────────────────┘
 */
export function HudShell() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-20">
        <TopBar />
        <TierRail />
        <MobileTierStrip />
        <div className="pointer-events-none absolute right-0 bottom-16 left-0 flex justify-start px-5 pb-2 md:bottom-0 md:px-10 md:pb-10">
          <SubjectCard />
        </div>
      </div>
      <TunnelOverlay />
    </>
  );
}
