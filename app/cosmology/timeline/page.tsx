import type { Metadata } from 'next';
import Link from 'next/link';
import { COSMOLOGY_ERAS } from '@/subjects/cosmology/lib/eras';
import { CosmologyNav } from '@/subjects/cosmology/components/CosmologyNav';
import { CosmicTimeline } from '@/subjects/cosmology/components/visualizations/CosmicTimeline';

export const metadata: Metadata = {
  title: '宇宙时间线 — 宇宙学 — Universe Knowledge',
  description: '从大爆炸到今天，138 亿年宇宙演化史的时间线',
  openGraph: {
    title: '宇宙时间线 — 宇宙学',
    description: '从大爆炸到今天，138 亿年宇宙演化史的时间线',
    type: 'website',
  },
};

export default function CosmologyTimelinePage() {
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
          Timeline
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          宇宙时间线
        </h1>
        <p className="text-lg text-[#a8adbd] max-w-2xl">
          从大爆炸到今天，138 亿年宇宙演化史的关键节点。
        </p>
      </header>

      <section className="mb-16">
        <CosmicTimeline />
      </section>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />
        <div className="space-y-8">
          {COSMOLOGY_ERAS.map((era) => (
            <div key={era.id} className="relative pl-12">
              <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-[#07070c]" />
              <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-xs text-[#3b82f6] mb-1">{era.timeRange}</p>
                <h2 className="text-xl font-bold mb-2">
                  {era.name.primary}
                  <span className="text-sm text-[#9ca3af] ml-2">{era.name.english}</span>
                </h2>
                <p className="text-sm text-[#a8adbd] leading-relaxed mb-4">{era.description}</p>
                <div className="flex flex-wrap gap-2">
                  {era.keyEvents.map((event, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-white/[0.04] text-[#9ca3af]"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
