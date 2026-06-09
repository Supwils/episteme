import type { Metadata } from 'next';
import EthicsSpectrum from '@/subjects/philosophy/components/visualizations/EthicsSpectrum';

export const metadata: Metadata = {
  title: '伦理学光谱 — Universe Knowledge',
  description: '交互式伦理学理论光谱图，比较功利主义、义务论、美德伦理、关怀伦理、社会契约论与存在主义伦理',
};

export default function EthicsSpectrumPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          philosophy / concepts / ethics-spectrum
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          伦理学<em className="text-accent-gold italic"> 光谱</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          六大伦理学理论在「后果主义 vs 义务论」与「个人 vs 集体」两个维度上的定位。
          点击每个理论查看关键思想家、优势与局限，以及它们对电车难题的不同回答。
        </p>
      </header>

      <EthicsSpectrum />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">
          关于此图谱
        </h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            这张光谱图将六大伦理学理论放置在两个核心维度上：横向是「关注后果 vs 关注义务」，纵向是「关注个体 vs 关注集体」。
            每个理论的位置是近似的——许多理论跨越多个象限，这里展示的是它们的核心倾向。
          </p>
          <p>
            点击任意理论可以查看其关键思想家、核心优势与局限，以及该理论如何回应经典的「电车难题」。
            点击底部的「道德困境」按钮，可以同时比较所有理论对电车难题的回应。
          </p>
        </div>
      </section>
    </div>
  );
}
