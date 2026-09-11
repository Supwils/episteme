import type { Metadata } from "next";
import { DomainArticle } from "@/components/domain/DomainArticle";
import { engineArticleMetadata } from "@/lib/article-canonical";

const DOMAIN = "chemistry";
const SECTION = "figures";

export function generateStaticParams() {
  return []; // On-demand SSG: build on first request, then cache until the next deployment
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
