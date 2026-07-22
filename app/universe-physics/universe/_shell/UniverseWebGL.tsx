"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
  type WebGLRenderer,
} from "three";
import { CameraRig } from "@/subjects/physics/camera/CameraRig";
import { FloatingViewControl } from "@/subjects/physics/components/hud/FloatingViewControl";
import { HudShell } from "@/subjects/physics/components/hud/HudShell";
import { KeyboardNav } from "@/subjects/physics/components/hud/KeyboardNav";
import { TierAriaLive } from "@/subjects/physics/components/hud/TierAriaLive";
import { HoverTooltip } from "@/subjects/physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/subjects/physics/components/knowledge/KnowledgePanel";
import { startMonitoring, stopMonitoring } from "@/subjects/physics/lib/perf-monitor";
import type { UniverseTierId } from "@/subjects/physics/lib/tier";
import {
  ActiveScene,
  preloadAdjacentUniverseScene,
} from "@/subjects/physics/scenes/ActiveScene";
import { useUiStore } from "@/subjects/physics/store/useUiStore";
import { UniverseLoading } from "./UniverseLoading";

const PostFX = lazy(() =>
  import("@/subjects/physics/components/post/PostFX").then((module) => ({
    default: module.PostFX,
  })),
);

type RendererSample = {
  fps: number;
  pixelRatio: number;
  geometries: number;
  textures: number;
};

type Props = {
  initialTier: UniverseTierId;
  onContextLost: () => void;
};

function MotionPreferenceSync() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    useUiStore.getState().setReducedMotion(mql.matches);
    const handler = (event: MediaQueryListEvent) => {
      useUiStore.getState().setReducedMotion(event.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return null;
}

function PerfMonitorSync() {
  useEffect(() => {
    startMonitoring();
    return stopMonitoring;
  }, []);
  return null;
}

function RendererSampler({ onSample }: { onSample: (sample: RendererSample) => void }) {
  const frameCount = useRef(0);
  const startedAt = useRef<number | null>(null);
  const sampled = useRef(false);

  useFrame(({ gl }) => {
    if (sampled.current) return;
    const now = performance.now();
    startedAt.current ??= now;
    frameCount.current += 1;
    if (frameCount.current < 90) return;

    const elapsedSeconds = Math.max((now - startedAt.current) / 1000, 0.001);
    sampled.current = true;
    onSample({
      fps: Math.round((frameCount.current / elapsedSeconds) * 10) / 10,
      pixelRatio: gl.getPixelRatio(),
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
    });
  });

  return null;
}

function scheduleIdleWork(callback: () => void): () => void {
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof idleWindow.requestIdleCallback === "function") {
    const id = idleWindow.requestIdleCallback(callback, { timeout: 1500 });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const id = globalThis.setTimeout(callback, 400);
  return () => globalThis.clearTimeout(id);
}

function shouldPreloadScene(): boolean {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return connection?.saveData !== true && !connection?.effectiveType?.includes("2g");
}

function PostFxReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export function UniverseWebGL({ initialTier, onContextLost }: Props) {
  const qualityTier = useUiStore((state) => state.qualityTier);
  const preloadedTier = useRef<UniverseTierId | null>(null);
  const [rendererReady, setRendererReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [postFxRequested, setPostFxRequested] = useState(false);
  const [postFxReady, setPostFxReady] = useState(false);
  const [sample, setSample] = useState<RendererSample | null>(null);

  useEffect(() => {
    if (!sceneReady) return;
    return scheduleIdleWork(() => {
      setPostFxRequested(true);
      if (
        qualityTier !== "low" &&
        preloadedTier.current !== initialTier &&
        shouldPreloadScene()
      ) {
        preloadedTier.current = initialTier;
        preloadAdjacentUniverseScene(initialTier);
      }
    });
  }, [initialTier, qualityTier, sceneReady]);

  const handleCreated = useCallback(
    ({ gl }: { gl: WebGLRenderer }) => {
      gl.toneMapping = ACESFilmicToneMapping;
      gl.toneMappingExposure = 1;
      gl.outputColorSpace = SRGBColorSpace;
      gl.domElement.addEventListener(
        "webglcontextlost",
        (event) => {
          event.preventDefault();
          onContextLost();
        },
        { once: true },
      );
      performance.mark("universe:renderer-ready");
      setRendererReady(true);
    },
    [onContextLost],
  );

  const handleSceneReady = useCallback(() => {
    performance.mark("universe:scene-ready");
    setSceneReady(true);
  }, []);

  const handlePostFxReady = useCallback(() => {
    performance.mark("universe:postfx-ready");
    setPostFxReady(true);
  }, []);

  const dpr: number | [number, number] =
    qualityTier === "low" ? 1 : qualityTier === "medium" ? [1, 1.5] : [1, 2];

  return (
    <div
      className="contents"
      data-universe-webgl
      data-route-tier={initialTier}
      data-quality-tier={qualityTier}
      data-renderer-ready={rendererReady}
      data-scene-ready={sceneReady}
      data-postfx-ready={postFxReady}
      data-renderer-fps={sample?.fps}
      data-renderer-pixel-ratio={sample?.pixelRatio}
      data-renderer-geometries={sample?.geometries}
      data-renderer-textures={sample?.textures}
    >
      <MotionPreferenceSync />
      <PerfMonitorSync />
      <TierAriaLive />
      <Canvas
        id="main-content"
        tabIndex={-1}
        className="absolute inset-0 focus:outline-none"
        camera={{ position: [0, 0, 3], fov: 50, near: 0.01, far: 1000 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={handleCreated}
      >
        <color attach="background" args={["#000000"]} />
        <ActiveScene initialTier={initialTier} onSceneReady={handleSceneReady} />
        <CameraRig />
        <RendererSampler onSample={setSample} />
        {postFxRequested ? (
          <Suspense fallback={null}>
            <PostFX />
            <PostFxReadySignal onReady={handlePostFxReady} />
          </Suspense>
        ) : null}
      </Canvas>

      {!sceneReady && <UniverseLoading overlay />}

      <HoverTooltip />
      <HudShell />
      <KnowledgePanel />
      <FloatingViewControl />
      <KeyboardNav />
    </div>
  );
}
