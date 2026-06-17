import Link from "next/link";
import { FEATURES } from "../lib/data";

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const content = (
    <>
      <div className="text-accent-gold mb-3 text-2xl opacity-85 transition-opacity duration-300 group-hover:opacity-100">
        {feature.icon}
      </div>
      <h3 className="font-display text-fg-primary mb-1.5 text-base font-semibold">
        {feature.title}
      </h3>
      <p className="text-fg-secondary m-0 text-[0.82rem] leading-relaxed">{feature.desc}</p>
    </>
  );

  const className = `group block p-6 rounded-[var(--card-radius,12px)] bg-bg-near border border-border-faint shadow-[var(--card-shadow,none)] animate-fade-slide-up transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent-gold)]${feature.href ? " cursor-pointer" : ""}`;

  if (feature.href) {
    return (
      <Link
        href={feature.href}
        className={className}
        style={{ animationDelay: `${0.6 + index * 0.08}s` }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={{ animationDelay: `${0.6 + index * 0.08}s` }}>
      {content}
    </div>
  );
}

function KnowledgeGraphCTA() {
  return (
    <Link
      href="/knowledge-graph"
      className="animate-fade-slide-up group border-border-subtle bg-bg-near hover:border-accent-gold col-span-full mt-4 block rounded-[var(--card-radius,12px)] border p-8 no-underline shadow-[var(--card-shadow,none)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: "0.95s" }}
    >
      <div className="text-center">
        <div className="text-accent-gold mb-3 text-4xl opacity-80">⬡</div>
        <h3 className="font-display text-fg-primary mb-2 text-xl font-semibold">知识图谱</h3>
        <p className="text-fg-secondary mx-auto mb-4 max-w-md text-[0.88rem] leading-relaxed">
          以节点与连线的方式呈现知识之间的深层关联，发现跨领域的隐性联系。探索四大知识领域的交叉点。
        </p>
        <span className="text-accent-gold inline-flex items-center gap-2 text-sm font-semibold transition-[gap] duration-300 group-hover:gap-3">
          开始探索
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function FeatureGrid() {
  return (
    <section className="px-6 pb-20">
      <h2
        className="animate-fade-slide-up font-display text-fg-primary mb-2 text-center text-2xl font-semibold"
        style={{ animationDelay: "0.5s" }}
      >
        平台特色
      </h2>
      <p
        className="animate-fade-slide-up text-fg-muted mb-10 text-center text-[0.88rem]"
        style={{ animationDelay: "0.55s" }}
      >
        以技术驱动知识的可视化、关联化与深度化
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
      <KnowledgeGraphCTA />
    </section>
  );
}
