import Link from "next/link";
import type { SummitClusterGroup } from "@/lib/summit-catalog";
import type { SummitNodeRecord } from "@/lib/summit-model";

type RelationLink = {
  i: number;
  d: string;
  l: string;
  h: string | null;
};

/** 山体页：簇、领域名、五条汇流。文章在学科页。 */
export function SummitOverview({
  groups,
  beacons,
}: {
  groups: readonly SummitClusterGroup[];
  beacons: readonly { id: string; title: string }[];
}) {
  return (
    <div className="summit-directory">
      <BeaconList beacons={beacons} />
      <h2 id="summit-catalog-title">按学科查阅</h2>
      {groups.map((cluster) => (
        <details key={cluster.id} className="summit-cluster">
          <summary>{cluster.label}</summary>
          <ul>
            {cluster.domains.map((domain) => (
              <li key={domain.id}>
                <Link id={`summit-domain-${domain.id}`} href={`/knowledge-summit/${domain.id}`}>
                  {domain.seal} {domain.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** 一个学科的文章。没有脚本也能顺着链接读下去。 */
export function SummitDirectory({
  groups,
  nodes,
}: {
  groups: readonly SummitClusterGroup[];
  nodes: readonly SummitNodeRecord[];
}) {
  return (
    <div className="summit-directory">
      <h2 id="summit-catalog-title">按层级查阅</h2>
      {groups.map((cluster) => (
        <details key={cluster.id} className="summit-cluster" open>
          <summary>{cluster.label}</summary>
          {cluster.domains.map((domain) => (
            <details
              key={domain.id}
              id={`summit-domain-${domain.id}`}
              className="summit-domain"
              open
            >
              <summary>
                {domain.seal} {domain.name}
              </summary>
              {domain.levels.map((level) => (
                <section key={level.level} aria-label={`L${level.level} ${level.label}`}>
                  <h3>
                    L{level.level} {level.label}
                  </h3>
                  <ul>
                    {level.nodes.map((node) => (
                      <li key={node.id}>
                        <NodeLink node={node} nodes={nodes} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}

function BeaconList({ beacons }: { beacons: readonly { id: string; title: string }[] }) {
  return (
    <section aria-labelledby="summit-beacons-title">
      <h2 id="summit-beacons-title">汇流</h2>
      <ul>
        {beacons.map((beacon) => (
          <li key={beacon.id}>
            <Link href={`/knowledge-confluence/${beacon.id}`}>{beacon.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NodeLink({ node, nodes }: { node: SummitNodeRecord; nodes: readonly SummitNodeRecord[] }) {
  const extras = {
    id: `summit-node-${node.index}`,
    "data-level": node.level,
    "data-dek": node.dek || undefined,
    "data-links": JSON.stringify({
      p: relationLinks(node.prereq, nodes),
      n: relationLinks(node.neighbors, nodes),
    }),
  };
  if (!node.url) return <span {...extras}>{node.label}</span>;
  return (
    <Link {...extras} href={node.url}>
      {node.label}
    </Link>
  );
}

function relationLinks(
  indexes: readonly number[],
  nodes: readonly SummitNodeRecord[]
): RelationLink[] {
  return indexes.flatMap((index) => {
    const target = nodes[index];
    if (!target) return [];
    return [{ i: target.index, d: target.routeDomain, l: target.label, h: target.url }];
  });
}
