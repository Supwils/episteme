"use client";

import { useRef, useState } from "react";
import type { KnowledgeProfileSnapshot } from "@/lib/knowledge-profile";
import type { KnowledgeProfileNodeSummary } from "@/lib/knowledge-frontier-view";

export function KnowledgeProfileActions({
  profile,
  knownNodes,
  onImport,
  onReset,
}: {
  profile: KnowledgeProfileSnapshot;
  knownNodes: readonly KnowledgeProfileNodeSummary[];
  onImport: (value: unknown) => void;
  onReset: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState(false);

  const exportProfile = () => {
    const confirmedAt = new Map(profile.entries.map((entry) => [entry.nodeId, entry.confirmedAt]));
    const payload = {
      format: "episteme-knowledge-profile",
      version: 1,
      exportedAt: new Date().toISOString(),
      entries: knownNodes.map((node) => ({
        nodeId: node.id,
        label: node.label,
        domainId: node.domainId,
        domainLabel: node.domainLabel,
        level: node.level,
        confirmedAt: confirmedAt.get(node.id),
      })),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "episteme-knowledge-profile.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={exportProfile}
        disabled={knownNodes.length === 0}
        className="border-border-faint text-fg-muted hover:text-fg-primary h-9 border px-3 text-[10px] disabled:opacity-40"
      >
        导出档案
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border-border-faint text-fg-muted hover:text-fg-primary h-9 border px-3 text-[10px]"
      >
        导入档案
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-label="导入知识档案 JSON"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            const value = JSON.parse(await file.text()) as unknown;
            const entries =
              value && typeof value === "object" && "entries" in value
                ? (value as { entries: unknown }).entries
                : undefined;
            onImport({ version: 1, entries });
            setImportError(false);
          } catch {
            setImportError(true);
          }
          event.target.value = "";
        }}
      />
      {profile.entries.length > 0 ? (
        confirmReset ? (
          <span className="flex items-center gap-2">
            <span className="text-fg-muted text-[10px]">清空所有确认？</span>
            <button
              type="button"
              onClick={() => {
                onReset();
                setConfirmReset(false);
              }}
              className="text-fg-secondary hover:text-fg-primary h-9 border-b border-current text-[10px]"
            >
              确认清空
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="text-fg-muted hover:text-fg-primary h-9 text-[10px]"
            >
              取消
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-fg-muted hover:text-fg-primary h-9 px-2 text-[10px]"
          >
            清空档案
          </button>
        )
      ) : null}
      {importError ? (
        <span role="alert" className="text-fg-secondary text-[10px]">
          无法读取该档案。
        </span>
      ) : null}
    </div>
  );
}
