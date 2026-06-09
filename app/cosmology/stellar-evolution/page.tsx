import type { Metadata } from 'next';
import Link from 'next/link';
import { CosmologyNav } from '@/subjects/cosmology/components/CosmologyNav';
import { HRDiagram } from '@/subjects/cosmology/components/visualizations';

export const metadata: Metadata = {
  title: '恒星演化 — 宇宙学 — Universe Knowledge',
  description: '通过赫罗图探索恒星的生命周期：从主序星到红巨星、白矮星的演化路径',
  openGraph: {
    title: '恒星演化 — 宇宙学',
    description: '通过赫罗图探索恒星的生命周期',
    type: 'website',
  },
};

export default function StellarEvolutionPage() {
  return (
    <div className="min-h-screen px-6 sm:px-10 lg:px-16 py-12">
      <CosmologyNav />
      <nav className="mb-8">
        <Link href="/cosmology" className="text-sm text-[#3b82f6] hover:underline">
          ← 返回宇宙学
        </Link>
      </nav>

      <header className="mb-12">
        <p className="text-xs tracking-[0.32em] uppercase mb-4" style={{ color: '#3b82f6' }}>
          Stellar Evolution
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          恒星演化
        </h1>
        <p className="text-lg text-[#a8adbd] max-w-2xl">
          恒星的一生由质量决定。赫罗图（Hertzsprung-Russell Diagram）展示了恒星光度与表面温度的关系，
          揭示了主序星、红巨星、白矮星等不同演化阶段的分布规律。
        </p>
      </header>

      <section className="mb-16">
        <HRDiagram />
      </section>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">恒星演化阶段</h2>
        <div className="space-y-4">
          {[
            {
              title: '主序阶段',
              color: '#fbbf24',
              description:
                '恒星生命的大部分时间都在主序带上度过。在此阶段，核心的氢通过核聚变转化为氦，产生稳定的光和热。太阳已在主序上燃烧约 46 亿年。',
            },
            {
              title: '红巨星阶段',
              color: '#ef4444',
              description:
                '当核心氢耗尽后，恒星外壳膨胀、表面温度降低，成为红巨星。太阳约 50 亿年后将膨胀为红巨星，届时可能吞没地球轨道。',
            },
            {
              title: '白矮星阶段',
              color: '#6b7280',
              description:
                '中低质量恒星（约 8 倍太阳质量以下）的最终归宿。外层物质被抛射形成行星状星云，留下致密的碳氧核心，逐渐冷却变暗。',
            },
            {
              title: '超巨星与超新星',
              color: '#a855f7',
              description:
                '大质量恒星（>8 倍太阳质量）会演化为超巨星，核心通过硅聚变形成铁。当铁核质量超过钱德拉塞卡极限时，引发超新星爆发，留下中子星或黑洞。',
            },
          ].map((stage) => (
            <div
              key={stage.title}
              className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <h3 className="text-lg font-semibold mb-2">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
                  style={{ backgroundColor: stage.color }}
                />
                {stage.title}
              </h3>
              <p className="text-sm text-[#a8adbd] leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
