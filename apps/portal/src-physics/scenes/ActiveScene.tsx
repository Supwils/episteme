"use client";

import React, { Suspense, type ReactNode } from "react";
import type { AnyTierId, UniverseTierId } from "@/src-physics/lib/tier";
import { isUniverseTierId } from "@/src-physics/lib/tier";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

const Tier0Scene = React.lazy(() =>
  import("./tier0-observable/Tier0Scene").then((m) => ({ default: m.Tier0Scene }))
);
const Tier1Scene = React.lazy(() =>
  import("./tier1-cosmic-web/Tier1Scene").then((m) => ({ default: m.Tier1Scene }))
);
const Tier2Scene = React.lazy(() =>
  import("./tier2-supercluster/Tier2Scene").then((m) => ({ default: m.Tier2Scene }))
);
const Tier3Scene = React.lazy(() =>
  import("./tier3-local-group/Tier3Scene").then((m) => ({ default: m.Tier3Scene }))
);
const Tier4Scene = React.lazy(() =>
  import("./tier4-milky-way/Tier4Scene").then((m) => ({ default: m.Tier4Scene }))
);
const Tier5Scene = React.lazy(() =>
  import("./tier5-stellar-neighborhood/Tier5Scene").then((m) => ({ default: m.Tier5Scene }))
);
const Tier6Scene = React.lazy(() =>
  import("./tier6-solar-system/Tier6Scene").then((m) => ({ default: m.Tier6Scene }))
);
const Tier7Scene = React.lazy(() =>
  import("./tier7-earth/Tier7Scene").then((m) => ({ default: m.Tier7Scene }))
);

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
        <Suspense fallback={null}>{renderScene(transition.from, 1 - transition.progress)}</Suspense>
        <Suspense fallback={null}>{renderScene(transition.to, transition.progress)}</Suspense>
      </>
    );
  }

  return <Suspense fallback={null}>{renderScene(currentTier, 1)}</Suspense>;
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
