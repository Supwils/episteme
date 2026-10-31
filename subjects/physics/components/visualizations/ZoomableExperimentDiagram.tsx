"use client";

import { useId, useRef, useState, type ReactElement } from "react";
import { useModalDialog } from "@/components/interaction/useModalDialog";

interface ZoomableExperimentDiagramProps {
  title: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
  minimumFontSize: number;
  children: ReactElement;
}

export function ZoomableExperimentDiagram({
  title,
  viewBoxWidth,
  viewBoxHeight,
  minimumFontSize,
  children,
}: ZoomableExperimentDiagramProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const expandedWidth = Math.ceil(viewBoxWidth * Math.max(1, 12 / minimumFontSize));

  useModalDialog(open, dialogRef, {
    initialFocusRef: closeRef,
    returnFocusRef: triggerRef,
  });

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="border-fg-disabled/30 bg-bg-deep overflow-hidden rounded-xl border">
        {/* 只挂载一份 SVG，避免概览与对话框的渐变等 ID 冲突。 */}
        {open ? (
          <div
            className="text-fg-tertiary flex items-center justify-center text-sm"
            style={{ aspectRatio: `${viewBoxWidth} / ${viewBoxHeight}` }}
          >
            图示已在放大窗口中打开
          </div>
        ) : (
          children
        )}
      </div>
      <button
        ref={triggerRef}
        type="button"
        className="border-fg-disabled/40 text-fg-secondary hover:bg-bg-elevated focus-visible:outline-accent min-h-11 self-start rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-dialog`}
        onClick={() => setOpen(true)}
      >
        放大图示
      </button>
      {open && (
        <dialog
          ref={dialogRef}
          id={`${id}-dialog`}
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-hint`}
          aria-modal="true"
          className="border-fg-disabled/40 bg-bg-deep text-fg-primary fixed inset-0 m-auto max-h-[calc(100dvh-1rem)] w-[calc(100dvw-1rem)] max-w-6xl flex-col overflow-hidden rounded-xl border p-0 backdrop:bg-black/70 open:flex"
          onCancel={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <div className="border-fg-disabled/30 flex shrink-0 items-start gap-3 border-b p-3">
            <div className="min-w-0 flex-1">
              <h2 id={`${id}-title`} className="text-base font-medium">
                {title}
              </h2>
              <p id={`${id}-hint`} className="text-fg-tertiary mt-1 text-xs">
                横向或纵向滚动查看细节；关闭后可调整参数。
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="border-fg-disabled/40 hover:bg-bg-elevated focus-visible:outline-accent min-h-11 shrink-0 rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => setOpen(false)}
            >
              关闭
            </button>
          </div>
          <div
            role="region"
            aria-label={`${title}放大视图，可滚动`}
            tabIndex={0}
            className="focus-visible:outline-accent max-h-[calc(100dvh-9rem)] min-h-0 overflow-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <div style={{ width: expandedWidth }}>{children}</div>
          </div>
        </dialog>
      )}
    </div>
  );
}
