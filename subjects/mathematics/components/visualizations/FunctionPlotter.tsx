"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useDiagramPan } from "@/components/interaction/useDiagramPan";
import { TouchPanButton } from "@/components/interaction/TouchPanButton";
import {
  PRESETS,
  SVG_WIDTH,
  SVG_HEIGHT,
  PADDING,
  COLORS,
  niceStep,
  buildPath,
  buildIntegralPath,
} from "./plotter-utils";
import { PlotterToolbar } from "./PlotterToolbar";
import { PlotterStatusBar } from "./PlotterStatusBar";
import { PlotterGrid } from "./PlotterGrid";

export default function FunctionPlotter() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [showDerivative, setShowDerivative] = useState(false);
  const [showIntegral, setShowIntegral] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [traceX, setTraceX] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const preset = PRESETS[presetIndex]!;
  const viewWidth = (preset.domain[1] - preset.domain[0]) / zoom;
  const viewHeight = (viewWidth * (SVG_HEIGHT - 2 * PADDING)) / (SVG_WIDTH - 2 * PADDING);
  const centerX = (preset.domain[0] + preset.domain[1]) / 2 + pan.x;
  const centerY = pan.y;

  const viewXMin = centerX - viewWidth / 2;
  const viewXMax = centerX + viewWidth / 2;
  const viewYMin = centerY - viewHeight / 2;
  const viewYMax = centerY + viewHeight / 2;
  const step = niceStep(viewWidth);

  const mapX = useCallback(
    (x: number) => PADDING + ((x - viewXMin) / (viewXMax - viewXMin)) * (SVG_WIDTH - 2 * PADDING),
    [viewXMin, viewXMax]
  );
  const mapY = useCallback(
    (y: number) =>
      SVG_HEIGHT - PADDING - ((y - viewYMin) / (viewYMax - viewYMin)) * (SVG_HEIGHT - 2 * PADDING),
    [viewYMin, viewYMax]
  );
  const unmapX = useCallback(
    (svgX: number) =>
      viewXMin + ((svgX - PADDING) / (SVG_WIDTH - 2 * PADDING)) * (viewXMax - viewXMin),
    [viewXMin, viewXMax]
  );

  const fnPath = useMemo(
    () => buildPath(preset.fn, viewXMin, viewXMax, viewXMin, viewXMax, viewYMin, viewYMax),
    [preset.fn, viewXMin, viewXMax, viewYMin, viewYMax]
  );
  const derivativePath = useMemo(
    () =>
      showDerivative
        ? buildPath(preset.derivative, viewXMin, viewXMax, viewXMin, viewXMax, viewYMin, viewYMax)
        : "",
    [preset.derivative, showDerivative, viewXMin, viewXMax, viewYMin, viewYMax]
  );
  const integralPath = useMemo(
    () =>
      showIntegral
        ? buildIntegralPath(preset.fn, viewXMin, viewXMax, viewXMin, viewXMax, viewYMin, viewYMax)
        : "",
    [preset.fn, showIntegral, viewXMin, viewXMax, viewYMin, viewYMax]
  );

  const toPanDelta = useCallback(
    (dx: number, dy: number, element: SVGSVGElement) => {
      const rect = element.getBoundingClientRect();
      return { x: -(dx / rect.width) * viewWidth, y: (dy / rect.height) * viewHeight };
    },
    [viewWidth, viewHeight]
  );
  const diagram = useDiagramPan<SVGSVGElement>({ pan, onPan: setPan, toPanDelta });
  const { cancel: cancelPan } = diagram;
  const { onPointerMove: moveDiagram } = diagram.handlers;
  const traceAt = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      setTraceX(unmapX(((clientX - rect.left) / rect.width) * SVG_WIDTH));
    },
    [unmapX]
  );
  const handleSvgPointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (moveDiagram(event) || event.pointerType === "touch") return;
      if (event.pointerType === "pen" && event.buttons !== 0) return;
      traceAt(event.clientX);
    },
    [moveDiagram, traceAt]
  );

  const handleZoomIn = useCallback(() => {
    cancelPan();
    setZoom((z) => Math.min(z * 1.3, 20));
  }, [cancelPan]);
  const handleZoomOut = useCallback(() => {
    cancelPan();
    setZoom((z) => Math.max(z / 1.3, 0.2));
  }, [cancelPan]);
  const handleReset = useCallback(() => {
    cancelPan();
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setTraceX(null);
  }, [cancelPan]);
  // React attaches wheel listeners as passive, so preventDefault there cannot stop the page scrolling.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelPan();
      setZoom((z) => (e.deltaY < 0 ? Math.min(z * 1.1, 20) : Math.max(z / 1.1, 0.2)));
    };
    svg.addEventListener("wheel", handleWheel, { passive: false });
    return () => svg.removeEventListener("wheel", handleWheel);
  }, [cancelPan]);
  const handlePresetChange = useCallback(
    (index: number) => {
      cancelPan();
      setPresetIndex(index);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setTraceX(null);
    },
    [cancelPan]
  );

  const tracePoint = useMemo(() => {
    if (traceX === null) return null;
    try {
      const y = preset.fn(traceX);
      return isFinite(y) && !isNaN(y) && Math.abs(y) <= 1e6
        ? { x: mapX(traceX), y: mapY(y), mathX: traceX, mathY: y }
        : null;
    } catch {
      return null;
    }
  }, [traceX, preset, mapX, mapY]);

  const derivativeTraceY = useMemo(() => {
    if (traceX === null || !showDerivative) return null;
    try {
      const y = preset.derivative(traceX);
      return isFinite(y) && !isNaN(y) && Math.abs(y) < 1e6 ? y : null;
    } catch {
      return null;
    }
  }, [traceX, showDerivative, preset]);

  return (
    <div className="border-border-faint bg-bg-panel overflow-hidden border">
      <PlotterToolbar
        presetIndex={presetIndex}
        showDerivative={showDerivative}
        showIntegral={showIntegral}
        zoom={zoom}
        onPresetChange={handlePresetChange}
        onToggleDerivative={() => setShowDerivative((v) => !v)}
        onToggleIntegral={() => setShowIntegral((v) => !v)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      >
        <TouchPanButton
          armed={diagram.armed}
          controls={diagram.surfaceId}
          onToggle={diagram.toggle}
          onCancel={cancelPan}
        />
      </PlotterToolbar>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full cursor-crosshair"
        id={diagram.surfaceId}
        role="img"
        aria-label={`函数图像：${preset.label}`}
        style={{ background: COLORS.bg, touchAction: diagram.touchAction }}
        {...diagram.handlers}
        onPointerMove={handleSvgPointerMove}
        onClick={(event) => traceAt(event.clientX)}
      >
        <defs>
          <clipPath id="plot-area">
            <rect
              x={PADDING}
              y={PADDING}
              width={SVG_WIDTH - 2 * PADDING}
              height={SVG_HEIGHT - 2 * PADDING}
            />
          </clipPath>
        </defs>

        <PlotterGrid
          viewXMin={viewXMin}
          viewXMax={viewXMax}
          viewYMin={viewYMin}
          viewYMax={viewYMax}
          step={step}
          mapX={mapX}
          mapY={mapY}
        />

        <g clipPath="url(#plot-area)">
          {showIntegral && integralPath && (
            <path d={integralPath} fill={COLORS.integral} fillOpacity={0.15} />
          )}
          <path
            d={fnPath}
            fill="none"
            stroke={COLORS.fn}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {showDerivative && derivativePath && (
            <path
              d={derivativePath}
              fill="none"
              stroke={COLORS.derivative}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 3"
            />
          )}
        </g>

        {mapX(0) >= PADDING && mapX(0) <= SVG_WIDTH - PADDING && (
          <line
            x1={mapX(0)}
            y1={PADDING}
            x2={mapX(0)}
            y2={SVG_HEIGHT - PADDING}
            stroke={COLORS.axis}
            strokeWidth={1.5}
          />
        )}
        {mapY(0) >= PADDING && mapY(0) <= SVG_HEIGHT - PADDING && (
          <line
            x1={PADDING}
            y1={mapY(0)}
            x2={SVG_WIDTH - PADDING}
            y2={mapY(0)}
            stroke={COLORS.axis}
            strokeWidth={1.5}
          />
        )}

        <text
          x={SVG_WIDTH - PADDING + 4}
          y={mapY(0) - 6}
          fill="var(--color-fg-muted)"
          fontSize={11}
          fontFamily="var(--font-mono,monospace)"
        >
          x
        </text>
        <text
          x={mapX(0) + 8}
          y={PADDING - 6}
          fill="var(--color-fg-muted)"
          fontSize={11}
          fontFamily="var(--font-mono,monospace)"
        >
          y
        </text>

        {tracePoint && (
          <g>
            <line
              x1={tracePoint.x}
              y1={PADDING}
              x2={tracePoint.x}
              y2={SVG_HEIGHT - PADDING}
              stroke={COLORS.trace}
              strokeWidth={0.8}
              strokeDasharray="3 3"
              opacity={0.5}
            />
            <circle
              cx={tracePoint.x}
              cy={tracePoint.y}
              r={5}
              fill={COLORS.trace}
              stroke="white"
              strokeWidth={1.5}
            />
            {showDerivative &&
              derivativeTraceY !== null &&
              mapY(derivativeTraceY) >= PADDING &&
              mapY(derivativeTraceY) <= SVG_HEIGHT - PADDING && (
                <circle
                  cx={tracePoint.x}
                  cy={mapY(derivativeTraceY)}
                  r={4}
                  fill={COLORS.derivative}
                  stroke="white"
                  strokeWidth={1.5}
                />
              )}
          </g>
        )}

        <rect
          x={PADDING}
          y={PADDING}
          width={SVG_WIDTH - 2 * PADDING}
          height={SVG_HEIGHT - 2 * PADDING}
          fill="none"
          stroke={COLORS.gridMajor}
          strokeWidth={1}
        />
      </svg>

      <PlotterStatusBar
        presetLabel={preset.label}
        showDerivative={showDerivative}
        showIntegral={showIntegral}
        tracePoint={tracePoint}
        derivativeTraceY={derivativeTraceY}
      />
    </div>
  );
}
