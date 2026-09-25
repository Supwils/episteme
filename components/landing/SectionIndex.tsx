import Link from "next/link";

export type LandingSection = {
  href: string;
  label: string;
  description: string;
  /** Article count; omitted for tools and other non-article entries. */
  count?: number;
  /** Replaces the count, e.g. 「互动工具」. */
  tag?: string;
};

/**
 * 板块索引：不配 emoji、不配彩虹色。每格顶上一道簇颜料细线，名称、篇数、一句话。
 */
export function SectionIndex({ sections }: { sections: LandingSection[] }) {
  if (sections.length === 0) return null;
  return (
    <section className="landing-block" aria-labelledby="landing-sections">
      <h2 id="landing-sections" className="landing-block__title">
        板块
      </h2>
      <ul className="section-index">
        {sections.map((section) => (
          <li key={section.href}>
            <Link href={section.href} className="section-index__card">
              <span className="section-index__head">
                <span className="section-index__label">{section.label}</span>
                <span className="section-index__count">
                  {section.tag ?? (section.count ? `${section.count} 篇` : "")}
                </span>
              </span>
              <span className="section-index__line">{section.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
