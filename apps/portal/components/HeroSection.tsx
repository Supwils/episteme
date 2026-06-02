'use client';

import { AnimatedCounter } from './AnimatedCounter';
import { CornerMark } from './CornerMark';
import { STATS } from '../lib/data';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-14 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.10) 0%, transparent 60%)',
          animation: 'heroGradientDrift 18s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)',
          animation: 'heroGradientDrift2 22s ease-in-out infinite',
        }}
      />

      <div className="relative z-1 max-w-[1200px] mx-auto px-6">
        <div className="relative inline-block px-10 py-8">
          <CornerMark position="tl" />
          <CornerMark position="tr" />
          <CornerMark position="bl" />
          <CornerMark position="br" />

          <p className="text-xs tracking-[0.25em] uppercase text-[#6366f1] mb-5 font-semibold animate-fade-slide-up" style={{ animationDelay: '0s' }}>
            Universe Knowledge Platform
          </p>

          <h1
            className="text-[clamp(2.8rem,7.5vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-4 animate-fade-slide-up"
            style={{
              background: 'linear-gradient(135deg, #e8e8f0 0%, #8b5cf6 40%, #6366f1 60%, #a78bfa 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 8s ease-in-out infinite, fadeSlideUp 0.6s ease-out 0.1s both',
            }}
          >
            探索人类知识的边界
          </h1>

          <p className="text-[1.15rem] text-[#6366f1]/80 max-w-[560px] mx-auto mb-4 leading-relaxed animate-fade-slide-up font-medium" style={{ animationDelay: '0.15s' }}>
            从宇宙的尺度到人类的思想，一站式探索
          </p>

          <p className="text-[1.05rem] text-[#8b8fa3] max-w-[520px] mx-auto mb-10 leading-relaxed animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            汇聚宇宙物理、人类历史与哲学思想，构建系统化的知识图谱。让任何人随时以美好的方式接触到人类最重要的知识。
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-12 flex-wrap animate-fade-slide-up" style={{ animationDelay: '0.35s' }}>
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-3xl font-extrabold leading-tight"
              style={{
                background: 'linear-gradient(135deg, #e8e8f0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[0.72rem] text-[#9ca3af] mt-1 tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
