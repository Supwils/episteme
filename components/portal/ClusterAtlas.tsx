import { DomainCard } from "@/components/DomainCard";
import { pigmentVar } from "@/lib/design/palette";
import { DOMAINS } from "@/lib/data";
import { getClustersWithDomains } from "@/lib/domain-clusters";
import { domainWedge } from "@/lib/knowledge-geometry";

/** ② 六簇二十二域：每簇一行标本图版卡，簇名旁的色条就是星盘外圈那段颜料。 */
export function ClusterAtlas() {
  return (
    <section className="home-section home-atlas" aria-labelledby="atlas-title">
      <header className="home-section__header">
        <h2 id="atlas-title" className="home-section__title">
          六簇二十二域
        </h2>
        <p className="home-section__meta">按星盘上的顺序，从宇宙与自然一路走回数理与技术</p>
      </header>
      {getClustersWithDomains(DOMAINS).map((cluster) => (
        <section
          key={cluster.id}
          className="home-cluster"
          aria-labelledby={`cluster-${cluster.id}`}
          style={{ ["--cluster-pigment" as string]: pigmentVar(cluster.id) }}
        >
          <header className="home-cluster__header">
            <h3 id={`cluster-${cluster.id}`} className="home-cluster__title">
              {cluster.label}
            </h3>
            <span className="home-cluster__en">{cluster.en}</span>
            <span className="home-cluster__rule" aria-hidden="true" />
            <span className="home-cluster__count">{cluster.domains.length} 个领域</span>
          </header>
          <div className="home-cluster__grid">
            {[...cluster.domains]
              .sort((a, b) => domainWedge(a.id).index - domainWedge(b.id).index)
              .map((domain) => (
                <DomainCard key={domain.id} domain={domain} />
              ))}
          </div>
        </section>
      ))}
    </section>
  );
}
