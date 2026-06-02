import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { DomainCard } from '../components/DomainCard';
import { APP_URLS } from '../lib/urls';
import { DOMAINS } from '../lib/data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-[#e8e8f0] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          animation: 'dotPulse 6s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          top: '-30%', left: '-10%', width: '60%', height: '60%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed rounded-full pointer-events-none z-0"
        style={{
          bottom: '-20%', right: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-1">
        <HeroSection />

        <section className="max-w-[1200px] mx-auto px-6 py-4 pb-20 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </section>

        <FeatureGrid />

        <footer className="border-t border-white/[0.06] pt-12 pb-8 px-6 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 mb-10">
            <div>
              <div
                className="text-[1.05rem] font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #e8e8f0, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Universe Knowledge
              </div>
              <p className="text-[0.78rem] text-[#9ca3af] leading-relaxed m-0">
                知识即服务平台。以可视化、沉浸式的方式探索人类最重要的知识。
              </p>
            </div>
            <div>
              <h4 className="text-[0.78rem] font-semibold text-[#9ca3af] mb-3 tracking-wide">
                知识领域
              </h4>
              <div className="flex flex-col gap-2">
                <a href={APP_URLS["universe-physics"]} className="text-sm text-[#9ca3af] hover:text-[#818cf8] transition-colors">宇宙物理</a>
                <a href={APP_URLS["human-history"]} className="text-sm text-[#9ca3af] hover:text-[#818cf8] transition-colors">人类历史</a>
                <a href={APP_URLS["philosophy"]} className="text-sm text-[#9ca3af] hover:text-[#818cf8] transition-colors">哲学思想</a>
              </div>
            </div>
            <div>
              <h4 className="text-[0.78rem] font-semibold text-[#9ca3af] mb-3 tracking-wide">
                探索方式
              </h4>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#9ca3af]">知识图谱</span>
                <span className="text-sm text-[#9ca3af]">时间线</span>
                <span className="text-sm text-[#9ca3af]">3D 可视化</span>
              </div>
            </div>
            <div>
              <h4 className="text-[0.78rem] font-semibold text-[#9ca3af] mb-3 tracking-wide">
                关于
              </h4>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#9ca3af]">工程原则</span>
                <span className="text-sm text-[#9ca3af]">知识精神</span>
                <span className="text-sm text-[#9ca3af]">开源贡献</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-5 flex justify-between items-center flex-wrap gap-2">
            <span className="text-[0.7rem] text-[#6b7280]">
              © {new Date().getFullYear()} Universe Knowledge. All rights reserved.
            </span>
            <span className="text-[0.7rem] text-[#6b7280] italic">
              让知识触手可及
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
