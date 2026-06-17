"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LATEST_UPDATES } from "../lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const } },
};

export function LatestUpdates() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 py-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-fg-primary mb-2 text-center text-2xl font-semibold">
          最新更新
        </h2>
        <p className="text-fg-muted mb-10 text-center text-[0.88rem]">近期新增的内容与功能</p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2"
        variants={reduce ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {LATEST_UPDATES.map((update) => (
          <motion.div key={update.id} variants={item}>
            <Link
              href={update.href}
              className="group block rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 no-underline backdrop-blur-lg transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.05]"
            >
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[0.68rem] font-semibold"
                  style={{
                    color: update.domainColor,
                    background: `${update.domainColor}14`,
                    border: `1px solid ${update.domainColor}33`,
                  }}
                >
                  {update.domain}
                </span>
                <span className="text-fg-muted text-[0.68rem]">{update.date}</span>
              </div>
              <h3 className="text-fg-primary group-hover:text-accent-gold mb-1.5 text-[0.95rem] font-semibold transition-colors">
                {update.title}
              </h3>
              <p className="m-0 text-[0.82rem] leading-relaxed text-[#8b8fa3]">
                {update.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
