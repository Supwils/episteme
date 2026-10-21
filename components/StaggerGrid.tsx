"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/animations";

// No useReducedMotion branch here: it is null on the server and true on the
// client, so the server's opacity:0 markup would hydrate into a variant-less
// element that never animates back. The root MotionConfig reducedMotion="user"
// already drops the movement and keeps only the fade for those readers.

export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={STAGGER_ITEM} className={className}>
      {children}
    </motion.div>
  );
}
