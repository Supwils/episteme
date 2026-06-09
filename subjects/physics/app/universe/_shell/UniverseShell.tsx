"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace, type WebGLRenderer } from "three";
import { CameraRig } from "@/subjects/physics/camera/CameraRig";
import { FloatingViewControl } from "@/subjects/physics/components/hud/FloatingViewControl";
import { HudShell } from "@/subjects/physics/components/hud/HudShell";
import { KeyboardNav } from "@/subjects/physics/components/hud/KeyboardNav";
import { SkipLink } from "@/subjects/physics/components/hud/SkipLink";
import { TierAriaLive } from "@/subjects/physics/components/hud/TierAriaLive";
import { HoverTooltip } from "@/subjects/physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/subjects/physics/components/knowledge/KnowledgePanel";
import { TierDeepReadingPanel } from "@/subjects/physics/components/TierDeepReadingPanel";
import { PostFX } from "@/subjects/physics/components/post/PostFX";
import { isHandwrittenPath } from "@/subjects/physics/lib/tier";
import { startMonitoring, stopMonitoring } from "@/subjects/physics/lib/perf-monitor";
import { ActiveScene } from "@/subjects/physics/scenes/ActiveScene";
import { useUiStore } from "@/subjects/physics/store/useUiStore";

function onRendererCreated({ gl }: { gl: WebGLRenderer }) {
  gl.toneMapping = ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.0;
  gl.outputColorSpace = SRGBColorSpace;
}

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
  // /universe/handwritten/* lives under this layout but renders its own
  // shell (SVG canvas + reused HUD). Bail out before mounting the WebGL
  // canvas so the 3D scene doesn't sit underneath the SVG.
  if (isHandwrittenPath(pathname)) {
    return <>{children}</>;
  }

  return (
    <div
      data-section="universe"
      className="bg-bg-deep text-fg-primary relative h-dvh w-full overflow-hidden"
    >
      <MotionPreferenceSync />
      <PerfMonitorSync />
      <SkipLink targetId="main-content" />
      <TierAriaLive />
      <Canvas
        id="main-content"
        tabIndex={-1}
        className="absolute inset-0 focus:outline-none"
        style={{ background: "#000000" }}
        camera={{ position: [0, 0, 3], fov: 50, near: 0.01, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={onRendererCreated}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <ActiveScene />
        </Suspense>
        <CameraRig />
        <PostFX />
        <Preload all />
      </Canvas>

      <HoverTooltip />
      <HudShell />
      <KnowledgePanel />
      <TierDeepReadingPanel />
      <FloatingViewControl />
      <KeyboardNav />

      {/* hidden — children are the per-tier route pages that just sync the store */}
      <div className="hidden">{children}</div>
    </div>
  );
}
