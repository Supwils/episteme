"use client";

import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";
import * as THREE from "three";
import { CameraRig } from "@/src-physics/camera/CameraRig";
import { FloatingViewControl } from "@/src-physics/components/hud/FloatingViewControl";
import { HudShell } from "@/src-physics/components/hud/HudShell";
import { KeyboardNav } from "@/src-physics/components/hud/KeyboardNav";
import { SkipLink } from "@/src-physics/components/hud/SkipLink";
import { TierAriaLive } from "@/src-physics/components/hud/TierAriaLive";
import { HoverTooltip } from "@/src-physics/components/knowledge/HoverTooltip";
import { KnowledgePanel } from "@/src-physics/components/knowledge/KnowledgePanel";
import { PostFX } from "@/src-physics/components/post/PostFX";
import { isHandwrittenPath } from "@/src-physics/lib/tier";
import { startMonitoring, stopMonitoring } from "@/src-physics/lib/perf-monitor";
import { ActiveScene } from "@/src-physics/scenes/ActiveScene";
import { useUiStore } from "@/src-physics/store/useUiStore";

function onRendererCreated({ gl }: { gl: THREE.WebGLRenderer }) {
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.0;
  gl.outputColorSpace = THREE.SRGBColorSpace;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  );
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
  const degradationLevel = useUiStore((s) => s.degradationLevel);
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
        camera={{ position: [0, 0, 3], fov: 50, near: 0.01, far: 1000 }}
        dpr={degradationLevel >= 2 ? [1, 1.5] : [1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={onRendererCreated}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={<LoadingFallback />}>
          <ActiveScene />
        </Suspense>
        <CameraRig />
        <PostFX />
      </Canvas>

      <HoverTooltip />
      <HudShell />
      <KnowledgePanel />
      <FloatingViewControl />
      <KeyboardNav />

      <div className="hidden">{children}</div>
    </div>
  );
}
