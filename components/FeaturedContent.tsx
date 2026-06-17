"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FEATURED_CONTENT } from "../lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] as const } },
};

export function FeaturedContent() {
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
          精选内容
        </h2>
        <p className="text-fg-muted mb-10 text-center text-[0.88rem]">编辑推荐的知识探索入口</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={reduce ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {FEATURED_CONTENT.map((entry) => (
          <motion.div key={entry.id} variants={item}>
            <FeaturedItem item={entry} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function FeaturedItem({ item }: { item: (typeof FEATURED_CONTENT)[0] }) {
  return (
    <Link
      href={item.href}
      className="group block h-full rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 no-underline backdrop-blur-lg transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.05]"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg" style={{ color: item.domainColor }}>
          {item.icon}
        </span>
        <span className="text-[0.68rem] font-semibold" style={{ color: item.domainColor }}>
          {item.domain}
        </span>
      </div>
      <h3 className="text-fg-primary group-hover:text-accent-gold mb-1.5 text-[0.95rem] font-semibold transition-colors">
        {item.title}
      </h3>
      <p className="m-0 text-[0.82rem] leading-relaxed text-[#8b8fa3]">{item.description}</p>
    </Link>
  );
}
