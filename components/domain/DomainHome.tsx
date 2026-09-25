import { notFound } from "next/navigation";
import { DomainOrbit } from "@/components/domain/DomainOrbit";
import { DomainLanding } from "@/components/landing/DomainLanding";
import type { DigestItem } from "@/components/landing/LandingDigest";
import type { LandingSection } from "@/components/landing/SectionIndex";
import { buildDomainOrbit } from "@/lib/domain-orbit";
import { createFrontier } from "@/lib/frontier";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, type DomainConfig } from "@/lib/new-domains";

const RECENT_ITEMS = 4;

function recentUpdates(domain: string, config: DomainConfig): DigestItem[] {
  return config.sections
    .flatMap((section) =>
      createKnowledgeSection(domain, section.key)
        .getAll()
        .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.updated))
        .map((item) => ({
          href: `/${domain}/${section.key}/${item.slug}`,
          title: item.title,
          meta: `${section.label} · ${item.updated}`,
          updated: item.updated,
        }))
    )
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, RECENT_ITEMS)
    .map(({ href, title, meta }) => ({ href, title, meta }));
}

/** The 14 engine-driven domains: config and content loaders mapped onto DomainLanding. */
export function DomainHome({ domain }: { domain: string }) {
  const config = getDomainConfig(domain);
  if (!config) notFound();

  const sections: LandingSection[] = config.sections.map((section) => ({
    href: `/${domain}/${section.key}`,
    label: section.label,
    description: section.description,
    count: createKnowledgeSection(domain, section.key).getAll().length,
  }));
  for (const tool of config.tools ?? []) {
    sections.push({
      href: tool.href,
      label: tool.label,
      description: tool.description,
      tag: "互动工具",
    });
  }

  const frontierArticles = createFrontier(domain).getAllArticles();
  const articleCount = sections.reduce((sum, section) => sum + (section.count ?? 0), 0);
  const stats = [
    `${articleCount} 个条目`,
    `${config.sections.length} 个板块`,
    frontierArticles.length > 0 ? `${frontierArticles.length} 篇前沿` : "",
  ].filter(Boolean);
  const orbit = buildDomainOrbit(domain);

  return (
    <DomainLanding
      domain={domain}
      lede={config.tagline}
      stats={stats}
      sections={sections}
      recent={recentUpdates(domain, config)}
    >
      {orbit ? (
        <section className="landing-block landing-orbit" aria-labelledby="landing-orbit">
          <h2 id="landing-orbit" className="landing-block__title">
            知识星轨
          </h2>
          <p className="landing-block__note">
            五圈是五个层级，由内向外从直觉到前沿；亮起的一串是学习主线。点任意一颗星打开那篇文章。
          </p>
          <div className="landing-orbit__stage">
            <DomainOrbit
              payload={orbit}
              accent={config.accent}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>
      ) : null}
    </DomainLanding>
  );
}
