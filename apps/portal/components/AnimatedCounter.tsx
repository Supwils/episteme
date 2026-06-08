"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  motion,
  useReducedMotion,
  animate,
} from "framer-motion";

export function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(motionVal, target, {
      duration: 1.4,
      ease: [0.22, 0.61, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, target, reduce, motionVal]);

  return (
    <motion.span ref={ref} aria-label={`${target}${suffix}`}>
      {display}
      {suffix}
    </motion.span>
  );
}
