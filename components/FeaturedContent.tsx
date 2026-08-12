import Link from "next/link";
import { FEATURED_CONTENT } from "../lib/data";

export function FeaturedContent() {
  return (
    <section className="home-content-section">
      <div className="home-section-heading">
        <h2 className="home-section-title">精选内容</h2>
        <p className="home-section-subtitle">编辑推荐的知识探索入口</p>
      </div>

      <div className="home-featured-grid">
        {FEATURED_CONTENT.map((entry, index) => (
          <div
            key={entry.id}
            className="home-lift-item"
            style={{ animationDelay: `${0.1 + index * 0.08}s` }}
          >
            <FeaturedItem item={entry} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedItem({ item }: { item: (typeof FEATURED_CONTENT)[0] }) {
  return (
    <Link
      href={item.href}
      className="lift-card lift-card--full"
      style={{ "--card-accent": item.domainColor } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="lift-card__stripe"
        style={{ background: item.domainColor }}
      />
      <div className="lift-card__meta lift-card__meta--featured">
        <span className="lift-card__icon" style={{ color: item.domainColor }}>
          {item.icon}
        </span>
        <span className="lift-card__badge lift-card__badge--plain">{item.domain}</span>
      </div>
      <h3 className="lift-card__title">{item.title}</h3>
      <p className="lift-card__description">{item.description}</p>
    </Link>
  );
}
