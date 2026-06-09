import { notFound } from "next/navigation";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getAllCaseStudies,
} from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();
  return {
    title: `${cs.title} — 经济案例`,
    description: `${cs.title}（${cs.title_en}）· ${cs.year} · ${cs.region}`,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const accent = CATEGORY_COLORS[cs.category] ?? "#c8a45a";
  const allCases = getAllCaseStudies();
  const currentIndex = allCases.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? allCases[currentIndex - 1] : null;
  const next = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null;

  return (
    <ArticleLayout
      backHref="/economics/case-studies"
      backLabel="← 返回案例列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "案例研究", href: "/economics/case-studies" },
            { label: cs.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={cs.category}
      eyebrowMeta={[`${cs.year} 年`, cs.region]}
      title={cs.title}
      titleEn={cs.title_en}
      content={cs.content}
      tags={cs.tags}
      articleClassName="max-w-[900px]"
      prev={prev ? { href: `/economics/case-studies/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/case-studies/${next.slug}`, title: next.title } : null}
      sidebar={<TableOfContents accentColor="#e8b84a" />}
    >
      <MarkdownRenderer content={cs.content} accentColor="#e8b84a" />
    </ArticleLayout>
  );
}
