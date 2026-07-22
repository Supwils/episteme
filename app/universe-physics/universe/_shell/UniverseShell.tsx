"use client";

import { usePathname } from "next/navigation";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { SkipLink } from "@/subjects/physics/components/hud/SkipLink";
import {
  isHandwrittenPath,
  tierFromPathname,
  type UniverseTierId,
} from "@/subjects/physics/lib/tier";
import { detectWebGLSupport } from "@/subjects/physics/lib/webgl-support";
import { UniverseFallback } from "./UniverseFallback";
import { UniverseLoading } from "./UniverseLoading";

/** "checking" until the client probe runs; "lost" if the GPU context drops. */
type GlStatus = "checking" | "ok" | "unsupported" | "lost";

const UniverseWebGL = lazy(() =>
  import("./UniverseWebGL").then((module) => ({ default: module.UniverseWebGL })),
);

export function UniverseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [glStatus, setGlStatus] = useState<GlStatus>("checking");

  // Probe WebGL on the client only. Server + first paint stay in "checking" so
  // hydration matches and no black canvas is ever shown to an unsupported device.
  useEffect(() => {
    setGlStatus(detectWebGLSupport() ? "ok" : "unsupported");
  }, []);

  // /universe/handwritten/* lives under this layout but renders its own
  // shell (SVG canvas + reused HUD). Bail out before mounting the WebGL
  // runtime component so the SVG route never requests the 3D entry chunk.
  if (isHandwrittenPath(pathname)) {
    return <>{children}</>;
  }

  const unsupported = glStatus === "unsupported" || glStatus === "lost";
  const routeTier = tierFromPathname(pathname) ?? ("T0" satisfies UniverseTierId);

  return (
    <div
      data-section="universe"
      data-webgl-status={glStatus}
      className="bg-bg-deep text-fg-primary relative h-dvh w-full overflow-hidden"
    >
      <SkipLink targetId="main-content" />

      {glStatus === "checking" && <UniverseLoading />}

      {unsupported && <UniverseFallback reason={glStatus === "lost" ? "lost" : "unsupported"} />}

      {glStatus === "ok" && (
        <Suspense fallback={<UniverseLoading overlay />}>
          <UniverseWebGL initialTier={routeTier} onContextLost={() => setGlStatus("lost")} />
        </Suspense>
      )}

      {/* hidden — children are the per-tier route pages that just sync the store */}
      <div className="hidden">{children}</div>
    </div>
  );
}
