'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const WhatIfNoColumbus = lazy(() => import('@/src-history/components/simulations/WhatIfNoColumbus'));
const WhatIfGreeceFalls = lazy(() => import('@/src-history/components/simulations/WhatIfGreeceFalls'));
const WhatIfPrintingNever = lazy(() => import('@/src-history/components/simulations/WhatIfPrintingNever'));
const WhatIfWWIAverted = lazy(() => import('@/src-history/components/simulations/WhatIfWWIAverted'));
const WhatIfInternetDelayed = lazy(() => import('@/src-history/components/simulations/WhatIfInternetDelayed'));

interface SimMeta {
  id: string;
  title: string;
  year: string;
  tagline: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const simulations: SimMeta[] = [
  {
    id: 'no-columbus',
    title: '如果没有哥伦布',
    year: '1492年',
    tagline: '大西洋仍是一道无人跨越的屏障',
    component: WhatIfNoColumbus,
  },
  {
    id: 'greece-falls',
    title: '如果希腊败于波斯',
    year: '公元前480年',
    tagline: '萨拉米斯海战的结局被改写',
    component: WhatIfGreeceFalls,
  },
  {
    id: 'printing-never',
    title: '如果没有印刷术',
    year: '1440年',
    tagline: '知识的传播仍依赖手抄本',
    component: WhatIfPrintingNever,
  },
  {
    id: 'wwi-averted',
    title: '如果一战没有发生',
    year: '1914年',
    tagline: '萨拉热窝的枪声从未响起',
    component: WhatIfWWIAverted,
  },
  {
    id: 'internet-delayed',
    title: '如果互联网推迟30年',
    year: '1990年',
    tagline: '万维网从未被发明',
    component: WhatIfInternetDelayed,
  },
];

function SimLoading() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--parchment-dim)' }}>
      加载中…
    </div>
  );
}

export default function SimulationsClient() {
  const searchParams = useSearchParams();
  const prefersReduced = useReducedMotion();
  const initialSim = searchParams.get('sim');
  const [activeSim, setActiveSim] = useState<string | null>(
    initialSim && simulations.some((s) => s.id === initialSim) ? initialSim : null
  );

  const activeMeta = activeSim ? simulations.find((s) => s.id === activeSim) : null;
  const yOffset = prefersReduced ? 0 : 16;

  return (
    <div className="sim-gallery">
      <AnimatePresence mode="wait">
        {!activeSim ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -yOffset }}
          >
            <header className="sim-gallery-header">
              <h1 className="sim-gallery-title">历史模拟：如果……</h1>
              <p className="sim-gallery-desc">
                探索历史的关键转折点。如果某个重大事件的结局被改写，世界将走向何方？
                选择一个场景，做出你的判断，观察历史的蝴蝶效应。
              </p>
            </header>

            <div className="sim-gallery-grid">
              {simulations.map((sim, i) => (
                <motion.button
                  key={sim.id}
                  className="sim-gallery-card"
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : i * 0.1 }}
                  whileHover={prefersReduced ? undefined : { scale: 1.02, y: -3 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  onClick={() => setActiveSim(sim.id)}
                >
                  <span className="sim-gallery-card-year">{sim.year}</span>
                  <h2 className="sim-gallery-card-title">{sim.title}</h2>
                  <p className="sim-gallery-card-tagline">{sim.tagline}</p>
                  <span className="sim-gallery-card-cta">开始模拟 →</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeSim}
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -yOffset }}
          >
            <div className="sim-gallery-nav">
              <button className="sim-btn-secondary" onClick={() => setActiveSim(null)}>
                ← 返回场景列表
              </button>
            </div>

            <Suspense fallback={<SimLoading />}>
              {activeMeta && <activeMeta.component />}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
