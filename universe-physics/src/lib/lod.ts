import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * LOD level selector based on camera distance.
 * Returns a detail level index (0 = highest detail) based on
 * the current camera distance relative to configured thresholds.
 *
 * Thresholds should be sorted ascending. The returned index maps to:
 *   0 — distance < thresholds[0]
 *   1 — thresholds[0] ≤ distance < thresholds[1]
 *   …
 *   N — distance ≥ thresholds[N-1]
 *
 * Runs inside the R3F render loop via useFrame so it never triggers
 * React re-renders; consumers read the ref directly.
 */
export function useLOD(thresholds: number[]): { readonly current: number } {
  const level = useRef(0);

  useFrame(({ camera }) => {
    const d = camera.position.length();
    let idx = 0;
    while (idx < thresholds.length && d >= thresholds[idx]!) {
      idx++;
    }
    level.current = idx;
  });

  return level;
}
