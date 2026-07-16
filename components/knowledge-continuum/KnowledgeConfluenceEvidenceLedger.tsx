import Link from "next/link";
import {
  KNOWLEDGE_CONFLUENCE_EVIDENCE_META,
  KNOWLEDGE_CONFLUENCE_REVIEW_META,
  KNOWLEDGE_CONFLUENCE_ROLE_META,
  type KnowledgeConfluence,
} from "@/lib/knowledge-confluence";

export function KnowledgeConfluenceEvidenceLedger({
  confluence,
}: {
  confluence: KnowledgeConfluence;
}) {
  const sourceCount = new Set(
    confluence.strands.flatMap((strand) => strand.evidence.sources.map((source) => source.id))
  ).size;

  return (
    <section
      className="border-border-faint border-t"
      aria-labelledby={`${confluence.id}-evidence-ledger`}
      data-testid="knowledge-confluence-evidence-ledger"
    >
      <div className="border-border-faint grid gap-3 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
            evidence ledger
          </p>
          <h4
            id={`${confluence.id}-evidence-ledger`}
            className="text-fg-primary mt-1 text-sm font-medium"
          >
            路线证据台账
          </h4>
          <p className="text-fg-muted mt-2 max-w-3xl text-[11px] leading-5">
            每条路线公开内部节点出处、外部证据、可支持的主张和仍有争议的边界。审阅状态只说明台账核对情况，不代表结论已经确定。
          </p>
        </div>
        <p className="text-fg-disabled text-[10px] lg:text-right">
          {confluence.strands.length} 条路线 · {sourceCount} 个外部来源
        </p>
      </div>

      <div className="divide-border-faint divide-y">
        {confluence.strands.map((strand, index) => {
          const evidence = strand.evidence;
          const role = KNOWLEDGE_CONFLUENCE_ROLE_META[strand.role];
          const evidenceType = KNOWLEDGE_CONFLUENCE_EVIDENCE_META[evidence.evidenceType];
          const review = KNOWLEDGE_CONFLUENCE_REVIEW_META[evidence.reviewStatus];
          const sourceHref = evidence.sourceNode.articleHref ?? evidence.sourceNode.graphHref;
          return (
            <article
              key={strand.id}
              className="grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(180px,0.45fr)_minmax(0,1.55fr)]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px]" style={{ color: role.color }}>
                    0{index + 1} · {role.label}
                  </span>
                  <span
                    className="border px-2 py-0.5 text-[9px]"
                    style={{ borderColor: review.color, color: review.color }}
                    title={review.description}
                  >
                    {review.label}
                  </span>
                </div>
                <h5 className="text-fg-primary mt-2 text-xs font-medium">{strand.title}</h5>
                <p className="text-fg-disabled mt-2 text-[9px] leading-4">
                  {evidenceType.label} · 复核于 {evidence.reviewedAt}
                </p>
                <p className="text-fg-muted mt-2 text-[10px] leading-4">
                  {evidenceType.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-fg-disabled text-[9px]">节点来源</p>
                  <p className="text-fg-secondary mt-1 text-[11px] leading-5">
                    {evidence.sourcePathTitle} → L{evidence.sourceNode.level}{" "}
                    <Link href={sourceHref} className="text-fg-primary border-b border-current">
                      {evidence.sourceNode.label}
                    </Link>
                    <span className="text-fg-disabled">（{evidence.sourceNode.domainLabel}）</span>
                  </p>
                  <p className="text-fg-disabled mt-3 text-[9px]">可支持</p>
                  <p className="text-fg-secondary mt-1 text-[11px] leading-5">{evidence.claim}</p>
                </div>

                <div>
                  <p className="text-fg-disabled text-[9px]">争议与不能推出</p>
                  <p className="text-fg-muted mt-1 text-[11px] leading-5">{evidence.dispute}</p>
                  <p className="text-fg-disabled mt-3 text-[9px]">外部来源</p>
                  <ul className="mt-1 space-y-1.5">
                    {evidence.sources.map((source) => (
                      <li key={source.id} className="text-[10px] leading-4">
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-fg-secondary hover:text-fg-primary border-b border-current"
                        >
                          {source.publisher} · {source.title} ({source.year})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
