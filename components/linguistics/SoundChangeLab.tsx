"use client";

import { useState } from "react";
import {
  SOUND_CHANGE_ASSESSMENT_LABELS,
  SOUND_CHANGE_CASES,
  SOUND_CHANGE_HYPOTHESIS_LABELS,
  type SoundChangeAssessment,
  type SoundChangeHypothesisId,
} from "@/subjects/linguistics/lib/sound-change-data";

const ASSESSMENT_COLORS: Record<SoundChangeAssessment, string> = {
  supported: "#4f9c96",
  limited: "#d4a552",
  contradicted: "#bd6b6b",
  "not-needed": "#7d8290",
};

export function SoundChangeLab() {
  const [caseId, setCaseId] = useState(SOUND_CHANGE_CASES[0]!.id);
  const [hypothesisId, setHypothesisId] = useState<SoundChangeHypothesisId>("regular");
  const activeCase = SOUND_CHANGE_CASES.find((item) => item.id === caseId)!;
  const hypothesis = activeCase.hypotheses[hypothesisId];
  const assessmentColor = ASSESSMENT_COLORS[hypothesis.assessment];

  return (
    <section
      className="border-border-subtle bg-bg-near my-12 overflow-hidden border"
      aria-labelledby="sound-change-title"
      data-testid="sound-change-lab"
    >
      <header className="border-border-faint border-b px-4 py-5 sm:px-6">
        <p className="text-fg-disabled font-mono text-[10px] tracking-[0.2em] uppercase">
          Evidence Lab · 5/5
        </p>
        <h2 id="sound-change-title" className="text-fg-primary mt-1 text-xl font-medium">
          音变证据实验室
        </h2>
        <p className="text-fg-muted mt-1 max-w-3xl text-sm leading-6">
          不自动生成祖语，也不按相似度猜词源。先观察成组对应和反例，再比较规则、条件、借用与类推哪种解释真正承担证据。
        </p>
      </header>

      <div className="border-border-faint border-b p-4 sm:p-6">
        <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          选择证据组
        </p>
        <div
          className="grid gap-px sm:grid-cols-2 xl:grid-cols-4"
          role="group"
          aria-label="音变证据组"
        >
          {SOUND_CHANGE_CASES.map((item) => {
            const active = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCaseId(item.id)}
                className="border-border-faint bg-bg-deep min-h-20 border px-3 py-3 text-left transition-colors motion-reduce:transition-none"
                style={
                  active ? { borderColor: "#4f9c96", boxShadow: "inset 3px 0 #4f9c96" } : undefined
                }
              >
                <span className="text-fg-primary block text-sm font-medium">{item.label}</span>
                <span className="text-fg-disabled mt-1 block text-xs leading-5">{item.family}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <div className="border-border-faint border-b p-4 sm:p-6 lg:border-r lg:border-b-0">
          <p className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
            观察问题
          </p>
          <h3 className="text-fg-primary mt-1 text-lg font-medium">{activeCase.question}</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="border-border-faint border-l pl-3">
              <dt className="text-fg-disabled text-xs">候选规则</dt>
              <dd className="text-fg-primary mt-1 text-sm leading-6">{activeCase.rule}</dd>
            </div>
            <div className="border-border-faint border-l pl-3">
              <dt className="text-fg-disabled text-xs">适用边界</dt>
              <dd className="text-fg-muted mt-1 text-sm leading-6">{activeCase.context}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2" role="list" aria-label={`${activeCase.label}证据对照`}>
            {activeCase.rows.map((row) => (
              <article
                key={`${activeCase.id}-${row.meaning}`}
                role="listitem"
                className="border-border-faint bg-bg-deep grid gap-2 border p-3 sm:grid-cols-[90px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div>
                  <p className="text-fg-disabled text-[10px]">意义</p>
                  <p className="text-fg-primary mt-1 text-sm font-medium">{row.meaning}</p>
                </div>
                <div>
                  <p className="text-fg-disabled text-[10px]">历史与比较</p>
                  <p className="text-fg-muted mt-1 text-xs leading-5">{row.earlier}</p>
                  <p className="text-fg-disabled mt-1 text-[11px]">{row.comparison}</p>
                </div>
                <div>
                  <p className="text-fg-disabled text-[10px]">结果</p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: row.counterexample ? "#d4a552" : "#4f9c96" }}
                  >
                    {row.outcome}
                  </p>
                  <p className="text-fg-muted mt-1 text-xs leading-5">{row.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="p-4 sm:p-6" aria-label="竞争解释审查">
          <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            选择解释
          </p>
          <div className="grid grid-cols-2 gap-px" role="group" aria-label="音变竞争解释">
            {(Object.keys(SOUND_CHANGE_HYPOTHESIS_LABELS) as SoundChangeHypothesisId[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={hypothesisId === id}
                  onClick={() => setHypothesisId(id)}
                  className="border-border-faint min-h-11 border px-2 text-xs transition-colors motion-reduce:transition-none"
                  style={
                    hypothesisId === id
                      ? {
                          color: ASSESSMENT_COLORS[activeCase.hypotheses[id].assessment],
                          background: "var(--color-bg-deep)",
                        }
                      : undefined
                  }
                >
                  {SOUND_CHANGE_HYPOTHESIS_LABELS[id]}
                </button>
              )
            )}
          </div>

          <div className="border-border-faint mt-4 border-t pt-4" aria-live="polite">
            <p className="font-mono text-[10px]" style={{ color: assessmentColor }}>
              {SOUND_CHANGE_ASSESSMENT_LABELS[hypothesis.assessment]}
            </p>
            <p className="text-fg-primary mt-2 text-sm leading-6">{hypothesis.claim}</p>
            <p className="text-fg-muted mt-3 text-xs leading-5">{hypothesis.evidence}</p>
            <div className="border-border-faint mt-4 border-l pl-3">
              <p className="text-fg-disabled text-[10px]">下一项检查</p>
              <p className="text-fg-muted mt-1 text-xs leading-5">{hypothesis.nextCheck}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-fg-disabled text-xs">当前推断</dt>
              <dd className="text-fg-primary mt-1 text-sm leading-6">{activeCase.inference}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled text-xs">不可越过的边界</dt>
              <dd className="text-fg-muted mt-1 text-xs leading-5">{activeCase.caution}</dd>
            </div>
          </dl>

          <a
            href={activeCase.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-10 items-center text-xs underline underline-offset-4"
            style={{ color: "#4f9c96" }}
          >
            {activeCase.sourceLabel} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
