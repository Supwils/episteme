import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllDomains, getDomainById } from "@/subjects/life-science/lib/tree-data";
import { getSpeciesById } from "@/subjects/life-science/lib/species";
import { DeepReading } from "@/subjects/life-science/components/DeepReading";
import { FadeInSection } from "@/components/FadeInSection";

type Props = { params: Promise<{ domain: string }> };

export function generateStaticParams() {
  return getAllDomains().map((d) => ({ domain: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain: domainId } = await params;
  const domain = getDomainById(domainId);
  if (!domain) notFound();
  const description = domain.description;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(domain.name)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${domain.name}（${domain.nameEn}）— 生命之树`,
    description,
    openGraph: {
      title: `${domain.name}（${domain.nameEn}）— 生命之树`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function DomainDetailPage({ params }: Props) {
  const { domain: domainId } = await params;
  const domain = getDomainById(domainId);
  if (!domain) notFound();

  const allDomains = getAllDomains();
  const relatedDomains = allDomains.filter((d) => d.id !== domain.id);

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          <header className="mb-12">
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
              life-science / phylogenetic tree
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  borderColor: `${domain.accent}30`,
                  color: domain.accent,
                  backgroundColor: `${domain.accent}10`,
                }}
              >
                三域系统
              </span>
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {domain.name}
            </h1>
            <p className="text-fg-muted mt-2 font-mono text-sm tracking-wider italic">
              {domain.nameEn}
            </p>
            <p className="text-fg-secondary mt-4 max-w-2xl text-sm leading-relaxed">
              {domain.description}
            </p>
          </header>

          <FadeInSection className="mb-12">
            <h2
              className="font-display text-fg-primary mb-4 text-xl font-semibold"
              id="characteristics"
            >
              核心特征
            </h2>
            <ul className="space-y-3">
              {domain.characteristics.map((trait) => (
                <li key={trait} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: domain.accent }}
                  />
                  <span className="text-fg-secondary text-sm leading-relaxed">{trait}</span>
                </li>
              ))}
            </ul>
          </FadeInSection>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-6 text-xl font-semibold" id="key-phyla">
              主要门类
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {domain.keyPhyla.map((phylum) => (
                <div
                  key={phylum.nameEn}
                  className="border-border-faint bg-bg-near border p-5 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-fg-primary text-base font-semibold">
                      {phylum.name}
                    </h3>
                    <span className="text-fg-disabled font-mono text-[9px] italic">
                      {phylum.nameEn}
                    </span>
                  </div>
                  <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
                    {phylum.description}
                  </p>
                  {phylum.representativeSpeciesIds.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {phylum.representativeSpeciesIds.map((sid) => {
                        const sp = getSpeciesById(sid);
                        if (!sp) return null;
                        return (
                          <Link
                            key={sid}
                            href={`/life-science/species/${sid}`}
                            className="hover:border-accent-green hover:text-accent-green rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.12em] transition-colors"
                            style={{
                              borderColor: `${domain.accent}25`,
                              color: `${domain.accent}cc`,
                            }}
                          >
                            {sp.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeInSection>

          {domain.representativeSpeciesIds.length > 0 && (
            <FadeInSection className="mb-12">
              <h2
                className="font-display text-fg-primary mb-6 text-xl font-semibold"
                id="representative-species"
              >
                代表性物种
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {domain.representativeSpeciesIds.map((sid) => {
                  const sp = getSpeciesById(sid);
                  if (!sp) return null;
                  return (
                    <Link
                      key={sid}
                      href={`/life-science/species/${sid}`}
                      className="group border-border-faint bg-bg-near border p-5 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-display text-fg-primary group-hover:text-accent-green text-base font-semibold transition-colors duration-300">
                          {sp.name}
                        </h3>
                        <span className="text-fg-disabled font-mono text-[9px] italic">
                          {sp.nameEn}
                        </span>
                      </div>
                      <p className="text-fg-muted mb-2 font-mono text-[10px]">
                        {sp.era} · {sp.period}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sp.keyTraits.slice(0, 3).map((trait) => (
                          <span
                            key={trait}
                            className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.08em]"
                            style={{
                              borderColor: `${domain.accent}20`,
                              color: `${domain.accent}aa`,
                            }}
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </FadeInSection>
          )}

          <FadeInSection className="mb-12">
            <h2
              className="font-display text-fg-primary mb-4 text-xl font-semibold"
              id="evolutionary-significance"
            >
              演化意义
            </h2>
            <div
              className="border-border-faint bg-bg-near border p-6"
              style={{ borderLeftColor: domain.accent, borderLeftWidth: "3px" }}
            >
              <p className="text-fg-secondary text-sm leading-relaxed">
                {domain.evolutionarySignificance}
              </p>
            </div>
          </FadeInSection>

          <DeepReading {...domain.deepReading} />

          <div className="border-border-faint mt-16 flex items-center justify-between gap-4 border-t pt-8">
            <Link
              href="/life-science/tree"
              className="group flex items-center gap-2 text-sm transition-colors"
            >
              <span className="text-fg-muted group-hover:text-fg-secondary">←</span>
              <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                返回生命之树
              </span>
            </Link>
          </div>
        </article>

        <aside className="w-full flex-shrink-0 lg:w-80">
          <div className="sticky top-24 space-y-6">
            <nav className="border-border-faint bg-bg-near border p-5">
              <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
                页面导航
              </h3>
              <ul className="space-y-2" role="list">
                <li>
                  <a
                    href="#characteristics"
                    className="text-fg-secondary hover:text-accent-green text-sm transition-colors"
                  >
                    核心特征
                  </a>
                </li>
                <li>
                  <a
                    href="#key-phyla"
                    className="text-fg-secondary hover:text-accent-green text-sm transition-colors"
                  >
                    主要门类
                  </a>
                </li>
                {domain.representativeSpeciesIds.length > 0 && (
                  <li>
                    <a
                      href="#representative-species"
                      className="text-fg-secondary hover:text-accent-green text-sm transition-colors"
                    >
                      代表性物种
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="#evolutionary-significance"
                    className="text-fg-secondary hover:text-accent-green text-sm transition-colors"
                  >
                    演化意义
                  </a>
                </li>
                <li>
                  <a
                    href="#deep-reading"
                    className="text-fg-secondary hover:text-accent-green text-sm transition-colors"
                  >
                    深度阅读
                  </a>
                </li>
              </ul>
            </nav>

            <div className="border-border-faint bg-bg-near border p-5">
              <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
                三域系统
              </h3>
              <ul className="space-y-3" role="list">
                {relatedDomains.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/life-science/tree/${d.id}`}
                      className="group flex items-start gap-3 text-sm transition-colors"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: d.accent }}
                      />
                      <span>
                        <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                          {d.name}
                        </span>
                        <span className="text-fg-muted ml-1.5 font-mono text-[10px] italic">
                          {d.nameEn}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
