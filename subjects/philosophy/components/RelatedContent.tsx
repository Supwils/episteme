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
} from "@/subjects/philosophy/lib/cross-references";

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

export default function RelatedContent({ slug }: { slug: string }) {
  const item = findBySlug(slug);
  if (!item) return null;

  const related = getRelatedItems(item);
  const backRefs = getBackReferences(slug);

  if (related.length === 0 && backRefs.length === 0) return null;

  const relatedByCategory = getItemsByCategory(related);
  const backRefByCategory = getItemsByCategory(backRefs);

  return (
    <section className="border-border-faint mt-12 border-t pt-8">
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
        <div>
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
    </section>
  );
}
