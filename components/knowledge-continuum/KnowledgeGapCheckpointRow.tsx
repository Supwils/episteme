"use client";

import { useEffect, useId, useState } from "react";
import type {
  KnowledgeGapCheckpoint,
  KnowledgeGapCheckpointKey,
  KnowledgeGapJourneyStep,
} from "@/lib/knowledge-gap-journey";

const CHECKPOINT_LABELS: readonly {
  key: KnowledgeGapCheckpointKey;
  label: string;
}[] = [
  { key: "reading", label: "阅读正文" },
  { key: "practice", label: "完成练习" },
  { key: "explanation", label: "自己的话解释" },
  { key: "sourceCheck", label: "核对来源" },
];

export function KnowledgeGapCheckpointRow({
  step,
  checkpoint,
  mastered,
  onCheckpointChange,
  onNoteChange,
  onConfirmMastered,
}: {
  step: KnowledgeGapJourneyStep;
  checkpoint?: KnowledgeGapCheckpoint;
  mastered: boolean;
  onCheckpointChange: (key: KnowledgeGapCheckpointKey, checked: boolean) => void;
  onNoteChange: (note: string) => void;
  onConfirmMastered: () => void;
}) {
  const noteId = useId();
  const [note, setNote] = useState(checkpoint?.note ?? "");
  const completedCount = CHECKPOINT_LABELS.filter(({ key }) => checkpoint?.[key]).length;

  useEffect(() => {
    setNote(checkpoint?.note ?? "");
  }, [checkpoint?.note]);

  return (
    <li className="border-border-faint grid gap-4 border-b py-4 last:border-b-0 lg:grid-cols-[minmax(180px,0.7fr)_minmax(0,1.3fr)]">
      <div>
        <div className="flex items-start gap-3">
          <span className="text-fg-disabled mt-0.5 font-mono text-[9px]">
            {String(step.order).padStart(2, "0")}
          </span>
          <div>
            <p className="text-fg-primary text-[11px] leading-5">{step.label}</p>
            <p className="text-fg-muted mt-1 text-[9px]">
              {step.domainLabel} · L{step.level} · {step.evidenceLabel}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 pl-7">
          <span className="text-fg-disabled font-mono text-[9px]">证据 {completedCount}/4</span>
          <button
            type="button"
            disabled={mastered}
            onClick={onConfirmMastered}
            aria-label={`${step.label}：${mastered ? "已明确确认掌握" : "确认已掌握"}`}
            className="border-border-faint text-fg-secondary hover:text-fg-primary min-h-9 border px-3 text-[9px] disabled:cursor-default disabled:opacity-55"
          >
            {mastered ? "已明确确认掌握" : "确认已掌握"}
          </button>
        </div>
      </div>

      <div>
        <fieldset>
          <legend className="sr-only">{step.label}的学习证据</legend>
          <div className="grid gap-px border border-[var(--color-border-faint)] bg-[var(--color-border-faint)] sm:grid-cols-2 xl:grid-cols-4">
            {CHECKPOINT_LABELS.map(({ key, label }) => (
              <label
                key={key}
                className="bg-bg-base text-fg-muted hover:text-fg-primary flex min-h-10 cursor-pointer items-center gap-2 px-3 text-[9px]"
              >
                <input
                  type="checkbox"
                  aria-label={`${step.label}：${label}`}
                  checked={checkpoint?.[key] ?? false}
                  onChange={(event) => onCheckpointChange(key, event.target.checked)}
                  className="accent-fg-primary h-3.5 w-3.5"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <label htmlFor={noteId} className="text-fg-disabled mt-3 block text-[9px]">
          证据备注（可选，最多 500 字）
        </label>
        <textarea
          id={noteId}
          value={note}
          maxLength={500}
          rows={2}
          placeholder="记录练习结果、复述要点或来源疑问"
          onChange={(event) => setNote(event.target.value)}
          onBlur={() => onNoteChange(note)}
          className="border-border-faint bg-bg-base text-fg-secondary placeholder:text-fg-disabled mt-1 w-full resize-y border px-3 py-2 text-[10px] leading-5 outline-none focus:border-[var(--color-fg-muted)]"
        />
      </div>
    </li>
  );
}
