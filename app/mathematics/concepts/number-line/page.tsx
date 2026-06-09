import type { Metadata } from 'next';
import NumberLineConcepts from '@/subjects/mathematics/components/visualizations/NumberLineConcepts';

export const metadata: Metadata = {
  title: '数轴概念 — Universe Knowledge',
  description: '交互式数轴可视化——探索整数、有理数、无理数和特殊常数在数轴上的分布',
};

export default function NumberLineConceptsPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / concepts / number-line
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          数轴<em className="text-accent-indigo italic"> 概念</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          数轴是理解数系的基础工具。切换不同图层，观察整数、有理数、无理数和特殊常数如何分布在 -10 到 10 的数轴上。
          点击任意点查看其数学性质。
        </p>
      </header>

      <NumberLineConcepts />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">
          关于数系
        </h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            数学中的数系是逐步扩展的：从自然数 ℕ（计数）到整数 ℤ（加法逆元）到有理数 ℚ（除法逆元）
            到实数 ℝ（填补&ldquo;空隙&rdquo;）再到复数 ℂ（解所有多项式方程）。
          </p>
          <p>
            每次扩展都解决了一个核心问题：负数解决了&ldquo;3-5等于什么&rdquo;，无理数解决了&ldquo;√2是什么&rdquo;，
            虚数解决了&ldquo;x²=-1等于什么&rdquo;。数轴上的分布直观展示了这些数系之间的关系。
          </p>
        </div>
      </section>
    </div>
  );
}
