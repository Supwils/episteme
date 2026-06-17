"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/subjects/physics/components/hud/BrandMark";
import { SplashStars } from "@/subjects/physics/components/splash/SplashStars";
import { SITE_URL } from "@/lib/constants";

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Physics",
  url: `${SITE_URL}/universe-physics`,
  description:
    "From classical mechanics to quantum field theory — explore the fundamental laws governing the universe",
  isPartOf: {
    "@type": "WebSite",
    name: "Episteme · 格致",
    url: SITE_URL,
  },
};

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const SKIP_VISIBLE_AT_MS = 1100;
const AUTO_ADVANCE_AT_MS = 6400;

export default function PhysicsHomeClient() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [skipReady, setSkipReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const skipTimer = setTimeout(() => setSkipReady(true), SKIP_VISIBLE_AT_MS);
    const advanceTimer = setTimeout(() => {
      router.push("/universe-physics/physics/classical-mechanics");
    }, AUTO_ADVANCE_AT_MS);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(advanceTimer);
    };
  }, [reduce, router]);

  // The splash is about physics laws → enter the physics tiers (P0). The cosmic
  // 3D walker is a separate companion experience, offered as a secondary path.
  const handleEnter = () => router.push("/universe-physics/physics/classical-mechanics");

  const d = (sec: number) => (reduce ? 0 : sec);

  return (
    <main className="bg-bg-deep relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
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
        physics · fundamental laws / phase 0
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
            探索
            <span className="italic">基本定律</span>
          </h1>
          <p className="text-fg-secondary mx-auto max-w-md text-sm leading-relaxed md:text-base">
            从经典力学到量子场论，探索支配宇宙的物理定律 ——
            <br className="hidden md:block" />
            力学、电磁学、热力学、相对论与量子力学。
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
          enter physics
          <span
            aria-hidden
            className="ease-product transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => router.push("/universe-physics/universe/observable")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(4.0) }}
          className="text-fg-muted hover:text-fg-secondary ease-product -mt-2 cursor-pointer font-mono text-[10px] tracking-[0.28em] uppercase transition-colors duration-300"
        >
          或 · 宇宙尺度 3D 漫游 →
        </motion.button>

        <motion.p
          className="text-fg-muted max-w-sm text-center font-mono text-[10px] leading-relaxed tracking-[0.22em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: d(4.2) }}
        >
          P0 · classical mechanics ⟶ P8 · quantum field theory · 9 tiers · single canvas
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
        <span>physics atlas</span>
        <span>v.0.0.0</span>
      </footer>
    </main>
  );
}
