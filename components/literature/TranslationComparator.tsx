"use client";

import { useMemo, useState } from "react";
import { TRANSLATION_PAIRS, translationPairById } from "@/lib/literature/translation-pairs";

export function TranslationComparator() {
  const [pairId, setPairId] = useState(TRANSLATION_PAIRS[0]!.id);
  const pair = useMemo(() => translationPairById(pairId), [pairId]);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {TRANSLATION_PAIRS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === pairId}
            onClick={() => setPairId(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === pairId
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="text-fg-muted mb-3 text-[12px]">{pair.sourceLabel}</p>
      <p className="text-fg-primary mb-4 text-[15px] leading-relaxed">
        {pair.sourceLines.join("　")}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Side side={pair.left} />
        <Side side={pair.right} />
      </div>
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">{pair.contrast}</p>
    </div>
  );
}

function Side({
  side,
}: {
  side: { translator: string; edition: string; lines: readonly string[] };
}) {
  return (
    <figure className="border-border-faint bg-bg-elevated rounded-xl border p-3">
      <figcaption className="text-fg-muted mb-2 text-[12px]">
        {side.translator}
        <span className="mt-0.5 block">{side.edition}</span>
      </figcaption>
      <blockquote className="text-fg-primary space-y-1 text-[14px] leading-relaxed">
        {side.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </blockquote>
    </figure>
  );
}
