/**
 * 功能图标（T-DESIGN-01e）：与学科印同一套刻线风格的 8 个入口图标，取代
 * 📖 ◈ ⬡ ◎ ◇ ▣ 📅 等 emoji 与几何符号。24 格、1.5 线宽、currentColor。
 */
const GLYPHS = {
  // 阅读路线：一条折线穿过三个站点。
  route: (
    <>
      <path d="M4 18c3 0 4-5 8-5s5-6 8-6" />
      <circle cx="4" cy="18" r="1.6" />
      <circle cx="12" cy="13" r="1.6" />
      <circle cx="20" cy="7" r="1.6" />
    </>
  ),
  // 知识图谱：五个节点、刻度圈。
  graph: (
    <>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="1.2 2.4" />
      <path d="M12 7.5 7 15h10z" />
      <circle cx="12" cy="7.5" r="1.6" />
      <circle cx="7" cy="15" r="1.6" />
      <circle cx="17" cy="15" r="1.6" />
    </>
  ),
  // 每日：日晷——圆盘、晷针与一道影。
  daily: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2" />
      <path d="M12 12 16.5 8" />
    </>
  ),
  // 随机：两枚骰面错开。
  random: (
    <>
      <rect x="3.5" y="7.5" width="10" height="10" rx="1.5" />
      <path d="M10.5 4.5h8a1.5 1.5 0 0 1 1.5 1.5v8" />
      <circle cx="6.5" cy="10.5" r=".6" fill="currentColor" />
      <circle cx="10.5" cy="14.5" r=".6" fill="currentColor" />
    </>
  ),
  // 搜索：放大镜，镜内一道刻度。
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M8 10.5h5" />
    </>
  ),
  // 分子：六元环加一条侧链。
  molecules: (
    <>
      <path d="m10 5 4.3 2.5v5L10 15l-4.3-2.5v-5z" />
      <path d="M14.3 12.5 18 14.7v4" />
      <circle cx="18" cy="18.7" r="1.4" />
    </>
  ),
  // 时间线：带刻度的轴与一个标记。
  timeline: (
    <>
      <path d="M3 15h18" />
      <path d="M5 13.5v3M9 14v2M13 13.5v3M17 14v2M21 13.5v3" />
      <path d="M13 11V5.5l3.5 1.8L13 9" />
    </>
  ),
  // 奇趣：一颗刻出来的星芒——「原来如此」的那一下。
  curiosity: (
    <>
      <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4" />
      <path d="m6 6 2.6 2.6M15.4 15.4 18 18M18 6l-2.6 2.6M8.6 15.4 6 18" />
      <circle cx="12" cy="12" r="1.8" />
    </>
  ),
  // 观测台（深色主题）：架在三脚架上的望远镜。
  telescope: (
    <>
      <path d="m4.5 11.5 12-5.5 1.8 3.9-12 5.5z" />
      <path d="m16.5 6 2.6-1.2 1.8 3.9-2.6 1.2" />
      <path d="M11 13.6 8 20.5M11 13.6l3 6.9M11 13.6v6.9" />
    </>
  ),
  // 手记（浅色主题）：一支蘸水笔尖。
  pen: (
    <>
      <path d="M14.5 4.5 19.5 9.5 10 19l-5.5 1 1-5.5z" />
      <path d="m12.5 6.5 5 5M5.5 14.5l4 4" />
      <circle cx="9.3" cy="14.7" r="1" />
    </>
  ),
  // 跟随系统：半明半暗的圆。
  auto: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
    </>
  ),
  // 研究前沿：已知的实线弧与未知的虚线弧。
  frontier: (
    <>
      <path d="M4 19a8 8 0 0 1 8-8" />
      <path d="M12 11a8 8 0 0 1 8 8" strokeDasharray="1.5 2.2" />
      <path d="M12 11V4" />
      <circle cx="12" cy="4" r="1.2" />
    </>
  ),
} as const;

export type GlyphName = keyof typeof GLYPHS;
export const GLYPH_NAMES = Object.keys(GLYPHS) as GlyphName[];

export function Glyph({
  name,
  size = 20,
  label,
  className,
}: {
  name: GlyphName;
  size?: number;
  /** Accessible name; omit when a visible label sits next to the icon. */
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
