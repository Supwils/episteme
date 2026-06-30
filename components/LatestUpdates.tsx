import Link from "next/link";
import { LATEST_UPDATES } from "../lib/data";

export function LatestUpdates() {
  return (
    <section className="px-6 py-20">
      <div className="animate-fade-slide-up">
        <h2 className="font-display text-fg-primary mb-2 text-center text-2xl font-semibold">
          最新更新
        </h2>
        <p className="text-fg-muted mb-10 text-center text-[0.88rem]">近期新增的内容与功能</p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {LATEST_UPDATES.map((update, index) => (
          <div
            key={update.id}
            className="animate-fade-slide-up"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <Link
              href={update.href}
              className="lift-card group relative block overflow-hidden rounded-xl border border-white/5 bg-white/2 p-5 pl-6 no-underline backdrop-blur-lg"
              style={{ "--card-accent": update.domainColor } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="lift-card__stripe absolute inset-y-3 left-0 w-[3px] rounded-full"
                style={{ background: update.domainColor }}
              />
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[0.68rem] font-semibold"
                  style={{
                    color: update.domainColor,
                    background: `${update.domainColor}14`,
                    border: `1px solid ${update.domainColor}33`,
                  }}
                >
                  {update.domain}
                </span>
                <span className="text-fg-muted text-[0.68rem]">{update.date}</span>
              </div>
              <h3 className="text-fg-primary group-hover:text-accent-gold mb-1.5 text-[0.95rem] font-semibold transition-colors">
                {update.title}
              </h3>
              <p className="m-0 text-[0.82rem] leading-relaxed text-[#8b8fa3]">
                {update.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
