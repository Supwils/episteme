import { PLATE_HEIGHT, PLATE_WIDTH, drawPlate, type PlateKey, type StrokeRole } from "@/lib/plates";
import "./specimen-plate.css";

const ROLE_WIDTH: Record<StrokeRole, number> = { major: 1.2, minor: 0.7, accent: 1.6 };

/**
 * 标本图版（T-DESIGN-01g）。纯 SVG、服务端渲染；线色走令牌（主线前景墨、
 * 辅线淡墨、点睛用簇颜料），首次出现时用描线动画画出，减少动效时直接静止。
 * 图版是装饰，不承载信息：aria-hidden，旁边的标题负责说明。
 */
export function SpecimenPlate({
  domain,
  accent = "var(--brass)",
  animate = true,
  className,
}: {
  domain: PlateKey;
  /** Usually the domain's cluster pigment: `var(--pigment-…)`. */
  accent?: string;
  animate?: boolean;
  className?: string;
}) {
  const strokes = drawPlate(domain);
  return (
    <svg
      viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
      className={["specimen-plate", className].filter(Boolean).join(" ")}
      data-animate={animate || undefined}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      style={{ ["--plate-accent" as string]: accent }}
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          className={`specimen-plate__${s.role}`}
          pathLength={s.fill || s.dashed ? undefined : 1}
          fill={s.fill ? "currentColor" : "none"}
          stroke={s.fill ? "none" : "currentColor"}
          strokeWidth={s.fill ? undefined : ROLE_WIDTH[s.role]}
          strokeDasharray={s.dashed ? "3 3" : undefined}
          vectorEffect="non-scaling-stroke"
          style={{ ["--i" as string]: i }}
        />
      ))}
    </svg>
  );
}
