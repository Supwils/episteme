import { COLORS } from "./plotter-utils";

type TracePoint = { x: number; y: number; mathX: number; mathY: number };

interface PlotterStatusBarProps {
  presetLabel: string;
  showDerivative: boolean;
  showIntegral: boolean;
  tracePoint: TracePoint | null;
  derivativeTraceY: number | null;
}

export function PlotterStatusBar({
  presetLabel,
  showDerivative,
  showIntegral,
  tracePoint,
  derivativeTraceY,
}: PlotterStatusBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-border-faint px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-0.5 w-4" style={{ backgroundColor: COLORS.fn }} />
        <span className="text-fg-muted font-mono text-[11px]">f(x) = {presetLabel}</span>
      </div>
      {showDerivative && (
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-4 border-b border-dashed" style={{ borderColor: COLORS.derivative }} />
          <span className="font-mono text-[11px]" style={{ color: COLORS.derivative }}>f&apos;(x)</span>
        </div>
      )}
      {showIntegral && (
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-4 rounded-sm" style={{ backgroundColor: COLORS.integral, opacity: 0.3 }} />
          <span className="font-mono text-[11px]" style={{ color: COLORS.integral }}>∫f(x)dx</span>
        </div>
      )}
      <div className="flex-1" />
      {tracePoint && (
        <div className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.trace }} />
          <span className="font-mono text-[11px] text-[#f59e0b]">
            ({tracePoint.mathX.toFixed(2)}, {tracePoint.mathY.toFixed(2)})
          </span>
          {showDerivative && derivativeTraceY !== null && (
            <>
              <span className="text-fg-disabled">|</span>
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.derivative }} />
              <span className="font-mono text-[11px] text-[#ef4444]">
                f&apos;({tracePoint.mathX.toFixed(2)}) = {derivativeTraceY.toFixed(3)}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
