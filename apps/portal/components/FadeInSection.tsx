"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { FADE_IN_UP } from "@/lib/animations";

export function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.section
      variants={FADE_IN_UP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
