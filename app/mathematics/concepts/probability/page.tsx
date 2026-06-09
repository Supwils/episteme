import type { Metadata } from 'next';
import ProbabilityVisualizer from '@/subjects/mathematics/components/visualizations/ProbabilityVisualizer';

export const metadata: Metadata = {
  title: '概率可视化 — Universe Knowledge',
  description: '交互式概率模拟器——抛硬币、掷骰子、抽牌，观察大数定律如何让实验概率收敛到理论值',
};

export default function ProbabilityVisualizerPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / concepts / probability
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          概率<em className="text-accent-indigo italic"> 可视化</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          通过模拟抛硬币、掷骰子和抽牌，直观理解概率论的核心概念。
          观察大数定律如何让实验概率随试验次数增加而收敛到理论值。
        </p>
      </header>

      <ProbabilityVisualizer />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">
          关于大数定律
        </h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            大数定律（Law of Large Numbers）是概率论中最重要的定理之一。它指出：
            随着独立重复试验次数的增加，事件发生的频率趋向于其理论概率。
          </p>
          <p>
            这并不意味着&ldquo;小数定律&rdquo;成立——赌徒谬误（认为连续出现正面后反面更可能出现）就是对大数定律的误解。
            每次试验都是独立的，概率不会因为之前的结果而改变。
          </p>
        </div>
      </section>
    </div>
  );
}
