"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  KnowledgeRelationReviewItem,
  KnowledgeRelationTargetImpact,
} from "@/lib/knowledge-relation-review";
import type { LearningRelationRole } from "@/subjects/knowledge-graph/data/learning-relation-types";
import { KNOWLEDGE_FRONTIER_STATUS_META } from "@/lib/knowledge-frontier";

type RoleFilter = "all" | LearningRelationRole;

const ROLE_FILTERS: readonly { id: RoleFilter; label: string }[] = [
  { id: "all", label: "全部关系" },
  { id: "required-prerequisite", label: "必要前置" },
  { id: "recommended-background", label: "推荐背景" },
  { id: "related-context", label: "争议语境" },
];

function RelationRow({
  relation,
  target,
}: {
  relation: KnowledgeRelationReviewItem;
  target: KnowledgeRelationTargetImpact["target"];
}) {
  const isRequired = relation.role === "required-prerequisite";
  return (
    <li className="border-border-faint grid gap-3 border-t py-4 md:grid-cols-[minmax(0,0.72fr)_28px_minmax(0,1fr)] md:items-start">
      <div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0"
            style={{ backgroundColor: relation.source.domainColor }}
            aria-hidden="true"
          />
          <span className="text-fg-muted text-[9px]">
            {relation.source.domainLabel} · L{relation.source.level}
          </span>
        </div>
        <p className="text-fg-primary mt-1 text-xs leading-5 font-medium">
          {relation.source.label}
        </p>
        {relation.source.articleHref ? (
          <Link
            href={relation.source.articleHref}
            className="text-fg-muted hover:text-fg-primary mt-2 inline-block text-[9px] underline underline-offset-4"
          >
            核对来源正文
          </Link>
        ) : null}
      </div>
      <div className="text-fg-disabled flex items-center gap-2 md:block md:pt-3 md:text-center">
        <span className="font-mono text-[9px] md:block">{isRequired ? "━━" : "┄┄"}</span>
        <span className="text-[9px] md:mt-1 md:block">→</span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`border px-2 py-0.5 text-[9px] ${
              isRequired ? "border-fg-muted text-fg-primary" : "border-border-faint text-fg-muted"
            }`}
          >
            {relation.roleLabel}
          </span>
          <span className="text-fg-disabled text-[9px]">指向：{target.label}</span>
        </div>
        <p className="text-fg-secondary mt-2 text-[10px] leading-5">{relation.rationale}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1" aria-label="关系证据出处">
          {relation.evidence.map((evidence) =>
            evidence.href ? (
              <Link
                key={`${relation.id}:${evidence.ref}`}
                href={evidence.href}
                className="text-fg-muted hover:text-fg-primary text-[9px] underline underline-offset-4"
              >
                {evidence.label}
              </Link>
            ) : (
              <span key={`${relation.id}:${evidence.ref}`} className="text-fg-disabled text-[9px]">
                {evidence.label}
              </span>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export function KnowledgeRelationReviewDetail({
  impact,
}: {
  impact: KnowledgeRelationTargetImpact;
}) {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const relations = useMemo(
    () =>
      roleFilter === "all"
        ? impact.relations
        : impact.relations.filter((relation) => relation.role === roleFilter),
    [impact.relations, roleFilter]
  );
  const beforeStatus = KNOWLEDGE_FRONTIER_STATUS_META[impact.baselineStatus];
  const currentStatus = KNOWLEDGE_FRONTIER_STATUS_META[impact.currentStatus];

  return (
    <div data-testid="knowledge-relation-review-detail">
      <div className="border-border-faint grid gap-5 border-t px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.5fr)]">
        <div>
          <p className="text-fg-disabled text-[9px]">当前审校目标</p>
          <h5 className="text-fg-primary mt-1 text-sm font-medium">{impact.target.label}</h5>
          <p className="text-fg-muted mt-2 text-[10px] leading-5">
            {impact.confluenceTitle} · L{impact.target.level}；必要前置从
            {impact.baselineRequiredCount} 条增加到 {impact.currentRequiredCount} 条，完整依赖闭包从
            {impact.baselineRouteNodeCount} 个节点增加到 {impact.currentRouteNodeCount} 个。
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[9px]">
            <Link
              href={impact.confluenceHref}
              className="text-fg-secondary underline underline-offset-4"
            >
              查看汇流证据台账
            </Link>
            <Link
              href={impact.graphHref}
              className="text-fg-secondary underline underline-offset-4"
            >
              在图谱中核对
            </Link>
          </div>
        </div>
        <dl className="grid grid-cols-2 border-t border-l border-[var(--color-border-faint)]">
          <div className="border-r border-b border-[var(--color-border-faint)] p-3">
            <dt className="text-fg-disabled text-[9px]">个人档案 · v1</dt>
            <dd className="text-fg-primary mt-1 text-xs">{beforeStatus.label}</dd>
          </div>
          <div className="border-r border-b border-[var(--color-border-faint)] p-3">
            <dt className="text-fg-disabled text-[9px]">个人档案 · v2</dt>
            <dd className="text-fg-primary mt-1 text-xs">{currentStatus.label}</dd>
          </div>
          <div className="border-r border-b border-[var(--color-border-faint)] p-3">
            <dt className="text-fg-disabled text-[9px]">下游影响范围</dt>
            <dd className="text-fg-primary mt-1 font-mono text-xs">
              {impact.downstreamAffectedCount} 节点
            </dd>
          </div>
          <div className="border-r border-b border-[var(--color-border-faint)] p-3">
            <dt className="text-fg-disabled text-[9px]">循环风险</dt>
            <dd className="text-fg-primary mt-1 text-xs">
              {impact.cycleRisk === "none" ? "未发现" : "存在循环"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-border-faint border-t px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-fg-muted font-mono text-[9px] tracking-[0.16em] uppercase">
              relation evidence
            </p>
            <p className="text-fg-secondary mt-1 text-[10px]">
              实线参与解锁；虚线只扩展背景或检验争议，不改变可学状态。
            </p>
          </div>
          <div className="flex flex-wrap" role="group" aria-label="关系角色筛选">
            {ROLE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={roleFilter === filter.id}
                onClick={() => setRoleFilter(filter.id)}
                className={`border-border-faint min-h-9 border px-2.5 text-[9px] ${
                  roleFilter === filter.id
                    ? "bg-fg-primary text-bg-base"
                    : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4">
          {relations.map((relation) => (
            <RelationRow key={relation.id} relation={relation} target={impact.target} />
          ))}
        </ul>
      </div>
    </div>
  );
}
