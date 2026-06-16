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

  const className = `group block p-6 rounded-[0.85rem] bg-bg-near/60 border border-border-faint backdrop-blur-lg animate-fade-slide-up transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-accent-gold)_36%,transparent)] hover:bg-bg-elevated/60${feature.href ? " cursor-pointer" : ""}`;

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
      className="animate-fade-slide-up group border-border-subtle bg-bg-near/60 hover:border-border-strong hover:bg-bg-elevated/60 relative col-span-full mt-4 block overflow-hidden rounded-2xl border p-8 no-underline backdrop-blur-lg transition-[border-color,background-color] duration-300"
      style={{ animationDelay: "0.95s" }}
    >
      {/* Domain-tinted aura, kept subtle so the token surface reads through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 140% at 50% -20%, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.06) 45%, transparent 75%)",
        }}
      />
      <div className="relative z-10 text-center">
        <div className="text-accent-indigo mb-3 text-4xl opacity-80">⬡</div>
        <h3
          className="font-display mb-2 text-xl font-bold text-transparent"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-indigo) 60%, var(--color-accent-violet))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          知识图谱
        </h3>
        <p className="text-fg-secondary mx-auto mb-4 max-w-md text-[0.88rem] leading-relaxed">
          以节点与连线的方式呈现知识之间的深层关联，发现跨领域的隐性联系。探索四大知识领域的交叉点。
        </p>
        <span className="text-accent-indigo inline-flex items-center gap-2 text-sm font-semibold transition-[gap] duration-300 group-hover:gap-3">
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
        className="animate-fade-slide-up font-display text-fg-primary mb-2 text-center text-2xl font-bold"
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
