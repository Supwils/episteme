import type { Metadata } from "next";
import { FrontierArticleView } from "@/components/frontier/FrontierArticleView";
import { frontierArticleMetadata } from "@/lib/article-canonical";

const DOMAIN = "life-science" as const;

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
  return frontierArticleMetadata(DOMAIN, (await params).slug);
}

export default async function FrontierArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FrontierArticleView domain={DOMAIN} slug={slug} />;
}
