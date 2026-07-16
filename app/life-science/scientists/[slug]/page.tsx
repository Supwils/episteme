import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllScientists, getScientistById } from "@/subjects/life-science/lib/scientists";
import { getScientistArticleBody } from "@/subjects/life-science/lib/scientist-article";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import type { Scientist } from "@/subjects/life-science/lib/types";
import { FadeInSection } from "@/components/FadeInSection";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createPersonJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleSidebar } from "@/components/ArticleSidebar";

type Props = { params: Promise<{ slug: string }> };

const SUPPLEMENT: Record<string, { quote: string; latin: string; accent: string }> = {
  darwin: {
    quote: "能够生存下来的物种，不是最强壮的，也不是最聪明的，而是最能适应变化的。",
    latin: "Charles Darwin",
    accent: "#4a9e6f",
  },
  wallace: {
    quote: "大自然的每一个角落都充满了奇迹。",
    latin: "Alfred Russel Wallace",
    accent: "#4a9e6f",
  },
  mendel: { quote: "我的时代会到来的。", latin: "Gregor Mendel", accent: "#c8a45a" },
  huxley: {
    quote: "人类在自然界中的位置，是所有问题中最重要的。",
    latin: "Thomas Henry Huxley",
    accent: "#4a9e6f",
  },
  lyell: {
    quote: "地球的历史只能用地球本身的力量来解释。",
    latin: "Charles Lyell",
    accent: "#8b5e3c",
  },
  margulis: {
    quote: "生命不是通过战斗征服地球的，而是通过结网。",
    latin: "Lynn Margulis",
    accent: "#c678dd",
  },
  watson: { quote: "我们发现了生命的秘密。", latin: "James Watson", accent: "#5a9ad8" },
  crick: { quote: "上帝假说是检验其他假说的试金石。", latin: "Francis Crick", accent: "#5a9ad8" },
  gould: { quote: "进化不是'进步'的同义词。", latin: "Stephen Jay Gould", accent: "#e8a840" },
  dawkins: { quote: "我们是基因制造的生存机器。", latin: "Richard Dawkins", accent: "#e8a840" },
  woese: { quote: "进化的本质不是竞争，而是合作。", latin: "Carl Woese", accent: "#c678dd" },
  oparin: {
    quote: "生命是从非生命物质中自然产生的。",
    latin: "Alexander Oparin",
    accent: "#c678dd",
  },
  muller: { quote: "突变是进化的原材料。", latin: "Hermann Muller", accent: "#e06c75" },
  hamilton: {
    quote: "利他行为可以用基因的广义适合度来解释。",
    latin: "William Hamilton",
    accent: "#98c379",
  },
  "wozniak-olson": {
    quote: "如果我们拯救了生物多样性，也就拯救了我们自己。",
    latin: "Edward O. Wilson",
    accent: "#98c379",
  },
};

function getSupp(s: Scientist) {
  return SUPPLEMENT[s.id] ?? { quote: "", latin: s.nameEn, accent: "#4a9e6f" };
}

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scientist = getScientistById(slug);
  if (!scientist) notFound();
  const supp = getSupp(scientist);
  const description = `${scientist.field}。${scientist.keyContribution}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(scientist.name)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${scientist.name}（${supp.latin}） — 生命科学`,
    description,
    openGraph: {
      title: `${scientist.name}（${supp.latin}） — 生命科学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ScientistDetailPage({ params }: Props) {
  const { slug } = await params;
  const scientist = getScientistById(slug);
  if (!scientist) notFound();

  const supp = getSupp(scientist);
  const articleBody = getScientistArticleBody(scientist.id);
  const allScientists = getAllScientists();
  const related = allScientists
    .filter(
      (s) => s.id !== scientist.id && (s.era === scientist.era || s.field === scientist.field)
    )
    .slice(0, 6);

  const lifespan = scientist.deathYear
    ? `${scientist.birthYear}—${scientist.deathYear}`
    : `${scientist.birthYear}—至今`;

  const jsonLd = createPersonJsonLd({
    name: scientist.name,
    description: `${scientist.field}。${scientist.keyContribution}`,
    url: `${SITE_URL}/life-science/scientists/${slug}`,
    birthDate: `${scientist.birthYear}`,
    deathDate: scientist.deathYear ? `${scientist.deathYear}` : undefined,
    jobTitle: scientist.field,
    knowsAbout: [scientist.field, scientist.famousWork],
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
              life-science / scientists
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  borderColor: `${supp.accent}30`,
                  color: supp.accent,
                  backgroundColor: `${supp.accent}10`,
                }}
              >
                {scientist.field}
              </span>
              <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em]">
                {scientist.era}
              </span>
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {scientist.name}
            </h1>
            <p className="text-fg-muted mt-2 font-mono text-sm tracking-wider italic">
              {supp.latin}
            </p>
            <p className="text-fg-disabled mt-1 font-mono text-[11px] tracking-[0.18em]">
              {lifespan}
            </p>
          </header>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            <FactCard label="领域" value={scientist.field} accent={supp.accent} />
            <FactCard label="时代" value={scientist.era} accent={supp.accent} />
            <FactCard label="生卒" value={lifespan} accent={supp.accent} />
          </div>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold">核心贡献</h2>
            <p className="text-fg-secondary leading-relaxed">{scientist.keyContribution}</p>
          </FadeInSection>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold">代表著作</h2>
            <p className="text-fg-secondary leading-relaxed">{scientist.famousWork}</p>
          </FadeInSection>

          {articleBody && (
            <FadeInSection className="mb-12">
              <MarkdownRenderer
                domain="life-science"
                content={articleBody}
                accentColor={supp.accent}
              />
            </FadeInSection>
          )}

          {supp.quote && (
            <FadeInSection className="mb-12">
              <blockquote
                className="border-l-2 py-2 pl-6"
                style={{ borderColor: `${supp.accent}40` }}
              >
                <p className="text-fg-secondary text-lg leading-relaxed italic">
                  &ldquo;{supp.quote}&rdquo;
                </p>
              </blockquote>
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
              相关科学家
            </h3>
            <ul className="space-y-3" role="list">
              {related.map((r) => {
                const rSupp = getSupp(r);
                return (
                  <li key={r.id}>
                    <Link
                      href={`/life-science/scientists/${r.id}`}
                      className="group flex items-start gap-3 text-sm transition-colors"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: rSupp.accent }}
                      />
                      <span>
                        <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                          {r.name}
                        </span>
                        <span className="text-fg-muted ml-1.5 font-mono text-[10px] italic">
                          {rSupp.latin}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </ArticleSidebar>
      </div>
    </div>
  );
}

function FactCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border-border-faint bg-bg-near border p-4">
      <dt className="text-fg-muted mb-1 font-mono text-[9px] tracking-[0.22em] uppercase">
        {label}
      </dt>
      <dd className="font-display text-fg-primary text-sm font-medium" style={{ color: accent }}>
        {value}
      </dd>
    </div>
  );
}
