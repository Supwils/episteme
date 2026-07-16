"use client";

import { useMemo, useRef, useState } from "react";
import {
  createKnowledgeGapJourneyArchive,
  parseKnowledgeGapJourneyArchive,
  previewKnowledgeGapJourneyImport,
  type KnowledgeGapJourneyArchive,
  type KnowledgeGapJourneyArchiveError,
  type KnowledgeGapJourneyConflictResolution,
} from "@/lib/knowledge-gap-journey-archive";
import {
  importKnowledgeGapJourneyArchive,
  resetKnowledgeGapJourneys,
} from "@/lib/knowledge-gap-journey-store";
import type { KnowledgeGapJourney } from "@/lib/knowledge-gap-journey";

const ERROR_LABELS: Record<KnowledgeGapJourneyArchiveError | "invalid-json", string> = {
  "invalid-json": "文件不是有效的 JSON。",
  "invalid-format": "这不是路线档案文件。",
  "unsupported-version": "档案版本暂不受支持。",
  "invalid-export-date": "档案导出时间无效。",
  "invalid-journeys": "档案中的路线结构或字段无效。",
  "too-many-journeys": "单个档案最多包含 16 条路线。",
  "duplicate-targets": "档案包含重复的目标路线。",
};

export function KnowledgeJourneyArchiveActions({
  journeys,
}: {
  journeys: readonly KnowledgeGapJourney[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [incoming, setIncoming] = useState<KnowledgeGapJourneyArchive | null>(null);
  const [importError, setImportError] = useState<keyof typeof ERROR_LABELS | null>(null);
  const [resolution, setResolution] =
    useState<KnowledgeGapJourneyConflictResolution>("keep-existing");
  const [confirmReset, setConfirmReset] = useState(false);
  const preview = useMemo(
    () => (incoming ? previewKnowledgeGapJourneyImport(journeys, incoming.journeys) : null),
    [incoming, journeys]
  );

  const exportArchive = () => {
    const payload = createKnowledgeGapJourneyArchive(journeys);
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "episteme-learning-journeys.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const closePreview = () => {
    setIncoming(null);
    setResolution("keep-existing");
  };

  return (
    <div className="border-border-faint border-t px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={journeys.length === 0}
          onClick={exportArchive}
          className="border-border-faint text-fg-muted hover:text-fg-primary h-9 border px-3 text-[10px] disabled:opacity-40"
        >
          导出路线档案
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-border-faint text-fg-muted hover:text-fg-primary h-9 border px-3 text-[10px]"
        >
          导入路线档案
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="导入路线档案 JSON"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            try {
              const parsed = parseKnowledgeGapJourneyArchive(
                JSON.parse(await file.text()) as unknown
              );
              if (!parsed.ok) {
                setImportError(parsed.error);
                setIncoming(null);
              } else {
                setIncoming(parsed.archive);
                setImportError(null);
                setResolution("keep-existing");
              }
            } catch {
              setImportError("invalid-json");
              setIncoming(null);
            }
            event.target.value = "";
          }}
        />
        {journeys.length > 0 ? (
          confirmReset ? (
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-fg-muted text-[10px]">清空全部 {journeys.length} 条路线？</span>
              <button
                type="button"
                onClick={() => {
                  resetKnowledgeGapJourneys();
                  setConfirmReset(false);
                  closePreview();
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
              清空全部路线
            </button>
          )
        ) : null}
        {importError ? (
          <span role="alert" className="text-fg-secondary text-[10px]">
            {ERROR_LABELS[importError]}
          </span>
        ) : null}
      </div>

      {incoming && preview ? (
        <div className="border-border-faint bg-bg-base mt-4 border p-4" role="status">
          <p className="text-fg-primary text-[10px]">导入前预览</p>
          <p className="text-fg-muted mt-1 text-[9px] leading-5">
            文件含 {preview.incomingCount} 条路线：新增 {preview.newCount} 条，冲突{" "}
            {preview.conflicts.length} 条；确认后本机共有 {preview.projectedCount} 条。
            {preview.droppedCount > 0
              ? ` 超出上限的 ${preview.droppedCount} 条较早路线不会保留。`
              : ""}
          </p>
          {preview.conflicts.length > 0 ? (
            <>
              <p className="text-fg-disabled mt-2 text-[9px] leading-5">
                冲突目标：{preview.conflicts.map((journey) => journey.target.label).join("、")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" aria-label="路线冲突处理方式">
                <button
                  type="button"
                  aria-pressed={resolution === "keep-existing"}
                  onClick={() => setResolution("keep-existing")}
                  className={`min-h-9 border px-3 text-[9px] ${
                    resolution === "keep-existing"
                      ? "border-fg-secondary text-fg-primary"
                      : "border-border-faint text-fg-muted"
                  }`}
                >
                  保留本机版本
                </button>
                <button
                  type="button"
                  aria-pressed={resolution === "replace-existing"}
                  onClick={() => setResolution("replace-existing")}
                  className={`min-h-9 border px-3 text-[9px] ${
                    resolution === "replace-existing"
                      ? "border-fg-secondary text-fg-primary"
                      : "border-border-faint text-fg-muted"
                  }`}
                >
                  采用导入版本
                </button>
              </div>
            </>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                importKnowledgeGapJourneyArchive(incoming, resolution);
                closePreview();
              }}
              className="bg-fg-primary text-bg-base min-h-9 px-3 text-[9px]"
            >
              确认导入
            </button>
            <button
              type="button"
              onClick={closePreview}
              className="border-border-faint text-fg-muted min-h-9 border px-3 text-[9px]"
            >
              取消
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
