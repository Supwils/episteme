"use client";

import { useState } from "react";
import { CHIP_STAGES } from "@/lib/engineering/chip-process";

export function ChipProcessFlow() {
  const [activeId, setActiveId] = useState(CHIP_STAGES[0]!.id);
  const active = CHIP_STAGES.find((stage) => stage.id === activeId)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <ol className="mb-5 flex flex-wrap gap-2" aria-label="芯片前道与封装步骤">
        {CHIP_STAGES.map((stage) => (
          <li key={stage.id}>
            <button
              type="button"
              aria-pressed={stage.id === activeId}
              onClick={() => setActiveId(stage.id)}
              className={`rounded-full border px-3 py-1.5 text-[12px] ${
                stage.id === activeId
                  ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                  : "border-border-faint text-fg-muted"
              }`}
            >
              {stage.order}. {stage.name}
            </button>
          </li>
        ))}
      </ol>
      <article>
        <h3 className="text-fg-primary mb-2 text-lg font-semibold">
          第 {active.order} 步 · {active.name}
        </h3>
        <p className="text-fg-secondary mb-3 text-[14.5px] leading-relaxed">{active.what}</p>
        <p className="text-fg-secondary mb-3 text-[14.5px] leading-relaxed">
          <span className="text-fg-primary font-medium">为什么要这一步：</span>
          {active.why}
        </p>
        <p className="text-fg-muted text-[13px] leading-relaxed">{active.not}</p>
      </article>
    </div>
  );
}
