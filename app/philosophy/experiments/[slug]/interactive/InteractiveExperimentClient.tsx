'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const TrolleyProblem = dynamic(() => import('@/src-philosophy/components/experiments/TrolleyProblem'));
const PlatosCave = dynamic(() => import('@/src-philosophy/components/experiments/PlatosCave'));
const ChineseRoom = dynamic(() => import('@/src-philosophy/components/experiments/ChineseRoom'));
const ExperienceMachine = dynamic(() => import('@/src-philosophy/components/experiments/ExperienceMachine'));
const VeilOfIgnorance = dynamic(() => import('@/src-philosophy/components/experiments/VeilOfIgnorance'));
const ShipOfTheseus = dynamic(() => import('@/src-philosophy/components/experiments/ShipOfTheseus'));
const BuridansAss = dynamic(() => import('@/src-philosophy/components/experiments/BuridansAss'));

const EXPERIMENT_MAP: Record<string, { component: React.ComponentType; title: string; titleEn: string }> = {
  'trolley-problem': { component: TrolleyProblem, title: '电车难题', titleEn: 'Trolley Problem' },
  'platos-cave': { component: PlatosCave, title: '洞穴比喻', titleEn: "Plato's Cave" },
  'chinese-room': { component: ChineseRoom, title: '中文房间', titleEn: 'Chinese Room' },
  'experience-machine': { component: ExperienceMachine, title: '体验机器', titleEn: 'Experience Machine' },
  'veil-of-ignorance': { component: VeilOfIgnorance, title: '无知之幕', titleEn: 'Veil of Ignorance' },
  'ship-of-theseus': { component: ShipOfTheseus, title: '忒修斯之船', titleEn: 'Ship of Theseus' },
  'buridans-ass': { component: BuridansAss, title: '布里丹之驴', titleEn: "Buridan's Ass" },
};

export default function InteractiveExperimentClient() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? EXPERIMENT_MAP[slug] : undefined;

  if (!entry) {
    return (
      <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 max-w-[1800px] mx-auto text-center">
        <p className="text-fg-muted font-mono text-sm">未找到该互动实验。</p>
        <Link
          href="/philosophy/experiments"
          className="text-accent-gold mt-4 inline-block font-mono text-xs tracking-wider uppercase"
        >
          ← 返回思想实验
        </Link>
      </div>
    );
  }

  const ExperimentComponent = entry.component;

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 max-w-[1800px] mx-auto">
      <Link
        href={`/philosophy/experiments/${slug}`}
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回实验详情
      </Link>

      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          interactive experiment
        </p>
        <h1 className="font-display text-fg-primary mb-1 text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          {entry.title}
        </h1>
        <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
          {entry.titleEn}
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <ExperimentComponent />
      </motion.div>
    </div>
  );
}
