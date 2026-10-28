import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import { DOMAIN_SEALS } from "@/lib/design/seals";
import { summitCatalog, summitRouteDomains } from "@/lib/summit-catalog";
import { buildSummitModel } from "@/lib/summit-model";
import { SummitDirectory } from "../SummitDirectory";
import { SummitHashPanel } from "./SummitHashPanel";
import "../summit.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return summitRouteDomains().map((domain) => ({ domain }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const seal = DOMAIN_SEALS[domain as keyof typeof DOMAIN_SEALS];
  if (!seal) return { title: "格致山 — Episteme · 格致" };
  return withCanonicalPath(`/knowledge-summit/${domain}`, {
    title: `${seal.name} — 格致山`,
    description: `${seal.name}在格致山上的条目，按认知层级从山脚排到山顶。`,
  });
}

export default async function SummitDomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const model = buildSummitModel();
  const groups = summitCatalog(model.nodes)
    .map((cluster) => ({
      ...cluster,
      domains: cluster.domains.filter((item) => item.id === domain),
    }))
    .filter((cluster) => cluster.domains.length > 0);
  const current = groups[0]?.domains[0];
  if (!current) notFound();

  return (
    <article className="summit">
      <header className="summit-header">
        <p>
          <Link href="/knowledge-summit">格致山</Link>
        </p>
        <h1>
          {current.seal} {current.name}
        </h1>
        <p>这一科的条目按层级列在下面。点开一篇就能读。带脚本时，从山上过来的链接会打开侧栏。</p>
      </header>
      <SummitDirectory groups={groups} nodes={model.nodes} />
      <SummitHashPanel domain={domain} />
    </article>
  );
}
