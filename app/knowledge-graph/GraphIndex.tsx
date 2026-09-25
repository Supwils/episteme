import Link from "next/link";
import { DOMAINS } from "@/lib/data";
import { getClustersWithDomains } from "@/lib/domain-clusters";
import { getDomainStats, SITE_TOTALS } from "@/lib/site-stats";
import { APP_URLS } from "@/lib/urls";

/**
 * The graph as plain links — clusters → domains → most connected nodes. It sits
 * under the canvas so crawlers, no-JS readers and screen readers get the same
 * map in text.
 */
export function GraphIndex() {
  return (
    <section aria-labelledby="graph-index-title" className="bg-bg-deep w-full px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 id="graph-index-title" className="font-display text-fg-primary text-3xl font-semibold">
          按学科浏览
        </h2>
        <p className="text-fg-secondary mt-3">
          {SITE_TOTALS.graphNodes} 个知识节点，分布在 {SITE_TOTALS.domains}{" "}
          个学科。下面按学科列出连接最多的节点。
        </p>
        {getClustersWithDomains(DOMAINS).map((cluster) => (
          <section key={cluster.id} className="mt-12" aria-labelledby={`graph-index-${cluster.id}`}>
            <h3
              id={`graph-index-${cluster.id}`}
              className="text-fg-primary border-border-subtle border-b pb-2 text-xl font-semibold"
            >
              {cluster.label}
            </h3>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {cluster.domains.map((domain) => {
                const stats = getDomainStats(domain.id);
                return (
                  <div key={domain.id}>
                    <h4 className="text-fg-primary font-semibold">
                      <Link href={APP_URLS[domain.id]} className="hover:underline">
                        {domain.title}
                      </Link>
                      <span className="text-fg-muted ml-2 text-sm font-normal">
                        {stats.graphNodes} 个节点
                      </span>
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {stats.hubs.map((hub) => (
                        <li key={hub.url}>
                          <Link href={hub.url} className="text-fg-secondary hover:text-fg-primary">
                            {hub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
