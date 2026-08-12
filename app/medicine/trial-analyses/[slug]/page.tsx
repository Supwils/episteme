import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
const DOMAIN = "medicine",
  SECTION = "trial-analyses";
export function generateStaticParams() {
  return [];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = createKnowledgeSection(DOMAIN, SECTION).getBySlug(slug);
  return a
    ? {
        title: `${a.title} — ${getSectionConfig(DOMAIN, SECTION)?.label} — ${getDomainConfig(DOMAIN)?.label}`,
        description: a.excerpt,
      }
    : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={(await params).slug} />;
}
