import Link from "next/link";
import {
  findBySlug,
  getRelatedItems,
  getBackReferences,
  getItemsByCategory,
  getCategoryLabel,
  getItemUrl,
  type ContentCategory,
  type ContentItem,
} from "@/lib/cross-references";
import {
  getCrossReferences,
  resolveReference,
  DOMAIN_LABELS,
  type Domain,
  type CrossReference,
} from "@/lib/cross-domain-refs";

const CATEGORY_ORDER: ContentCategory[] = [
  "thinker",
  "school",
  "ism",
  "concept",
  "experiment",
  "question",
];

const CATEGORY_ACCENT: Record<ContentCategory, string> = {
  thinker: "var(--color-accent-gold)",
  school: "var(--color-accent-sage)",
  ism: "var(--color-accent-gold)",
  concept: "var(--color-accent-gold)",
  experiment: "var(--color-accent-sage)",
  question: "var(--color-accent-gold)",
};

const DOMAIN_COLORS: Record<Domain, string> = {
  "universe-physics": "#6366f1",
  "human-history": "#ef4444",
  philosophy: "#f59e0b",
  "life-science": "#10b981",
  cosmology: "#8b5cf6",
  mathematics: "#0ea5e9",
  economics: "#f97316",
  psychology: "#ec4899",
};

function CategoryGroup({
  label,
  items,
  accent,
}: {
  label: string;
  items: ContentItem[];
  accent: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-5">
      <p
        className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.28em]"
        style={{ color: accent }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={getItemUrl(item)}
            className="group/mini border-fg-disabled/20 bg-bg-panel hover:border-border-subtle hover:bg-bg-elevated relative flex items-center gap-2 border px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="text-fg-secondary group-hover/mini:text-fg-primary font-mono text-[11px] tracking-[0.12em] transition-colors">
              {item.title}
            </span>
            <span
              aria-hidden
              className="text-fg-disabled font-mono text-[10px] opacity-0 transition-opacity duration-200 group-hover/mini:opacity-100"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CrossDomainGroup({
  domain,
  refs,
  currentDomain,
}: {
  domain: Domain;
  refs: CrossReference[];
  currentDomain: Domain;
}) {
  if (refs.length === 0) return null;
  const color = DOMAIN_COLORS[domain];
  const label = DOMAIN_LABELS[domain];

  return (
    <div className="mb-5">
      <div className="mb-2.5 flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p
          className="font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color }}
        >
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {refs.map((ref) => {
          const resolved = resolveReference(ref, currentDomain);
          return (
            <Link
              key={`${resolved.targetDomain}-${resolved.targetId}`}
              href={resolved.targetRoute}
              className="group/mini border-fg-disabled/20 bg-bg-panel hover:border-border-subtle hover:bg-bg-elevated flex items-start gap-3 border px-3 py-2.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <span
                className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-fg-secondary group-hover/mini:text-fg-primary block font-mono text-[11px] tracking-[0.12em] transition-colors">
                  {resolved.targetTitle}
                </span>
                <span className="text-fg-muted mt-0.5 block text-[10px] leading-relaxed">
                  {resolved.relation}
                </span>
              </div>
              <span
                aria-hidden
                className="text-fg-disabled mt-0.5 shrink-0 font-mono text-[10px] opacity-0 transition-opacity duration-200 group-hover/mini:opacity-100"
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type RelatedContentProps = {
  slug: string;
  domain?: Domain;
  entityId?: string;
};

export default function RelatedContent({ slug, domain, entityId }: RelatedContentProps) {
  const item = findBySlug(slug);
  const related = item ? getRelatedItems(item) : [];
  const backRefs = item ? getBackReferences(slug) : [];

  let crossDomainRefs: CrossReference[] = [];
  if (domain && entityId) {
    crossDomainRefs = getCrossReferences(domain, entityId);
  }

  const hasPhilosophyContent = related.length > 0 || backRefs.length > 0;
  const hasCrossDomainContent = crossDomainRefs.length > 0;

  if (!hasPhilosophyContent && !hasCrossDomainContent) return null;

  const relatedByCategory = getItemsByCategory(related);
  const backRefByCategory = getItemsByCategory(backRefs);

  const refsByDomain = new Map<Domain, CrossReference[]>();
  for (const ref of crossDomainRefs) {
    const resolved = resolveReference(ref, domain!);
    const targetDomain = resolved.targetDomain;
    if (!refsByDomain.has(targetDomain)) {
      refsByDomain.set(targetDomain, []);
    }
    refsByDomain.get(targetDomain)!.push(ref);
  }

  const domainOrder: Domain[] = [
    "universe-physics",
    "mathematics",
    "cosmology",
    "life-science",
    "human-history",
    "philosophy",
    "economics",
    "psychology",
  ];

  return (
    <section className="border-border-faint mt-12 border-t pt-8">
      {hasPhilosophyContent && (
        <>
          {related.length > 0 && (
            <div className="mb-8">
              <h3 className="text-fg-primary mb-5 font-mono text-[11px] uppercase tracking-[0.32em]">
                相关内容 · related
              </h3>
              {CATEGORY_ORDER.map((cat) => (
                <CategoryGroup
                  key={cat}
                  label={getCategoryLabel(cat)}
                  items={relatedByCategory[cat]}
                  accent={CATEGORY_ACCENT[cat]}
                />
              ))}
            </div>
          )}

          {backRefs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-fg-primary mb-5 font-mono text-[11px] uppercase tracking-[0.32em]">
                被引用 · referenced by
              </h3>
              {CATEGORY_ORDER.map((cat) => (
                <CategoryGroup
                  key={cat}
                  label={getCategoryLabel(cat)}
                  items={backRefByCategory[cat]}
                  accent={CATEGORY_ACCENT[cat]}
                />
              ))}
            </div>
          )}
        </>
      )}

      {hasCrossDomainContent && domain && (
        <div>
          <h3 className="text-fg-primary mb-5 font-mono text-[11px] uppercase tracking-[0.32em]">
            跨领域关联 · cross-domain
          </h3>
          {domainOrder.map((d) => {
            const refs = refsByDomain.get(d);
            if (!refs || refs.length === 0) return null;
            return (
              <CrossDomainGroup
                key={d}
                domain={d}
                refs={refs}
                currentDomain={domain}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
