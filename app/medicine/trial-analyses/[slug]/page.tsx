import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { engineArticleMetadata } from "@/lib/article-canonical";
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
  return engineArticleMetadata(DOMAIN, SECTION, (await params).slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <DomainArticle domain={DOMAIN} section={SECTION} slug={(await params).slug} />;
}
