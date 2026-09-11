"use client";

import { useState } from "react";
import { TRADITION_NODES, traditionsInEpoch, type EpochId } from "@/lib/religion/world-map-data";

const EPOCHS: readonly { id: EpochId; label: string }[] = [
  { id: "ancient", label: "古代" },
  { id: "medieval", label: "中古" },
  { id: "modern", label: "现代" },
];

export function WorldReligionMap() {
  const [epoch, setEpoch] = useState<EpochId>("ancient");
  const visible = traditionsInEpoch(epoch);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {EPOCHS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === epoch}
            onClick={() => setEpoch(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === epoch
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {visible.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              aria-label={node.label}
              className="border-border-faint text-fg-primary w-full rounded-xl border px-3 py-2 text-left text-[13.5px]"
            >
              {node.label}
              <span className="text-fg-muted mt-1 block text-[12px]">{node.region}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="text-fg-muted mt-4 text-[12.5px]">
        共 {TRADITION_NODES.length} 条示意传统。椭圆不是地球，数字不是普查。
      </p>
    </div>
  );
}
