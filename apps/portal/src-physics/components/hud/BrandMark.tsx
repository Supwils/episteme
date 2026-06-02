import type { SVGAttributes } from "react";

/**
 * Fiducial mark — concentric circles + crosshair lines. The shape is
 * deliberately reminiscent of telescope reticles and lens-calibration
 * targets; it doubles as the project logo across HUD and splash.
 */
export function BrandMark(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      aria-hidden
      {...props}
    >
      <circle cx={16} cy={16} r={3.2} strokeWidth={0.8} />
      <circle cx={16} cy={16} r={9} opacity={0.55} />
      <circle cx={16} cy={16} r={14.4} opacity={0.22} />
      <line x1={16} y1={0.5} x2={16} y2={4.5} />
      <line x1={16} y1={27.5} x2={16} y2={31.5} />
      <line x1={0.5} y1={16} x2={4.5} y2={16} />
      <line x1={27.5} y1={16} x2={31.5} y2={16} />
      <circle cx={16} cy={16} r={0.7} fill="currentColor" stroke="none" />
    </svg>
  );
}
