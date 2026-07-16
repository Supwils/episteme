import { BrandMark } from "@/subjects/physics/components/hud/BrandMark";

/**
 * Skeleton shown while WebGL support is being probed and while the 3D scene
 * mounts its first frame. Deep space is legitimately black once rendered, so
 * this only needs to cover the pre-paint gap — a centered fiducial mark plus a
 * quiet status line, animation gated behind prefers-reduced-motion.
 *
 * `overlay` positions it above an already-mounting <Canvas>; otherwise it owns
 * the skip-nav target so keyboard users land somewhere real during the probe.
 */
export function UniverseLoading({ overlay = false }: { overlay?: boolean }) {
  return (
    <div
      {...(overlay ? { "aria-hidden": true } : { id: "main-content", tabIndex: -1 })}
      role="status"
      aria-live="polite"
      className={`absolute inset-0 flex flex-col items-center justify-center gap-5 focus:outline-none ${
        overlay ? "pointer-events-none" : ""
      }`}
    >
      <BrandMark className="text-accent-cool h-12 w-12 motion-safe:animate-pulse" />
      <p className="text-fg-muted text-sm tracking-widest uppercase">正在进入宇宙…</p>
      <span className="sr-only">正在载入沉浸式三维场景</span>
    </div>
  );
}
