'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { FEATURED_CONTENT } from '../lib/data';

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
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-center text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #e8e8f0, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          精选内容
        </h2>
        <p className="text-center text-[0.88rem] text-[#9ca3af] mb-10">
          编辑推荐的知识探索入口
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={reduce ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
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

function FeaturedItem({
  item,
}: {
  item: (typeof FEATURED_CONTENT)[0];
}) {
  return (
    <Link
      href={item.href}
      className="group block p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-lg hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 no-underline h-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-lg"
          style={{ color: item.domainColor }}
        >
          {item.icon}
        </span>
        <span
          className="text-[0.68rem] font-semibold"
          style={{ color: item.domainColor }}
        >
          {item.domain}
        </span>
      </div>
      <h3 className="text-[0.95rem] font-semibold text-[#e8e8f0] mb-1.5 group-hover:text-[#818cf8] transition-colors">
        {item.title}
      </h3>
      <p className="text-[0.82rem] text-[#8b8fa3] leading-relaxed m-0">
        {item.description}
      </p>
    </Link>
  );
}
