"use client";

import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace, type WebGLRenderer } from "three";
import { CameraRig } from "@/subjects/physics/camera/CameraRig";
import { FloatingViewControl } from "@/subjects/physics/components/hud/FloatingViewControl";
import { HudShell } from "@/subjects/physics/components/hud/HudShell";
import { KeyboardNav } from "@/subjects/physics/components/hud/KeyboardNav";
import { SkipLink } from "@/subjects/physics/components/hud/SkipLink";
import { TierAriaLive } from "@/subjects/physics/components/hud/TierAriaLive";
import { HoverTooltip } from "@/subjects/physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/subjects/physics/components/knowledge/KnowledgePanel";
import { PostFX } from "@/subjects/physics/components/post/PostFX";
import { isHandwrittenPath } from "@/subjects/physics/lib/tier";
import { startMonitoring, stopMonitoring } from "@/subjects/physics/lib/perf-monitor";
import { detectWebGLSupport } from "@/subjects/physics/lib/webgl-support";
import { ActiveScene } from "@/subjects/physics/scenes/ActiveScene";
import { useUiStore } from "@/subjects/physics/store/useUiStore";
import { UniverseFallback } from "./UniverseFallback";
import { UniverseLoading } from "./UniverseLoading";

/** "checking" until the client probe runs; "lost" if the GPU context drops. */
type GlStatus = "checking" | "ok" | "unsupported" | "lost";

function MotionPreferenceSync() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    useUiStore.getState().setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => useUiStore.getState().setReducedMotion(e.matches);
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

export function UniverseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [glStatus, setGlStatus] = useState<GlStatus>("checking");
  const [rendererReady, setRendererReady] = useState(false);

  // Probe WebGL on the client only. Server + first paint stay in "checking" so
  // hydration matches and no black canvas is ever shown to an unsupported device.
  useEffect(() => {
    setGlStatus(detectWebGLSupport() ? "ok" : "unsupported");
  }, []);

  const handleCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = SRGBColorSpace;
    // A runtime context loss (GPU reset / OOM) would otherwise freeze on a black
    // frame — swap to the handwritten fallback instead of restoring blindly.
    gl.domElement.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        setGlStatus("lost");
      },
      { once: true }
    );
    setRendererReady(true);
  }, []);

  // /universe/handwritten/* lives under this layout but renders its own
  // shell (SVG canvas + reused HUD). Bail out before mounting the WebGL
  // canvas so the 3D scene doesn't sit underneath the SVG.
  if (isHandwrittenPath(pathname)) {
    return <>{children}</>;
  }

  const unsupported = glStatus === "unsupported" || glStatus === "lost";

  return (
    <div
      data-section="universe"
      className="bg-bg-deep text-fg-primary relative h-dvh w-full overflow-hidden"
    >
      <MotionPreferenceSync />
      <SkipLink targetId="main-content" />

      {glStatus === "checking" && <UniverseLoading />}

      {unsupported && <UniverseFallback reason={glStatus === "lost" ? "lost" : "unsupported"} />}

      {glStatus === "ok" && (
        <>
          <PerfMonitorSync />
          <TierAriaLive />
          <Canvas
            id="main-content"
            tabIndex={-1}
            className="absolute inset-0 focus:outline-none"
            camera={{ position: [0, 0, 3], fov: 50, near: 0.01, far: 1000 }}
            dpr={[1, 2]}
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
            onCreated={handleCreated}
          >
            <color attach="background" args={["#000000"]} />
            <Suspense fallback={null}>
              <ActiveScene />
            </Suspense>
            <CameraRig />
            <PostFX />
          </Canvas>

          {!rendererReady && <UniverseLoading overlay />}

          <HoverTooltip />
          <HudShell />
          <KnowledgePanel />
          <FloatingViewControl />
          <KeyboardNav />
        </>
      )}

      {/* hidden — children are the per-tier route pages that just sync the store */}
      <div className="hidden">{children}</div>
    </div>
  );
}
