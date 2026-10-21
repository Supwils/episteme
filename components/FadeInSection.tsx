"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FADE_IN_UP } from "@/lib/animations";

// Same element and variants on server and client: a useReducedMotion branch
// would swap <section> for <div> during hydration and strand the server's
// opacity:0. The root MotionConfig reducedMotion="user" handles those readers.
export function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
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
