import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const DOMAIN = "linguistics";
const SECTION = "history-typology-society";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = createKnowledgeSection(DOMAIN, SECTION).getBySlug(slug);
  if (!article) return {};
  const sectionConfig = getSectionConfig(DOMAIN, SECTION);
  const domainConfig = getDomainConfig(DOMAIN);
  return {
    title: `${article.title} — ${sectionConfig?.label} — ${domainConfig?.label}`,
    description: article.excerpt,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={slug} />;
}
