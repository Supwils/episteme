'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { LATEST_UPDATES } from '../lib/data';

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
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-center text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #e8e8f0, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          最新更新
        </h2>
        <p className="text-center text-[0.88rem] text-[#9ca3af] mb-10">
          近期新增的内容与功能
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        variants={reduce ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {LATEST_UPDATES.map((update) => (
          <motion.div key={update.id} variants={item}>
            <Link
              href={update.href}
              className="group block p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-lg hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 no-underline"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    color: update.domainColor,
                    background: `${update.domainColor}14`,
                    border: `1px solid ${update.domainColor}33`,
                  }}
                >
                  {update.domain}
                </span>
                <span className="text-[0.68rem] text-[#9ca3af]">{update.date}</span>
              </div>
              <h3 className="text-[0.95rem] font-semibold text-[#e8e8f0] mb-1.5 group-hover:text-[#818cf8] transition-colors">
                {update.title}
              </h3>
              <p className="text-[0.82rem] text-[#8b8fa3] leading-relaxed m-0">
                {update.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
