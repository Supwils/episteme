"use client";

import { lazy, Suspense, useEffect, type ReactNode } from "react";
import type { AnyTierId, UniverseTierId } from "@/lib/tier";
import { isUniverseTierId, TIER_ORDER } from "@/lib/tier";
import { useUniverseStore } from "@/store/useUniverseStore";

const SCENES: Record<UniverseTierId, ReturnType<typeof lazy>> = {
  T0: lazy(() => import("./tier0-observable/Tier0Scene").then((m) => ({ default: m.Tier0Scene }))),
  T1: lazy(() => import("./tier1-cosmic-web/Tier1Scene").then((m) => ({ default: m.Tier1Scene }))),
  T2: lazy(() =>
    import("./tier2-supercluster/Tier2Scene").then((m) => ({ default: m.Tier2Scene })),
  ),
  T3: lazy(() => import("./tier3-local-group/Tier3Scene").then((m) => ({ default: m.Tier3Scene }))),
  T4: lazy(() => import("./tier4-milky-way/Tier4Scene").then((m) => ({ default: m.Tier4Scene }))),
  T5: lazy(() =>
    import("./tier5-stellar-neighborhood/Tier5Scene").then((m) => ({ default: m.Tier5Scene })),
  ),
  T6: lazy(() =>
    import("./tier6-solar-system/Tier6Scene").then((m) => ({ default: m.Tier6Scene })),
  ),
  T7: lazy(() => import("./tier7-earth/Tier7Scene").then((m) => ({ default: m.Tier7Scene }))),
};

const SCENE_IMPORTS: Record<UniverseTierId, () => Promise<unknown>> = {
  T0: () => import("./tier0-observable/Tier0Scene"),
  T1: () => import("./tier1-cosmic-web/Tier1Scene"),
  T2: () => import("./tier2-supercluster/Tier2Scene"),
  T3: () => import("./tier3-local-group/Tier3Scene"),
  T4: () => import("./tier4-milky-way/Tier4Scene"),
  T5: () => import("./tier5-stellar-neighborhood/Tier5Scene"),
  T6: () => import("./tier6-solar-system/Tier6Scene"),
  T7: () => import("./tier7-earth/Tier7Scene"),
};

function SceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.015, 12, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </mesh>
  );
}

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

  useEffect(() => {
    if (!isUniverseTierId(currentTier)) return;
    const idx = TIER_ORDER.indexOf(currentTier);
    if (idx > 0) SCENE_IMPORTS[TIER_ORDER[idx - 1]!]();
    if (idx < TIER_ORDER.length - 1) SCENE_IMPORTS[TIER_ORDER[idx + 1]!]();
  }, [currentTier]);

  if (transition.active && transition.kind === "dissolve" && transition.from && transition.to) {
    return (
      <Suspense fallback={<SceneFallback />}>
        {renderScene(transition.from, 1 - transition.progress)}
        {renderScene(transition.to, transition.progress)}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<SceneFallback />}>
      {renderScene(currentTier, 1)}
    </Suspense>
  );
}

function renderScene(tier: AnyTierId, opacity: number): ReactNode {
  if (!isUniverseTierId(tier)) return null;
  return renderUniverseScene(tier, opacity);
}

function renderUniverseScene(tier: UniverseTierId, opacity: number): ReactNode {
  const Scene = SCENES[tier];
  return <Scene key={tier} opacity={opacity} />;
}
