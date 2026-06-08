'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/src-physics/lib/cn';
import { LoadingSpinner } from '@universe/ui';

const experimentLoading = (
  <div className="flex h-96 items-center justify-center">
    <LoadingSpinner size="md" color="cool" />
  </div>
);

const MillersUrey = dynamic(() => import('@/src-physics/components/experiments/MillersUrey').then(m => m.MillersUrey), { ssr: false, loading: () => experimentLoading });
const DoubleSlit = dynamic(() => import('@/src-physics/components/experiments/DoubleSlit').then(m => m.DoubleSlit), { ssr: false, loading: () => experimentLoading });
const GalileosRamp = dynamic(() => import('@/src-physics/components/experiments/GalileosRamp').then(m => m.GalileosRamp), { ssr: false, loading: () => experimentLoading });
const RutherfordScattering = dynamic(() => import('@/src-physics/components/experiments/RutherfordScattering').then(m => m.RutherfordScattering), { ssr: false, loading: () => experimentLoading });
const CavendishExperiment = dynamic(() => import('@/src-physics/components/experiments/CavendishExperiment').then(m => m.CavendishExperiment), { ssr: false, loading: () => experimentLoading });
const PendulumWave = dynamic(() => import('@/src-physics/components/experiments/PendulumWave').then(m => m.PendulumWave), { ssr: false, loading: () => experimentLoading });
const BlackHoleAccretion = dynamic(() => import('@/src-physics/components/experiments/BlackHoleAccretion').then(m => m.BlackHoleAccretion), { ssr: false, loading: () => experimentLoading });
const WaveInterference = dynamic(() => import('@/src-physics/components/experiments/WaveInterference').then(m => m.WaveInterference), { ssr: false, loading: () => experimentLoading });
const ThermodynamicCycles = dynamic(() => import('@/src-physics/components/visualizations/ThermodynamicCycles').then(m => m.ThermodynamicCycles), { ssr: false, loading: () => experimentLoading });
const LensOptics = dynamic(() => import('@/src-physics/components/visualizations/LensOptics').then(m => m.LensOptics), { ssr: false, loading: () => experimentLoading });
const CircuitBuilder = dynamic(() => import('@/src-physics/components/visualizations/CircuitBuilder').then(m => m.CircuitBuilder), { ssr: false, loading: () => experimentLoading });

type Experiment = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  field: string;
  description: string;
  component: React.ComponentType;
};

const EXPERIMENTS: Experiment[] = [
  {
    id: 'miller-urey',
    title: '米勒-尤里实验',
    subtitle: '生命起源的化学基础',
    year: '1953',
    field: '化学 / 生物学',
    description: '在模拟原始地球条件下，无机物可以自发形成有机分子（氨基酸），为生命起源的化学进化论提供了实验依据。',
    component: MillersUrey,
  },
  {
    id: 'double-slit',
    title: '双缝实验',
    subtitle: '量子力学的核心实验',
    year: '1801',
    field: '量子力学',
    description: '单个粒子同时穿过两个缝产生干涉 pattern，但一旦观测，pattern 消失。观测行为本身改变了结果。',
    component: DoubleSlit,
  },
  {
    id: 'galileos-ramp',
    title: '伽利略斜面实验',
    subtitle: '运动学的开端',
    year: '1604',
    field: '经典力学',
    description: '球滚过的距离与时间的平方成正比（d ∝ t²），证明匀加速运动的存在，为牛顿运动定律奠基。',
    component: GalileosRamp,
  },
  {
    id: 'rutherford',
    title: '卢瑟福散射实验',
    subtitle: '发现原子核',
    year: '1911',
    field: '原子物理',
    description: '绝大多数α粒子穿过金箔，极少数被大角度反弹，证明原子内部大部分是空的，正电荷集中在极小的原子核中。',
    component: RutherfordScattering,
  },
  {
    id: 'cavendish',
    title: '卡文迪什扭秤实验',
    subtitle: '称量地球',
    year: '1798',
    field: '引力物理',
    description: '通过精密的扭秤测量两个已知质量之间的引力，首次计算出万有引力常数 G。',
    component: CavendishExperiment,
  },
  {
    id: 'pendulum-wave',
    title: '摆波实验',
    subtitle: '周期与同步之美',
    year: '1602',
    field: '波动力学',
    description: '15个长度递增的摆同时释放，因周期差异逐渐错开形成优美波动图案，展现简谐运动与同步现象。',
    component: PendulumWave,
  },
  {
    id: 'black-hole-accretion',
    title: '黑洞吸积盘',
    subtitle: '极端引力下的物质行为',
    year: '1971',
    field: '天体物理',
    description: '物质落入黑洞时因角动量守恒形成旋转吸积盘，内侧温度极高发出X射线，部分物质沿自转轴喷出形成相对论性喷流。',
    component: BlackHoleAccretion,
  },
  {
    id: 'wave-interference',
    title: '波的干涉实验',
    subtitle: '相长与相消干涉',
    year: '1801',
    field: '波动光学',
    description: '两个同频波源发出的波在空间中叠加，波峰相遇形成加强干涉，波峰与波谷相遇相互抵消形成暗纹。',
    component: WaveInterference,
  },
  {
    id: 'thermodynamic-cycles',
    title: '热力学循环',
    subtitle: '卡诺循环 PV 图',
    year: '1824',
    field: '热力学',
    description: '在 PV 图上展示卡诺循环的四个阶段：等温膨胀、绝热膨胀、等温压缩、绝热压缩。调节温度和体积比，观察热效率变化。',
    component: ThermodynamicCycles,
  },
  {
    id: 'lens-optics',
    title: '透镜光学',
    subtitle: '凸透镜与凹透镜成像',
    year: '1604',
    field: '光学',
    description: '交互式光线图，展示凸透镜和凹透镜的成像原理。移动物体、调节焦距，观察实像与虚像的形成过程。',
    component: LensOptics,
  },
  {
    id: 'circuit-builder',
    title: '电路搭建',
    subtitle: '欧姆定律实验',
    year: '1827',
    field: '电学',
    description: '搭建简单串联电路，添加电池和电阻，用欧姆定律计算电流和电压降。可视化各元件的电压分配。',
    component: CircuitBuilder,
  },
];

export default function ExperimentsClient() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const ActiveComponent = activeExperiment
    ? EXPERIMENTS.find((e) => e.id === activeExperiment)?.component
    : null;

  return (
    <div className="min-h-screen bg-bg-deep px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Sub-nav */}
        <nav className="mb-8 flex items-center justify-between">
          <Link
            href="/universe-physics/universe/observable"
            className="flex items-center gap-2 text-xs text-fg-muted transition-colors hover:text-fg-secondary"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            宇宙地图
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/universe-physics/universe/observable"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg-muted transition-colors hover:text-fg-secondary"
            >
              UNIVERSE
            </Link>
            <span className="text-fg-disabled">·</span>
            <Link
              href="/universe-physics/physics/classical-mechanics"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg-muted transition-colors hover:text-fg-secondary"
            >
              PHYSICS
            </Link>
            <span className="text-fg-disabled">·</span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-cool">
              EXPERIMENTS
            </span>
          </div>
        </nav>

        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-3xl font-semibold text-fg-primary sm:text-4xl">
            经典科学实验
          </h1>
          <p className="mt-3 text-sm text-fg-secondary sm:text-base">
            交互式动画重现改变世界的科学实验
          </p>
        </motion.div>

        {/* Experiment selector */}
        {!activeExperiment && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXPERIMENTS.map((exp, i) => (
              <motion.button
                key={exp.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.1 * i }}
                onClick={() => setActiveExperiment(exp.id)}
                className={cn(
                  'group rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-5 text-left transition-all duration-300',
                  'hover:border-accent-cool/40 hover:bg-bg-panel/80',
                  'focus-visible:ring-2 focus-visible:ring-accent-cool focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-accent-cool/10 px-2.5 py-0.5 text-xs text-accent-cool">
                    {exp.field}
                  </span>
                  <span className="font-mono text-xs text-fg-muted">{exp.year}</span>
                </div>
                <h3 className="text-lg font-medium text-fg-primary group-hover:text-accent-cool transition-colors">
                  {exp.title}
                </h3>
                <p className="mt-1 text-xs text-fg-muted">{exp.subtitle}</p>
                <p className="mt-3 text-sm text-fg-secondary leading-relaxed">
                  {exp.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-accent-cool opacity-0 transition-opacity group-hover:opacity-100">
                  点击体验
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Active experiment view */}
        <AnimatePresence mode="wait">
          {activeExperiment && ActiveComponent && (
            <motion.div
              key={activeExperiment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <button
                onClick={() => setActiveExperiment(null)}
                className="mb-6 flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                返回实验列表
              </button>

              {/* Experiment title */}
              <div className="mb-6">
                <h2 className="font-display text-2xl font-semibold text-fg-primary">
                  {EXPERIMENTS.find((e) => e.id === activeExperiment)?.title}
                </h2>
                <p className="mt-1 text-sm text-fg-secondary">
                  {EXPERIMENTS.find((e) => e.id === activeExperiment)?.description}
                </p>
              </div>

              {/* Experiment component */}
              <div className="rounded-2xl border border-fg-disabled/30 bg-bg-panel/30 p-4 sm:p-6">
                <ActiveComponent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
