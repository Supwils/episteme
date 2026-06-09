"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/src-physics/lib/cn";

type Side = "right" | "bottom";

type Props = {
  open: boolean;
  onClose: () => void;
  side?: Side;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const PRODUCT_EASE = [0.22, 0.61, 0.36, 1] as const;

export function Sheet({ open, onClose, side = "right", className, ariaLabel, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isRight = side === "right";

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="sheet-backdrop"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(
              "bg-bg-elevated border-fg-disabled/30 fixed z-50 overflow-y-auto",
              isRight
                ? "top-0 right-0 h-full w-full max-w-[420px] border-l"
                : "right-0 bottom-0 left-0 max-h-[60vh] border-t",
              className,
            )}
            initial={isRight ? { x: "100%" } : { y: "100%" }}
            animate={isRight ? { x: 0 } : { y: 0 }}
            exit={isRight ? { x: "100%" } : { y: "100%" }}
            transition={{ duration: 0.32, ease: PRODUCT_EASE }}
          >
            {children}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
