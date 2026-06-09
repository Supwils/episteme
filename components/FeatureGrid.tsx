import Link from "next/link";
import { FEATURES } from "../lib/data";

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const content = (
    <>
      <div className="mb-3 text-2xl text-[#6366f1] opacity-80">{feature.icon}</div>
      <h3 className="mb-1.5 text-base font-semibold text-[#e8e8f0]">{feature.title}</h3>
      <p className="m-0 text-[0.82rem] leading-relaxed text-[#8b8fa3]">{feature.desc}</p>
    </>
  );

  const className = `block p-6 rounded-[0.85rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-lg animate-fade-slide-up hover:border-[rgba(99,102,241,0.2)] hover:bg-white/[0.04] transition-colors duration-300${feature.href ? " cursor-pointer" : ""}`;

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
      className="animate-fade-slide-up group relative col-span-full mt-4 block overflow-hidden rounded-2xl p-8 no-underline"
      style={{
        animationDelay: "0.95s",
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(16,185,129,0.04) 100%)",
        border: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div className="relative z-10 text-center">
        <div className="mb-3 text-4xl opacity-70">⬡</div>
        <h3
          className="mb-2 text-xl font-bold"
          style={{
            background: "linear-gradient(135deg, #e8e8f0, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          知识图谱
        </h3>
        <p className="mx-auto mb-4 max-w-md text-[0.88rem] leading-relaxed text-[#8b8fa3]">
          以节点与连线的方式呈现知识之间的深层关联，发现跨领域的隐性联系。探索四大知识领域的交叉点。
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6366f1] transition-[gap] duration-300 group-hover:gap-3">
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
        className="animate-fade-slide-up mb-2 text-center text-2xl font-bold text-[#e8e8f0]"
        style={{ animationDelay: "0.5s" }}
      >
        平台特色
      </h2>
      <p
        className="animate-fade-slide-up mb-10 text-center text-[0.88rem] text-[#9ca3af]"
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
