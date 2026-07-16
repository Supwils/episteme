import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSpecies, getSpeciesById } from "@/subjects/life-science/lib/species";
import { getDeepReading } from "@/subjects/life-science/lib/deep-reading";
import type { Species } from "@/subjects/life-science/lib/types";
import { DeepReading } from "@/subjects/life-science/components/DeepReading";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { FadeInSection } from "@/components/FadeInSection";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { CellExplorer } from "@/subjects/life-science/components/visualizations/CellExplorer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getSpeciesProse, type SpeciesProse } from "@/lib/species-prose";

type Props = { params: Promise<{ slug: string }> };

const ERA_ACCENT: Record<string, string> = {
  太古宙: "#e8a840",
  元古宙: "#c678dd",
  古生代: "#5a9ad8",
  中生代: "#98c379",
  新生代: "#c8a45a",
  第四纪: "#a88adf",
  全新世: "#d19a66",
};

function getAccent(species: Species): string {
  return ERA_ACCENT[species.era] ?? "#4a9e6f";
}

export function generateStaticParams() {
  return []; // ISR: render on first request + cache; skip build prerender to bound deploy file count
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesById(slug);
  const prose = getSpeciesProse(slug);
  if (!species && !prose) notFound();
  const name = species ? species.name : prose!.title;
  const nameEn = species ? species.nameEn : prose!.latinName;
  const description = species
    ? `${species.era} ${species.period}。${species.keyTraits.join("、")}`
    : `${prose!.category}。${prose!.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(name)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${name}（${nameEn}） — 生命科学`,
    description,
    openGraph: {
      title: `${name}（${nameEn}） — 生命科学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function SpeciesDetailPage({ params }: Props) {
  const { slug } = await params;
  const species = getSpeciesById(slug);
  const prose = getSpeciesProse(slug);
  if (!species && !prose) notFound();

  // Essay-only species (curated prose, no structured record yet) get a prose page.
  if (!species) return <SpeciesProsePage prose={prose!} slug={slug} />;

  const accent = getAccent(species);
  const allSpecies = getAllSpecies();
  const related = allSpecies
    .filter(
      (s) =>
        s.id !== species.id &&
        (s.era === species.era || s.taxonomy.phylum === species.taxonomy.phylum)
    )
    .slice(0, 6);
  const deepReading = getDeepReading(slug);

  const jsonLd = createArticleJsonLd({
    title: `${species.name}（${species.nameEn}）`,
    description: `${species.era} ${species.period}。${species.keyTraits.join("、")}`,
    url: `${SITE_URL}/life-science/species/${slug}`,
    keywords: [species.name, species.nameEn, species.era, species.period, ...species.keyTraits],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          <header className="mb-12">
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
              life-science / species
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  borderColor: `${accent}30`,
                  color: accent,
                  backgroundColor: `${accent}10`,
                }}
              >
                {species.era}
              </span>
              <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em]">
                {species.taxonomy.phylum ?? species.taxonomy.kingdom}
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase"
                style={{
                  color: species.extinct ? "var(--color-fg-disabled)" : "var(--color-success)",
                }}
              >
                {species.extinct ? "已灭绝" : "现存"}
              </span>
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {species.name}
            </h1>
            <p className="text-fg-muted mt-2 font-mono text-sm tracking-wider italic">
              {species.nameEn}
            </p>
          </header>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            <FactCard label="时代" value={species.era} accent={accent} />
            <FactCard label="时期" value={species.period} accent={accent} />
            <FactCard label="界" value={species.taxonomy.kingdom} accent={accent} />
            {species.taxonomy.phylum && (
              <FactCard label="门" value={species.taxonomy.phylum} accent={accent} />
            )}
            {species.taxonomy.class && (
              <FactCard label="纲" value={species.taxonomy.class} accent={accent} />
            )}
            {species.taxonomy.order && (
              <FactCard label="目" value={species.taxonomy.order} accent={accent} />
            )}
          </div>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="key-traits">
              关键特征
            </h2>
            <div className="flex flex-wrap gap-2">
              {species.keyTraits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.08em]"
                  style={{
                    borderColor: `${accent}25`,
                    color: `${accent}cc`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold" id="taxonomy">
              分类信息
            </h2>
            <div className="border-border-faint bg-bg-near border p-6">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TaxonomyEntry label="界" value={species.taxonomy.kingdom} />
                {species.taxonomy.phylum && (
                  <TaxonomyEntry label="门" value={species.taxonomy.phylum} />
                )}
                {species.taxonomy.class && (
                  <TaxonomyEntry label="纲" value={species.taxonomy.class} />
                )}
                {species.taxonomy.order && (
                  <TaxonomyEntry label="目" value={species.taxonomy.order} />
                )}
              </dl>
            </div>
          </FadeInSection>

          {["动物界", "植物界", "真菌界"].includes(species.taxonomy.kingdom) && (
            <FadeInSection className="mb-12">
              <h2
                className="font-display text-fg-primary mb-4 text-xl font-semibold"
                id="cell-structure"
              >
                细胞结构
              </h2>
              <div className="border-border-faint bg-bg-near border p-6">
                <CellExplorer />
              </div>
            </FadeInSection>
          )}

          {deepReading && <DeepReading {...deepReading} />}

          {prose && (
            <FadeInSection className="mb-12">
              <MarkdownRenderer
                domain="life-science"
                content={prose.content}
                accentColor={accent}
              />
            </FadeInSection>
          )}

          <SafeRender>
            <RelatedContent slug={slug} domain="life-science" entityId={slug} />
          </SafeRender>
        </article>

        <ArticleSidebar contentClassName="space-y-6">
          <TableOfContents accentColor="#4a9e6f" />
          <div className="border-border-faint bg-bg-near border p-5">
            <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
              相关物种
            </h3>
            <ul className="space-y-3" role="list">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/life-science/species/${r.id}`}
                    className="group flex items-start gap-3 text-sm transition-colors"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ERA_ACCENT[r.era] ?? "#4a9e6f" }}
                    />
                    <span>
                      <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                        {r.name}
                      </span>
                      <span className="text-fg-muted ml-1.5 font-mono text-[10px] italic">
                        {r.nameEn}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ArticleSidebar>
      </div>
    </div>
  );
}

function FactCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <dl className="border-border-faint bg-bg-near border p-4">
      <dt className="text-fg-muted mb-1 font-mono text-[9px] tracking-[0.22em] uppercase">
        {label}
      </dt>
      <dd className="font-display text-fg-primary text-sm font-medium" style={{ color: accent }}>
        {value}
      </dd>
    </dl>
  );
}

function TaxonomyEntry({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-fg-muted font-mono text-[9px] tracking-[0.22em] uppercase">{label}</dt>
      <dd className="text-fg-secondary mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

function SpeciesProsePage({ prose, slug }: { prose: SpeciesProse; slug: string }) {
  const accent = "#4a9e6f";
  const jsonLd = createArticleJsonLd({
    title: prose.titleEn ? `${prose.title}（${prose.titleEn}）` : prose.title,
    description: `${prose.category}。${prose.tags.join("、")}`,
    url: `${SITE_URL}/life-science/species/${slug}`,
    keywords: [prose.title, prose.titleEn, prose.latinName, prose.category, ...prose.tags].filter(
      (k): k is string => Boolean(k)
    ),
  });
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[900px] min-w-0 flex-1">
          <header className="mb-10">
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
              life-science / species
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  borderColor: `${accent}30`,
                  color: accent,
                  backgroundColor: `${accent}10`,
                }}
              >
                {prose.category}
              </span>
              {prose.era && (
                <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em]">
                  {prose.era}
                </span>
              )}
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {prose.title}
            </h1>
            {(prose.latinName || prose.titleEn) && (
              <p className="text-fg-muted mt-2 font-mono text-sm tracking-wider italic">
                {prose.latinName || prose.titleEn}
              </p>
            )}
          </header>

          <MarkdownRenderer domain="life-science" content={prose.content} accentColor={accent} />

          <SafeRender>
            <RelatedContent slug={slug} domain="life-science" entityId={slug} />
          </SafeRender>
        </article>

        <ArticleSidebar contentClassName="space-y-6">
          <TableOfContents accentColor={accent} />
        </ArticleSidebar>
      </div>
    </div>
  );
}
