"use client";

import React, { Suspense, useEffect, type ReactNode } from "react";
import {
  isUniverseTierId,
  nextTier,
  prevTier,
  type AnyTierId,
  type TransitionKind,
  type UniverseTierId,
} from "@/subjects/physics/lib/tier";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";

type SceneModule = {
  default: React.ComponentType<{ opacity?: number }>;
};

const SCENE_LOADERS: Record<UniverseTierId, () => Promise<SceneModule>> = {
  T0: () =>
    import("./tier0-observable/Tier0Scene").then((module) => ({ default: module.Tier0Scene })),
  T1: () =>
    import("./tier1-cosmic-web/Tier1Scene").then((module) => ({ default: module.Tier1Scene })),
  T2: () =>
    import("./tier2-supercluster/Tier2Scene").then((module) => ({ default: module.Tier2Scene })),
  T3: () =>
    import("./tier3-local-group/Tier3Scene").then((module) => ({ default: module.Tier3Scene })),
  T4: () =>
    import("./tier4-milky-way/Tier4Scene").then((module) => ({ default: module.Tier4Scene })),
  T5: () =>
    import("./tier5-stellar-neighborhood/Tier5Scene").then((module) => ({
      default: module.Tier5Scene,
    })),
  T6: () =>
    import("./tier6-solar-system/Tier6Scene").then((module) => ({ default: module.Tier6Scene })),
  T7: () => import("./tier7-earth/Tier7Scene").then((module) => ({ default: module.Tier7Scene })),
};

function loadScene(tier: UniverseTierId): Promise<SceneModule> {
  performance.mark(`universe:scene-load:${tier}`);
  return SCENE_LOADERS[tier]();
}

const SCENES: Record<UniverseTierId, React.LazyExoticComponent<SceneModule["default"]>> = {
  T0: React.lazy(() => loadScene("T0")),
  T1: React.lazy(() => loadScene("T1")),
  T2: React.lazy(() => loadScene("T2")),
  T3: React.lazy(() => loadScene("T3")),
  T4: React.lazy(() => loadScene("T4")),
  T5: React.lazy(() => loadScene("T5")),
  T6: React.lazy(() => loadScene("T6")),
  T7: React.lazy(() => loadScene("T7")),
};

export function preloadAdjacentUniverseScene(tier: UniverseTierId): void {
  const adjacentTier = nextTier(tier) ?? prevTier(tier);
  if (!adjacentTier) return;
  performance.mark(`universe:scene-preload:${adjacentTier}`);
  void SCENE_LOADERS[adjacentTier]().catch(() => {
    performance.mark(`universe:scene-preload-failed:${adjacentTier}`);
  });
}

function SceneReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
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
export function ActiveScene({
  initialTier,
  onSceneReady,
}: {
  initialTier: UniverseTierId;
  onSceneReady: () => void;
}) {
  const transition = useUniverseStore((state) => state.transition);
  const layers = sceneLayers(transition, initialTier);

  // One keyed Suspense per tier under a stable parent: when a dissolve ends,
  // the destination keeps its key and stays mounted instead of being torn
  // down and rebuilt because the tree shape changed.
  return (
    <>
      {layers.map((layer, index) => (
        <Suspense key={layer.tier} fallback={null}>
          {renderScene(layer.tier, layer.opacity)}
          {index === 0 ? <SceneReadySignal onReady={onSceneReady} /> : null}
        </Suspense>
      ))}
    </>
  );
}

type SceneLayer = { tier: AnyTierId; opacity: number };

type SceneTransition = {
  active: boolean;
  kind: TransitionKind | null;
  from: AnyTierId | null;
  to: AnyTierId | null;
  progress: number;
};

/** First layer is the one whose load marks the scene as ready. */
export function sceneLayers(
  transition: SceneTransition,
  initialTier: UniverseTierId
): SceneLayer[] {
  const { active, kind, from, to, progress } = transition;
  if (active && kind === "dissolve" && from && to && from !== to) {
    return [
      { tier: from, opacity: 1 - progress },
      { tier: to, opacity: progress },
    ];
  }
  if (active && from) return [{ tier: from, opacity: 1 }];
  return [{ tier: initialTier, opacity: 1 }];
}

function renderScene(tier: AnyTierId, opacity: number): ReactNode {
  if (!isUniverseTierId(tier)) return null;
  return renderUniverseScene(tier, opacity);
}

function renderUniverseScene(tier: UniverseTierId, opacity: number): ReactNode {
  const Scene = SCENES[tier];
  return <Scene key={tier} opacity={opacity} />;
}
