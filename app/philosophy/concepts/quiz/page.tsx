import type { Metadata } from 'next';
import PhilosophyQuiz from '@/subjects/philosophy/components/visualizations/PhilosophyQuiz';

export const metadata: Metadata = {
  title: '哲学思想实验测试 — Universe Knowledge',
  description: '通过10个经典思想实验发现你的哲学立场——电车难题、忒修斯之船、缸中之脑等',
};

export default function PhilosophyQuizPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts / quiz
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          哲学<em className="text-accent-gold italic"> 测试</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          10个经典思想实验，探索你对伦理、身份、知识和正义的根本立场。
          没有正确答案——每个选择都揭示一种哲学传统。
        </p>
      </header>

      <PhilosophyQuiz />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">
          关于思想实验
        </h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            思想实验是哲学家最重要的工具之一。通过构造极端或简化的情境，思想实验帮助我们揭示隐藏的直觉、检验理论的一致性、
            以及探索概念的边界。
          </p>
          <p>
            这个测试涵盖了从古希腊到当代分析哲学的10个经典思想实验。每个问题都对应不同的哲学传统：
            功利主义、义务论、存在主义、现象学等。你的选择将揭示你最倾向的哲学立场。
          </p>
        </div>
      </section>
    </div>
  );
}
