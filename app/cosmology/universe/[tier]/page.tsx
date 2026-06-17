import type { Metadata } from "next";
import Link from "next/link";
import {
  hasTierContent,
  getTierContent,
  tierFromSlug,
  COSMOLOGY_TIER_ORDER,
  COSMOLOGY_TIER_ROUTES,
  COSMOLOGY_TIERS,
} from "@/subjects/cosmology/lib/tiers";

export function generateStaticParams() {
  return COSMOLOGY_TIER_ORDER.map((tierId) => ({ tier: COSMOLOGY_TIER_ROUTES[tierId] }));
}

export const metadata: Metadata = {
  title: "宇宙尺度 — 宇宙学 — Universe Knowledge",
  description: "探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球",
  openGraph: {
    title: "宇宙尺度 — 宇宙学",
    description: "探索不同宇宙尺度层级的结构与特征，从可观测宇宙到地球",
    type: "website",
  },
};

export default async function CosmologyTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.tier;
  const tierId = tierFromSlug(slug);

  if (!tierId || !hasTierContent(tierId)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-8xl font-bold text-white/20">404</p>
          <h2 className="mb-4 text-2xl text-white">尺度层级未找到</h2>
          <Link
            href="/cosmology"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20"
          >
            返回宇宙学
          </Link>
        </div>
      </div>
    );
  }

  const content = getTierContent(tierId);
  const tierIndex = COSMOLOGY_TIER_ORDER.indexOf(tierId);
  const prevTier = tierIndex > 0 ? COSMOLOGY_TIER_ORDER[tierIndex - 1] : null;
  const nextTier =
    tierIndex < COSMOLOGY_TIER_ORDER.length - 1 ? COSMOLOGY_TIER_ORDER[tierIndex + 1] : null;

  return (
    <div className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <nav className="mb-8">
        <Link href="/cosmology" className="text-sm text-[#3b82f6] hover:underline">
          ← 返回宇宙学
        </Link>
      </nav>

      <header className="mb-12">
        <p className="mb-2 text-xs tracking-[0.32em] uppercase" style={{ color: "#3b82f6" }}>
          {content.tier}
        </p>
        <h1
          className="mb-2 text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {content.name.primary}
        </h1>
        <p className="text-lg text-[#a8adbd] italic">{content.name.latin}</p>
        <p className="mt-2 text-base text-[#a8adbd]">{content.tagline}</p>
        {content.whisper && (
          <p className="mt-2 text-sm text-[#9ca3af] italic">&ldquo;{content.whisper}&rdquo;</p>
        )}
      </header>

      {/* Same scale exists as an interactive 3D scene in universe-physics. */}
      <Link
        href={`/universe-physics/universe/${slug}`}
        className="mb-12 flex items-center justify-between gap-4 rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] px-5 py-4 transition-colors hover:bg-[#3b82f6]/[0.12]"
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl">◉</span>
          <span>
            <span className="block text-sm font-semibold text-[#e8e8f0]">在 3D 中漫游这一尺度</span>
            <span className="block text-xs text-[#a8adbd]">
              同一层级的可交互三维场景（宇宙物理）
            </span>
          </span>
        </span>
        <span className="shrink-0 text-[#3b82f6]">→</span>
      </Link>

      {content.dataCards.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">数据</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {content.dataCards.map((card, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-1 text-xs text-[#9ca3af]">
                  {card.label}
                  {card.latinLabel && (
                    <span className="ml-1 text-[#4b5563]">({card.latinLabel})</span>
                  )}
                </p>
                <p className="text-lg font-semibold">{card.value}</p>
                {card.hint && <p className="mt-1 text-xs text-[#9ca3af]">{card.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.narrative.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">叙述</h2>
          <div className="space-y-8">
            {content.narrative.map((section, i) => (
              <div key={i}>
                <h3 className="mb-3 text-lg font-semibold">{section.heading}</h3>
                <div className="space-y-3">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-sm leading-relaxed text-[#a8adbd]">
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
          <h2 className="mb-4 text-xl font-bold">参考来源</h2>
          <ul className="space-y-2">
            {content.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 rounded bg-white/[0.06] px-2 py-0.5 text-xs text-[#9ca3af]">
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

      <nav className="flex justify-between border-t border-white/[0.06] pt-8">
        {prevTier ? (
          <Link
            href={`/cosmology/universe/${COSMOLOGY_TIER_ROUTES[prevTier]}`}
            className="text-sm text-[#3b82f6] hover:underline"
          >
            ← {COSMOLOGY_TIERS[prevTier].shortLabel}
          </Link>
        ) : (
          <div />
        )}
        {nextTier ? (
          <Link
            href={`/cosmology/universe/${COSMOLOGY_TIER_ROUTES[nextTier]}`}
            className="text-sm text-[#3b82f6] hover:underline"
          >
            {COSMOLOGY_TIERS[nextTier].shortLabel} →
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
