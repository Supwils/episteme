import { HW_VIEWBOX } from "@/subjects/physics/lib/handwritten-coords";

/**
 * The base paper layer rendered first in every scene: solid background,
 * radial vignette, paper grain. Theme switching swaps the underlying
 * CSS variables — this layer doesn't need to know which theme is active.
 */
export function PaperBackground() {
  return (
    <g aria-hidden>
      <rect
        x={HW_VIEWBOX.x}
        y={HW_VIEWBOX.y}
        width={HW_VIEWBOX.w}
        height={HW_VIEWBOX.h}
        fill="var(--hw-bg)"
      />
      <rect
        x={HW_VIEWBOX.x}
        y={HW_VIEWBOX.y}
        width={HW_VIEWBOX.w}
        height={HW_VIEWBOX.h}
        fill="url(#hw-bg-vignette)"
        opacity={0.7}
      />
      <rect
        x={HW_VIEWBOX.x}
        y={HW_VIEWBOX.y}
        width={HW_VIEWBOX.w}
        height={HW_VIEWBOX.h}
        fill="url(#hw-paper)"
        opacity="var(--hw-paper-opacity)"
      />
    </g>
  );
}
