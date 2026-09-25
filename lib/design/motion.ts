"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { DURATION_MS } from "@/lib/design/motion-tokens";

export {
  DURATION_MS,
  EASE_INSTRUMENT,
  EASE_PAPER,
  ORCHESTRATED_MAX_MS,
} from "@/lib/design/motion-tokens";

export type MotionPreference = {
  /** 用户要求减少动效：动画直接落到终态，不做位移与淡入。 */
  reduced: boolean;
  /** 按偏好折算后的时长（秒，Framer Motion 与 GSAP 都用秒）；减少动效时为 0。 */
  duration: (speed: keyof typeof DURATION_MS) => number;
};

export function motionPreference(reduced: boolean): MotionPreference {
  return {
    reduced,
    duration: (speed) => (reduced ? 0 : DURATION_MS[speed] / 1000),
  };
}

/** 每个带动效的组件读这一个 hook，而不是各自查询 matchMedia。 */
export function useMotionPreference(): MotionPreference {
  return motionPreference(usePrefersReducedMotion());
}
