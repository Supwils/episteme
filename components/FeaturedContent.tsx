import Link from "next/link";
import { FEATURED_CONTENT } from "../lib/data";

export function FeaturedContent() {
  return (
    <section className="px-6 py-20">
      <div className="animate-fade-slide-up">
        <h2 className="font-display text-fg-primary mb-2 text-center text-2xl font-semibold">
          精选内容
        </h2>
        <p className="text-fg-muted mb-10 text-center text-[0.88rem]">编辑推荐的知识探索入口</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_CONTENT.map((entry, index) => (
          <div
            key={entry.id}
            className="animate-fade-slide-up"
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
      className="lift-card group relative block h-full overflow-hidden rounded-xl border border-white/5 bg-white/2 p-5 pl-6 no-underline backdrop-blur-lg"
      style={{ "--card-accent": item.domainColor } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="lift-card__stripe absolute inset-y-3 left-0 w-[3px] rounded-full"
        style={{ background: item.domainColor }}
      />
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg" style={{ color: item.domainColor }}>
          {item.icon}
        </span>
        <span className="text-fg-secondary text-[0.68rem] font-semibold">{item.domain}</span>
      </div>
      <h3 className="text-fg-primary group-hover:text-accent-gold mb-1.5 text-[0.95rem] font-semibold transition-colors">
        {item.title}
      </h3>
      <p className="text-fg-secondary m-0 text-[0.82rem] leading-relaxed">{item.description}</p>
    </Link>
  );
}
