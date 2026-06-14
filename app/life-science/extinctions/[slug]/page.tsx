import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllExtinctions, getExtinctionById } from "@/subjects/life-science/lib/extinctions";
import type { ExtinctionEvent } from "@/subjects/life-science/lib/types";
import { FadeInSection } from "@/components/FadeInSection";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleSidebar } from "@/components/ArticleSidebar";

type Props = { params: Promise<{ slug: string }> };

const SUPPLEMENT: Record<string, { victims: string; aftermath: string; accent: string }> = {
  ordovician: {
    victims: "三叶虫、笔石、腕足类大量灭绝",
    aftermath: "为鱼类的辐射演化腾出了生态位",
    accent: "#5a9ad8",
  },
  devonian: {
    victims: "盾皮鱼全军覆没，珊瑚礁几乎消失",
    aftermath: "两栖动物开始登上陆地",
    accent: "#5a9ad8",
  },
  permian: {
    victims: "96% 海洋物种、70% 陆地脊椎动物灭绝",
    aftermath: "生态系统恢复花了近 1000 万年，恐龙趁机崛起",
    accent: "#d85a5a",
  },
  "triassic-jurassic": {
    victims: "大部分大型两栖动物、许多爬行动物类群",
    aftermath: "恐龙开始统治陆地",
    accent: "#e8a840",
  },
  cretaceous: {
    victims: "非鸟类恐龙、翼龙、沧龙、菊石全部灭绝",
    aftermath: "哺乳动物迅速辐射演化，开启新生代",
    accent: "#d85a5a",
  },
};

function getSupp(e: ExtinctionEvent) {
  return SUPPLEMENT[e.id] ?? { victims: "", aftermath: "", accent: "#5a9ad8" };
}

export function generateStaticParams() {
  return getAllExtinctions().map((e) => ({ slug: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const extinction = getExtinctionById(slug);
  if (!extinction) notFound();
  const description = `${extinction.dateDisplay}，${extinction.speciesLostPercent}% 物种灭绝。${extinction.description}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(extinction.name)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${extinction.name} — 生命科学`,
    description,
    openGraph: {
      title: `${extinction.name} — 生命科学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ExtinctionDetailPage({ params }: Props) {
  const { slug } = await params;
  const extinction = getExtinctionById(slug);
  if (!extinction) notFound();

  const supp = getSupp(extinction);
  const allExtinctions = getAllExtinctions();
  const currentIndex = allExtinctions.findIndex((e) => e.id === slug);
  const prev = currentIndex > 0 ? allExtinctions[currentIndex - 1] : null;
  const next = currentIndex < allExtinctions.length - 1 ? allExtinctions[currentIndex + 1] : null;

  const jsonLd = createArticleJsonLd({
    title: `${extinction.name}（${extinction.nameEn}）`,
    description: `${extinction.dateDisplay}，${extinction.speciesLostPercent}% 物种灭绝。${extinction.description}`,
    url: `${SITE_URL}/life-science/extinctions/${slug}`,
    keywords: [extinction.name, extinction.nameEn, extinction.dateDisplay, "mass extinction"],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          <header className="mb-12">
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
              life-science / mass extinctions
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
                {extinction.dateDisplay}
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase"
                style={{ color: supp.accent }}
              >
                严重程度 {extinction.severity}/5
              </span>
            </div>
            <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
              {extinction.name}
            </h1>
            <p className="text-fg-muted mt-2 font-mono text-sm tracking-wider italic">
              {extinction.nameEn}
            </p>
          </header>

          <div className="mb-12 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center sm:min-w-[140px]">
              <span
                className="font-display text-5xl font-bold tabular-nums"
                style={{ color: supp.accent }}
              >
                {extinction.speciesLostPercent}%
              </span>
              <span className="text-fg-muted mt-1 font-mono text-[9px] tracking-[0.22em] uppercase">
                物种灭绝率
              </span>
            </div>
            <div className="flex-1">
              <p className="text-fg-secondary leading-relaxed">{extinction.description}</p>
            </div>
          </div>

          <FadeInSection className="mb-12">
            <h2 className="font-display text-fg-primary mb-4 text-xl font-semibold">灭绝原因</h2>
            <ul className="space-y-3">
              {extinction.causes.map((cause) => (
                <li key={cause} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: supp.accent }}
                  />
                  <span className="text-fg-secondary text-sm leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </FadeInSection>

          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div
              className="border-border-faint bg-bg-near border p-6"
              style={{ borderLeftColor: "var(--color-danger)", borderLeftWidth: "3px" }}
            >
              <h3
                className="font-display mb-3 text-sm font-semibold"
                style={{ color: "var(--color-danger)" }}
              >
                受害者
              </h3>
              <p className="text-fg-secondary text-sm leading-relaxed">{supp.victims}</p>
            </div>
            <div
              className="border-border-faint bg-bg-near border p-6"
              style={{ borderLeftColor: "var(--color-accent-green)", borderLeftWidth: "3px" }}
            >
              <h3
                className="font-display mb-3 text-sm font-semibold"
                style={{ color: "var(--color-accent-green)" }}
              >
                后续影响
              </h3>
              <p className="text-fg-secondary text-sm leading-relaxed">{supp.aftermath}</p>
            </div>
          </div>

          <SafeRender>
            <RelatedContent slug={slug} domain="life-science" entityId={slug} />
          </SafeRender>

          <div className="border-border-faint flex items-center justify-between gap-4 border-t pt-8">
            {prev ? (
              <Link
                href={`/life-science/extinctions/${prev.id}`}
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="text-fg-muted group-hover:text-fg-secondary">←</span>
                <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/life-science/extinctions/${next.id}`}
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="text-fg-secondary group-hover:text-accent-green transition-colors">
                  {next.name}
                </span>
                <span className="text-fg-muted group-hover:text-fg-secondary">→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>

        <ArticleSidebar contentClassName="space-y-6">
          <TableOfContents accentColor="#4a9e6f" />
          <div className="border-border-faint bg-bg-near border p-5">
            <h3 className="font-display text-fg-primary mb-4 text-sm font-semibold tracking-wide">
              全部大灭绝事件
            </h3>
            <ul className="space-y-3" role="list">
              {allExtinctions.map((e) => {
                const eSupp = getSupp(e);
                return (
                  <li key={e.id}>
                    <Link
                      href={`/life-science/extinctions/${e.id}`}
                      className={`group flex items-start gap-3 text-sm transition-colors ${e.id === slug ? "pointer-events-none" : ""}`}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: eSupp.accent }}
                      />
                      <span>
                        <span
                          className={`transition-colors ${e.id === slug ? "text-accent-green" : "text-fg-secondary group-hover:text-accent-green"}`}
                        >
                          {e.name}
                        </span>
                        <span className="text-fg-muted ml-1.5 font-mono text-[10px]">
                          {e.speciesLostPercent}%
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
