import Link from "next/link";
import { FEATURES } from "../lib/data";

function FeatureCard({ feature }: { feature: (typeof FEATURES)[0] }) {
  const content = (
    <>
      <div className="home-feature-card__icon">{feature.icon}</div>
      <h3 className="home-feature-card__title">{feature.title}</h3>
      <p className="home-feature-card__desc">{feature.desc}</p>
    </>
  );

  if (feature.href) {
    return (
      <Link href={feature.href} className="home-feature-card" data-home-reveal>
        {content}
      </Link>
    );
  }

  return (
    <div className="home-feature-card" data-home-reveal>
      {content}
    </div>
  );
}

function KnowledgeGraphCTA() {
  return (
    <Link href="/knowledge-graph" className="home-feature-cta" data-home-reveal>
      <div className="home-feature-cta__inner">
        <div className="home-feature-cta__icon">⬡</div>
        <h3 className="home-feature-cta__title">知识图谱</h3>
        <p className="home-feature-cta__desc">
          用节点和连线呈现概念之间的联系，看看一个问题会通向哪些学科。
        </p>
        <span className="home-feature-cta__go">
          开始探索
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function FeatureGrid() {
  return (
    <section className="home-feature-section">
      <h2 className="home-feature-section__title" data-home-reveal>
        平台特色
      </h2>
      <p className="home-feature-section__subtitle" data-home-reveal>
        用文章、图谱与交互，把知识之间的联系说清楚
      </p>
      <div className="home-feature-grid">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
      <KnowledgeGraphCTA />
    </section>
  );
}
