"use client";

import { motion } from "framer-motion";
import { PRODUCT_EASE } from "./constants";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: PRODUCT_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
