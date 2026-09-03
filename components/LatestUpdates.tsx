import Link from "next/link";
import { LATEST_UPDATES } from "../lib/data";

export function LatestUpdates() {
  return (
    <section className="home-content-section">
      <div className="home-section-heading" data-home-reveal>
        <h2 className="home-section-title">最新更新</h2>
        <p className="home-section-subtitle">近期新增的内容与功能</p>
      </div>

      <div className="home-updates-grid">
        {LATEST_UPDATES.slice(0, 6).map((update) => (
          <div key={update.id} className="home-lift-item" data-home-reveal>
            <Link
              href={update.href}
              className="lift-card"
              style={{ "--card-accent": update.domainColor } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="lift-card__stripe"
                style={{ background: update.domainColor }}
              />
              <div className="lift-card__meta">
                <span
                  className="lift-card__badge"
                  style={{
                    background: `${update.domainColor}14`,
                    border: `1px solid ${update.domainColor}33`,
                  }}
                >
                  {update.domain}
                </span>
                <span className="lift-card__date">{update.date}</span>
              </div>
              <h3 className="lift-card__title">{update.title}</h3>
              <p className="lift-card__description">{update.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
