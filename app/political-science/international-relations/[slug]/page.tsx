import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const DOMAIN = "political-science";
const SECTION = "international-relations";

export function generateStaticParams() {
  return createKnowledgeSection(DOMAIN, SECTION)
    .getSlugs()
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = createKnowledgeSection(DOMAIN, SECTION).getBySlug(slug);
  if (!article) return {};
  const sc = getSectionConfig(DOMAIN, SECTION);
  const dc = getDomainConfig(DOMAIN);
  return { title: `${article.title} — ${sc?.label} — ${dc?.label}`, description: article.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={slug} />;
}
