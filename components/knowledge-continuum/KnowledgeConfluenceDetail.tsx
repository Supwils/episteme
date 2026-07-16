"use client";

import { useEffect, useState } from "react";
import {
  KNOWLEDGE_CONFLUENCE_ROLE_META,
  type KnowledgeConfluence,
} from "@/lib/knowledge-confluence";
import type { LearningPlanMinutes } from "@/lib/knowledge-learning-plan";
import {
  KnowledgeConfluenceMap,
  type KnowledgeConfluenceRoleFilter,
} from "./KnowledgeConfluenceMap";
import { KnowledgeConfluencePlan } from "./KnowledgeConfluencePlan";
import { KnowledgeConfluenceEvidenceLedger } from "./KnowledgeConfluenceEvidenceLedger";

const ROLE_FILTERS: readonly { id: KnowledgeConfluenceRoleFilter; label: string }[] = [
  { id: "all", label: "全部路线" },
  { id: "required", label: "必要主线" },
  { id: "complementary", label: "互补视角" },
  { id: "contested", label: "争议检验" },
];

export function KnowledgeConfluenceDetail({
  confluence,
  minutes,
  onMinutesChange,
}: {
  confluence: KnowledgeConfluence;
  minutes: LearningPlanMinutes;
  onMinutesChange: (minutes: LearningPlanMinutes) => void;
}) {
  const [roleFilter, setRoleFilter] = useState<KnowledgeConfluenceRoleFilter>("all");
  const [selectedStrandId, setSelectedStrandId] = useState(confluence.strands[0]!.id);

  useEffect(() => {
    const firstVisible = confluence.strands.find(
      (strand) => roleFilter === "all" || strand.role === roleFilter
    );
    if (!firstVisible) return;
    const selectedIsVisible = confluence.strands.some(
      (strand) =>
        strand.id === selectedStrandId && (roleFilter === "all" || strand.role === roleFilter)
    );
    if (!selectedIsVisible) setSelectedStrandId(firstVisible.id);
  }, [confluence.strands, roleFilter, selectedStrandId]);

  return (
    <>
      <div className="border-border-faint grid gap-4 border-b px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h4 className="text-fg-primary text-sm font-medium">{confluence.question}</h4>
          <p className="text-fg-muted mt-2 max-w-4xl text-[11px] leading-5">{confluence.summary}</p>
        </div>
        <div
          className="border-border-faint flex max-w-full overflow-x-auto border"
          role="group"
          aria-label="路线角色筛选"
        >
          {ROLE_FILTERS.map((filter) => {
            const active = roleFilter === filter.id;
            const color =
              filter.id === "all" ? undefined : KNOWLEDGE_CONFLUENCE_ROLE_META[filter.id].color;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setRoleFilter(filter.id)}
                style={active && color ? { color } : undefined}
                className={`h-10 min-w-20 px-3 text-[10px] transition-colors motion-reduce:transition-none ${
                  active && filter.id === "all"
                    ? "bg-fg-primary text-bg-base"
                    : "text-fg-muted hover:text-fg-primary"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <KnowledgeConfluenceMap
        confluence={confluence}
        roleFilter={roleFilter}
        selectedStrandId={selectedStrandId}
        onSelectStrand={setSelectedStrandId}
      />

      <KnowledgeConfluenceEvidenceLedger confluence={confluence} />

      <div className="border-border-faint border-t px-4 py-5 sm:px-6">
        <p className="text-fg-disabled text-[9px]">仍未解决的问题</p>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {confluence.unresolvedQuestions.map((question, index) => (
            <li
              key={question}
              className="text-fg-secondary border-border-faint border-l pl-3 text-[11px] leading-5"
            >
              <span className="text-fg-disabled mr-2 font-mono">0{index + 1}</span>
              {question}
            </li>
          ))}
        </ul>
      </div>

      <KnowledgeConfluencePlan
        confluence={confluence}
        minutes={minutes}
        onMinutesChange={onMinutesChange}
      />
    </>
  );
}
