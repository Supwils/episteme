import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { engineArticleMetadata } from "@/lib/article-canonical";

const DOMAIN = "political-science";
const SECTION = "concepts";

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
  return engineArticleMetadata(DOMAIN, SECTION, (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={slug} />;
}
