"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/src-physics/components/hud/BrandMark";
import { SplashStars } from "@/src-physics/components/splash/SplashStars";

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const SKIP_VISIBLE_AT_MS = 1100;
const AUTO_ADVANCE_AT_MS = 6400;

export default function HomePage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [skipReady, setSkipReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const skipTimer = setTimeout(() => setSkipReady(true), SKIP_VISIBLE_AT_MS);
    const advanceTimer = setTimeout(() => {
      router.push("/universe/observable");
    }, AUTO_ADVANCE_AT_MS);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(advanceTimer);
    };
  }, [reduce, router]);

  const handleEnter = () => router.push("/universe/observable");

  const d = (sec: number) => (reduce ? 0 : sec);

  return (
    <main className="bg-bg-deep relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      <div className="border-fg-disabled/40 absolute top-6 left-6 h-3 w-3 border-t border-l" />
      <div className="border-fg-disabled/40 absolute top-6 right-6 h-3 w-3 border-t border-r" />
      <div className="border-fg-disabled/40 absolute bottom-6 left-6 h-3 w-3 border-b border-l" />
      <div className="border-fg-disabled/40 absolute right-6 bottom-6 h-3 w-3 border-r border-b" />

      <motion.div
        className="text-fg-muted absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.42em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: d(2.8) }}
      >
        universe · physics / phase 0
      </motion.div>

      {!reduce && <SplashStars />}

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.62 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: d(2.2), ease: PRODUCT_EASE }}
        >
          <BrandMark className="text-accent-cool h-14 w-14" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(2.9), ease: PRODUCT_EASE }}
        >
          <h1 className="font-display text-fg-primary text-[2.6rem] leading-[1.05] tracking-tight md:text-[4.2rem]">
            在浏览器里
            <span className="italic">漫游宇宙</span>
          </h1>
          <p className="text-fg-secondary mx-auto max-w-md text-sm leading-relaxed md:text-base">
            一座可点击的尺度图集 —— 从可见宇宙的整体结构，一路下钻到宇宙纤维、超星系团、
            <br className="hidden md:block" />
            本星系群、太阳系，直到脚下这颗行星。
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(3.8) }}
          className="border-fg-disabled/60 text-fg-secondary hover:border-accent-warm hover:text-fg-primary ease-product group inline-flex cursor-pointer items-center gap-3 rounded-none border px-7 py-3 font-mono text-xs tracking-[0.32em] uppercase transition-colors duration-300"
        >
          enter the atlas
          <span
            aria-hidden
            className="ease-product transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.button>

        <motion.p
          className="text-fg-muted max-w-sm text-center font-mono text-[10px] leading-relaxed tracking-[0.22em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(4.2) }}
        >
          T0 · observable universe ⟶ T7 · earth · 8 scales · single canvas
        </motion.p>
      </div>

      {!reduce && (
        <motion.button
          type="button"
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: skipReady ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          aria-label="跳过 splash"
          className="text-fg-muted hover:text-fg-secondary absolute right-8 bottom-12 z-20 cursor-pointer font-mono text-[10px] tracking-[0.32em] uppercase transition-colors"
        >
          跳过 · skip →
        </motion.button>
      )}

      <footer className="text-fg-muted pointer-events-none absolute right-8 bottom-6 left-8 flex items-center justify-between font-mono text-[10px] tracking-[0.32em] uppercase">
        <span>scale atlas</span>
        <span>v.0.0.0</span>
      </footer>
    </main>
  );
}
