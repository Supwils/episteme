import { notFound } from "next/navigation";
import Link from "next/link";
import { getEconomistBySlug, getAllEconomists } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const economist = getEconomistBySlug(slug);
  if (!economist) notFound();
  return {
    title: `${economist.title} — 经济学家`,
    description: `${economist.title}（${economist.name_en}）：${economist.school}。${economist.tags.join("、")}`,
  };
}

export default async function EconomistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const economist = getEconomistBySlug(slug);
  if (!economist) notFound();

  const allEconomists = getAllEconomists();
  const currentIndex = allEconomists.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? allEconomists[currentIndex - 1] : null;
  const next = currentIndex < allEconomists.length - 1 ? allEconomists[currentIndex + 1] : null;

  const related = allEconomists
    .filter(
      (e) =>
        e.slug !== slug &&
        (e.era === economist.era ||
          e.school === economist.school ||
          economist.related.includes(e.slug))
    )
    .slice(0, 4);

  const accent = ERA_COLORS[economist.era] ?? "#c8a45a";

  return (
    <ArticleLayout
      backHref="/economics/economists"
      backLabel="← 返回经济学家"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "经济学家", href: "/economics/economists" },
            { label: economist.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={economist.era}
      eyebrowMeta={[economist.years]}
      title={economist.title}
      titleEn={economist.name_en}
      content={economist.content}
      meta={
        <>
          {economist.nobel && (
            <p>
              <span className="badge-nobel">诺贝尔奖</span>
            </p>
          )}
          <p className={economist.nobel ? "mt-3" : ""}>{economist.school}</p>
          {economist.key_contributions.length > 0 && (
            <div className="mt-4">
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                主要贡献
              </p>
              <ul className="text-fg-secondary list-inside list-disc space-y-1 text-sm">
                {economist.key_contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
      tags={economist.tags}
      articleClassName="max-w-[900px]"
      prevLabel="上一位"
      nextLabel="下一位"
      prev={prev ? { href: `/economics/economists/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/economists/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              经济学家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{economist.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  学派
                </dt>
                <dd className="text-fg-primary mt-0.5">{economist.school}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  生卒年
                </dt>
                <dd className="text-fg-primary mt-0.5">{economist.years}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关经济学家
              </h3>
              <div className="space-y-2">
                {related.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/economics/economists/${e.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: ERA_COLORS[e.era] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {e.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MarkdownRenderer content={economist.content} accentColor="#e8b84a" />
      <RelatedContent slug={slug} domain="economics" entityId={slug} />
    </ArticleLayout>
  );
}
