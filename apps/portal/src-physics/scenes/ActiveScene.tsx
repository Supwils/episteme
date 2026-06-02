"use client";

import type { ReactNode } from "react";
import type { AnyTierId, UniverseTierId } from "@/src-physics/lib/tier";
import { isUniverseTierId } from "@/src-physics/lib/tier";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";
import { Tier0Scene } from "./tier0-observable/Tier0Scene";
import { Tier1Scene } from "./tier1-cosmic-web/Tier1Scene";
import { Tier2Scene } from "./tier2-supercluster/Tier2Scene";
import { Tier3Scene } from "./tier3-local-group/Tier3Scene";
import { Tier4Scene } from "./tier4-milky-way/Tier4Scene";
import { Tier5Scene } from "./tier5-stellar-neighborhood/Tier5Scene";
import { Tier6Scene } from "./tier6-solar-system/Tier6Scene";
import { Tier7Scene } from "./tier7-earth/Tier7Scene";

/**
 * Scene router with cross-fade support.
 *
 * Normal state: one scene at full opacity.
 * Dissolve transition: both `from` and `to` scenes mount with
 * complementary opacities derived from `transition.progress`. The
 * store updates progress ~60×/sec during the transition; React
 * reconciles the opacity prop but the heavy geometry is memoised so
 * only the materials' .opacity values actually mutate.
 */
export function ActiveScene() {
  const currentTier = useUniverseStore((state) => state.currentTier);
  const transition = useUniverseStore((state) => state.transition);

  if (transition.active && transition.kind === "dissolve" && transition.from && transition.to) {
    return (
      <>
        {renderScene(transition.from, 1 - transition.progress)}
        {renderScene(transition.to, transition.progress)}
      </>
    );
  }

  return renderScene(currentTier, 1);
}

function renderScene(tier: AnyTierId, opacity: number): ReactNode {
  if (!isUniverseTierId(tier)) return null;
  return renderUniverseScene(tier, opacity);
}

function renderUniverseScene(tier: UniverseTierId, opacity: number): ReactNode {
  switch (tier) {
    case "T0":
      return <Tier0Scene key={tier} opacity={opacity} />;
    case "T1":
      return <Tier1Scene key={tier} opacity={opacity} />;
    case "T2":
      return <Tier2Scene key={tier} opacity={opacity} />;
    case "T3":
      return <Tier3Scene key={tier} opacity={opacity} />;
    case "T4":
      return <Tier4Scene key={tier} opacity={opacity} />;
    case "T5":
      return <Tier5Scene key={tier} opacity={opacity} />;
    case "T6":
      return <Tier6Scene key={tier} opacity={opacity} />;
    case "T7":
      return <Tier7Scene key={tier} opacity={opacity} />;
    default:
      return null;
  }
}
