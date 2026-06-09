import { PRESETS } from "./plotter-utils";

interface PlotterToolbarProps {
  presetIndex: number;
  showDerivative: boolean;
  showIntegral: boolean;
  zoom: number;
  onPresetChange: (index: number) => void;
  onToggleDerivative: () => void;
  onToggleIntegral: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function PlotterToolbar({
  presetIndex,
  showDerivative,
  showIntegral,
  zoom,
  onPresetChange,
  onToggleDerivative,
  onToggleIntegral,
  onZoomIn,
  onZoomOut,
  onReset,
}: PlotterToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-faint px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={presetIndex}
          onChange={(e) => onPresetChange(Number(e.target.value))}
          className="border-border-subtle bg-bg-elevated text-fg-primary rounded border px-3 py-1.5 font-mono text-sm"
        >
          {PRESETS.map((p, i) => (
            <option key={p.id} value={i}>
              f(x) = {p.label} — {p.labelEn}
            </option>
          ))}
        </select>

        <button
          onClick={onToggleDerivative}
          className={`rounded px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
            showDerivative
              ? "bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30"
              : "border-border-faint text-fg-muted hover:text-fg-secondary border"
          }`}
        >
          f&apos;(x) 导数
        </button>

        <button
          onClick={onToggleIntegral}
          className={`rounded px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
            showIntegral
              ? "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30"
              : "border-border-faint text-fg-muted hover:text-fg-secondary border"
          }`}
        >
          ∫f(x) 积分
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          className="border-border-faint text-fg-muted hover:text-fg-primary flex h-8 w-8 items-center justify-center rounded border text-lg transition-colors"
          aria-label="缩小"
        >
          −
        </button>
        <span className="text-fg-disabled min-w-[3rem] text-center font-mono text-[10px]">
          {zoom.toFixed(1)}×
        </span>
        <button
          onClick={onZoomIn}
          className="border-border-faint text-fg-muted hover:text-fg-primary flex h-8 w-8 items-center justify-center rounded border text-lg transition-colors"
          aria-label="放大"
        >
          +
        </button>
        <button
          onClick={onReset}
          className="border-border-faint text-fg-muted hover:text-fg-primary ml-1 rounded border px-2 py-1 font-mono text-[10px] transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
}
