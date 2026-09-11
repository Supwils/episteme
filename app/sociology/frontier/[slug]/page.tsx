import type { Metadata } from "next";
import { FrontierArticleView } from "@/components/frontier/FrontierArticleView";
import { frontierArticleMetadata } from "@/lib/article-canonical";

const DOMAIN = "sociology" as const;

export function generateStaticParams() {
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
