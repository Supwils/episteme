"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every framer-motion <motion.*> respect the OS
// "reduce motion" setting platform-wide: transform/layout animations snap to
// their final state while opacity/color still cross-fade. Satisfies the
// prefers-reduced-motion accessibility floor (docs/工程原则.md §2.6) without
// each visualization wiring up its own guard.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
