import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const DOMAIN = "political-science";
const SECTION = "isms";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
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
  const sc = getSectionConfig(DOMAIN, SECTION);
  const dc = getDomainConfig(DOMAIN);
  return { title: `${article.title} — ${sc?.label} — ${dc?.label}`, description: article.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={slug} />;
}
