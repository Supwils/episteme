import type { Metadata } from "next";
import { FrontierArticleView } from "@/components/frontier/FrontierArticleView";
import { createFrontier, FRONTIER_DOMAIN_CONFIG } from "@/lib/frontier";

const DOMAIN = "philosophy" as const;

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
  const article = createFrontier(DOMAIN).getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — 研究前沿 — ${FRONTIER_DOMAIN_CONFIG[DOMAIN].label}`,
    description: article.excerpt,
  };
}

export default async function FrontierArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FrontierArticleView domain={DOMAIN} slug={slug} />;
}
