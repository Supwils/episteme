import type { Metadata } from 'next';
import Link from 'next/link';
import { hasTierContent, getTierContent, tierFromSlug, COSMOLOGY_TIER_ORDER, COSMOLOGY_TIER_ROUTES } from '@/subjects/cosmology/lib/tiers';
import { CosmologyNav } from '@/subjects/cosmology/components/CosmologyNav';

export function generateStaticParams() {
  return COSMOLOGY_TIER_ORDER.map((tierId) => ({ tier: COSMOLOGY_TIER_ROUTES[tierId] }));
}

export const metadata: Metadata = {
  title: '宇宙尺度 — 宇宙学 — Universe Knowledge',
  description: '探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球',
  openGraph: {
    title: '宇宙尺度 — 宇宙学',
    description: '探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球',
    type: 'website',
  },
};

export default async function CosmologyTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.tier;
  const tierId = tierFromSlug(slug);

  if (!tierId || !hasTierContent(tierId)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/20 text-8xl font-bold mb-4">404</p>
          <h2 className="text-2xl text-white mb-4">尺度层级未找到</h2>
          <Link href="/cosmology" className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors">
            返回宇宙学
          </Link>
        </div>
      </div>
    );
  }

  const content = getTierContent(tierId);
  const tierIndex = COSMOLOGY_TIER_ORDER.indexOf(tierId);
  const prevTier = tierIndex > 0 ? COSMOLOGY_TIER_ORDER[tierIndex - 1] : null;
  const nextTier = tierIndex < COSMOLOGY_TIER_ORDER.length - 1 ? COSMOLOGY_TIER_ORDER[tierIndex + 1] : null;

  return (
    <div className="min-h-screen px-6 sm:px-10 lg:px-16 py-12">
      <CosmologyNav />
      <nav className="mb-8">
        <Link href="/cosmology" className="text-sm text-[#3b82f6] hover:underline">
          ← 返回宇宙学
        </Link>
      </nav>

      <header className="mb-12">
        <p className="text-xs tracking-[0.32em] uppercase mb-2" style={{ color: '#3b82f6' }}>
          {content.tier}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {content.name.primary}
        </h1>
        <p className="text-lg text-[#a8adbd] italic">
          {content.name.latin}
        </p>
        <p className="text-base text-[#a8adbd] mt-2">{content.tagline}</p>
        {content.whisper && (
          <p className="text-sm text-[#9ca3af] mt-2 italic">&ldquo;{content.whisper}&rdquo;</p>
        )}
      </header>

      {content.dataCards.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">数据</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.dataCards.map((card, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-xs text-[#9ca3af] mb-1">
                  {card.label}
                  {card.latinLabel && <span className="ml-1 text-[#4b5563]">({card.latinLabel})</span>}
                </p>
                <p className="text-lg font-semibold">{card.value}</p>
                {card.hint && <p className="text-xs text-[#9ca3af] mt-1">{card.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.narrative.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">叙述</h2>
          <div className="space-y-8">
            {content.narrative.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-3">{section.heading}</h3>
                <div className="space-y-3">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-sm text-[#a8adbd] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.sources.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">参考来源</h2>
          <ul className="space-y-2">
            {content.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-[#9ca3af] mt-0.5">
                  {source.kind}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#3b82f6] hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="flex justify-between pt-8 border-t border-white/[0.06]">
        {prevTier ? (
          <Link
            href={`/cosmology/universe/${COSMOLOGY_TIER_ROUTES[prevTier]}`}
            className="text-sm text-[#3b82f6] hover:underline"
          >
            ← {COSMOLOGY_TIER_ROUTES[prevTier]}
          </Link>
        ) : <div />}
        {nextTier ? (
          <Link
            href={`/cosmology/universe/${COSMOLOGY_TIER_ROUTES[nextTier]}`}
            className="text-sm text-[#3b82f6] hover:underline"
          >
            {COSMOLOGY_TIER_ROUTES[nextTier]} →
          </Link>
        ) : <div />}
      </nav>
    </div>
  );
}
