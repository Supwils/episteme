import type { KnowledgeStageId } from "@/lib/knowledge-continuum";
import {
  orbitCoordinateKey,
  projectKnowledgeSpineOrbit,
  SPINE_ORBIT_VIEWBOX,
} from "@/lib/knowledge-spine-orbit";
import type {
  KnowledgeSpineAtlas,
  KnowledgeSpineAtlasRow,
} from "@/lib/knowledge-spine-atlas";

type KnowledgeSpineOrbitDiagramProps = {
  atlas: KnowledgeSpineAtlas;
  projection: ReturnType<typeof projectKnowledgeSpineOrbit>;
  selectedRow: KnowledgeSpineAtlasRow;
  selectedLevel: KnowledgeStageId;
  depthScale: number;
  showBridges: boolean;
  onSelect: (
    domainId: KnowledgeSpineAtlasRow["domainId"],
    level: KnowledgeStageId
  ) => void;
};

function levelY(level: KnowledgeStageId): number {
  return 590 - (level - 1) * 116;
}

function shortenLabel(label: string): string {
  return label.length > 13 ? `${label.slice(0, 12)}…` : label;
}

export function KnowledgeSpineOrbitDiagram({
  atlas,
  projection,
  selectedRow,
  selectedLevel,
  depthScale,
  showBridges,
  onSelect,
}: KnowledgeSpineOrbitDiagramProps) {
  const selectedPath = selectedRow.steps
    .map((step) =>
      projection.pointsByCoordinate.get(orbitCoordinateKey(selectedRow.domainId, step.level))
    )
    .filter((point) => point !== undefined);

  return (
    <svg
      viewBox={`0 0 ${SPINE_ORBIT_VIEWBOX.width} ${SPINE_ORBIT_VIEWBOX.height}`}
      className="h-auto min-h-[500px] min-w-[760px] w-full"
      role="group"
      aria-labelledby="spine-orbit-title spine-orbit-description"
    >
      <title id="spine-orbit-title">15 门学科的五层空间知识主干</title>
      <desc id="spine-orbit-description">
        五个椭圆层级承载七十五个主干节点，选中学科的纵向路径和跨学科关系会被突出显示。
      </desc>

      <rect
        width={SPINE_ORBIT_VIEWBOX.width}
        height={SPINE_ORBIT_VIEWBOX.height}
        fill="var(--color-bg-deep)"
      />
      <line
        x1={SPINE_ORBIT_VIEWBOX.centerX}
        y1="72"
        x2={SPINE_ORBIT_VIEWBOX.centerX}
        y2="628"
        stroke="var(--color-border-faint)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />

      {[1, 2, 3, 4, 5].map((rawLevel) => {
        const level = rawLevel as KnowledgeStageId;
        const radius = 195 + (6 - level) * 32;
        return (
          <g key={level}>
            <ellipse
              cx={SPINE_ORBIT_VIEWBOX.centerX}
              cy={levelY(level)}
              rx={radius}
              ry={24 * depthScale}
              fill="none"
              stroke="var(--color-border-faint)"
              strokeWidth={level === selectedLevel ? 2 : 1}
              opacity={level === selectedLevel ? 0.9 : 0.52}
            />
            <text
              x="74"
              y={levelY(level) + 4}
              fill="var(--color-fg-muted)"
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              L{level}
            </text>
          </g>
        );
      })}

      {atlas.rows.map((row) => {
        const rowPoints = row.steps
          .map((step) =>
            projection.pointsByCoordinate.get(orbitCoordinateKey(row.domainId, step.level))
          )
          .filter((point) => point !== undefined);
        return (
          <path
            key={row.domainId}
            d={rowPoints
              .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
              .join(" ")}
            fill="none"
            stroke={row.domainColor}
            strokeWidth={row.domainId === selectedRow.domainId ? 3 : 1}
            opacity={row.domainId === selectedRow.domainId ? 0.95 : 0.18}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {showBridges
        ? selectedRow.bridgeTransitions.map((bridge) => {
            const from = projection.pointsByCoordinate.get(
              orbitCoordinateKey(bridge.fromDomainId, bridge.fromLevel)
            );
            const to = projection.pointsByCoordinate.get(
              orbitCoordinateKey(bridge.toDomainId, bridge.toLevel)
            );
            if (!from || !to) return null;
            const controlY = Math.min(from.y, to.y) - 34;
            return (
              <path
                key={bridge.id}
                d={`M ${from.x} ${from.y} Q ${SPINE_ORBIT_VIEWBOX.centerX} ${controlY} ${to.x} ${to.y}`}
                fill="none"
                stroke={bridge.counterpartDomainColor}
                strokeWidth="1.5"
                strokeDasharray="5 5"
                opacity="0.58"
                vectorEffect="non-scaling-stroke"
              >
                <title>{`${bridge.fromNodeLabel} → ${bridge.toNodeLabel}：${bridge.transition}`}</title>
              </path>
            );
          })
        : null}

      <path
        d={selectedPath
          .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
          .join(" ")}
        fill="none"
        stroke={selectedRow.domainColor}
        strokeWidth="5"
        opacity="0.9"
        vectorEffect="non-scaling-stroke"
      />

      {projection.points.map((point) => {
        const row = atlas.rows[point.domainIndex]!;
        const step = row.steps[point.level - 1]!;
        const selected =
          row.domainId === selectedRow.domainId && point.level === selectedLevel;
        const selectedDomain = row.domainId === selectedRow.domainId;
        const nodeRadius = (selected ? 10 : selectedDomain ? 7 : 4.5) * point.scale;
        const textOnLeft = point.x < SPINE_ORBIT_VIEWBOX.centerX;
        return (
          <g
            key={point.nodeId}
            role="button"
            tabIndex={0}
            aria-label={`${row.domainLabel}，L${point.level}：${step.label}`}
            aria-pressed={selected}
            data-testid={`orbit-node-${row.domainId}-${point.level}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onSelect(row.domainId, point.level)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              onSelect(row.domainId, point.level);
            }}
            className="cursor-pointer outline-none"
            opacity={selectedDomain ? 1 : point.opacity}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={nodeRadius + (selected ? 5 : 2)}
              fill="var(--color-bg-deep)"
              stroke={selected ? "var(--color-fg-primary)" : "transparent"}
              strokeWidth={selected ? 2 : 0}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={nodeRadius}
              fill={row.domainColor}
              stroke="var(--color-bg-base)"
              strokeWidth="1.5"
            >
              <title>{`${row.domainLabel} · L${point.level} · ${step.label}`}</title>
            </circle>
            {selectedDomain ? (
              <text
                x={point.x + (textOnLeft ? -14 : 14)}
                y={point.y + 4}
                textAnchor={textOnLeft ? "end" : "start"}
                fill="var(--color-fg-primary)"
                fontSize="12"
                fontWeight="500"
              >
                {shortenLabel(step.label)}
              </text>
            ) : point.level === 1 && point.z > 0.3 ? (
              <text
                x={point.x + (textOnLeft ? -10 : 10)}
                y={point.y + 3}
                textAnchor={textOnLeft ? "end" : "start"}
                fill="var(--color-fg-muted)"
                fontSize="9"
              >
                {row.domainShortLabel}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
