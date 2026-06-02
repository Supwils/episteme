import { FEATURES } from '../lib/data';

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  return (
    <div
      className="p-6 rounded-[0.85rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-lg animate-fade-slide-up hover:border-[rgba(99,102,241,0.2)] hover:bg-white/[0.04] transition-colors duration-300"
      style={{ animationDelay: `${0.6 + index * 0.08}s` }}
    >
      <div className="text-2xl text-[#6366f1] mb-3 opacity-80">
        {feature.icon}
      </div>
      <h3 className="text-base font-semibold text-[#e8e8f0] mb-1.5">
        {feature.title}
      </h3>
      <p className="text-[0.82rem] text-[#8b8fa3] leading-relaxed m-0">
        {feature.desc}
      </p>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-20">
      <h2 className="text-center text-2xl font-bold text-[#e8e8f0] mb-2 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        平台特色
      </h2>
      <p className="text-center text-[0.88rem] text-[#9ca3af] mb-10 animate-fade-slide-up" style={{ animationDelay: '0.55s' }}>
        以技术驱动知识的可视化、关联化与深度化
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
