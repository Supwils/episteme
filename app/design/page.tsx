import type { Metadata } from "next";
import { Glyph, GLYPH_NAMES } from "@/components/design/Glyph";
import { Seal } from "@/components/design/Seal";
import { SpecimenPlate } from "@/components/design/SpecimenPlate";
import { DOMAINS } from "@/lib/data";
import { DOMAIN_CLUSTERS } from "@/lib/domain-clusters";
import { CLUSTER_PIGMENTS, PALETTE, pigmentVar } from "@/lib/design/palette";
import { DOMAIN_SEALS, type SealDomain } from "@/lib/design/seals";
import { DURATION_MS } from "@/lib/design/motion-tokens";
import {
  CLUSTER_ARCS,
  DOMAIN_WEDGES,
  annularSectorPath,
  levelBand,
  levelRadius,
  polarToXY,
} from "@/lib/knowledge-geometry";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

// Internal specimen sheet for the design system (T-DESIGN-01). Not linked from
// the site, not in the sitemap, not indexed — it exists so every token can be
// checked in both themes on real CSS. Record: docs/设计方向-观测台与手记.md
export const metadata: Metadata = {
  title: "设计系统 · 观测台与手记",
  robots: { index: false, follow: false },
};

const GLYPH_LABELS: Record<(typeof GLYPH_NAMES)[number], string> = {
  route: "阅读路线",
  graph: "知识图谱",
  daily: "每日知识",
  random: "随机一篇",
  search: "搜索",
  molecules: "分子图鉴",
  timeline: "时间线",
  frontier: "研究前沿",
  curiosity: "奇趣知识",
  telescope: "观测台（深色）",
  pen: "手记（浅色）",
  auto: "跟随系统",
};

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border-faint border-t py-10">
      <h2 className="font-display text-fg-primary text-2xl">{title}</h2>
      <p className="text-fg-secondary mt-2 max-w-2xl text-sm leading-relaxed">{note}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Swatch({
  name,
  value,
  dark,
  light,
}: {
  name: string;
  value: string;
  dark: string;
  light: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="border-border-subtle h-9 w-9 shrink-0 rounded border"
        style={{ background: value }}
      />
      <span className="text-sm">
        <span className="text-fg-primary block">{name}</span>
        <span className="text-fg-muted font-mono text-xs">
          {dark} / {light}
        </span>
      </span>
    </div>
  );
}

function GeometryRing() {
  const size = 560;
  const r = size / 2 - 40;
  return (
    <svg
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      className="mx-auto block w-full max-w-[560px]"
      role="img"
      aria-label="知识几何：角度是学科，半径是认知层级"
    >
      {KNOWLEDGE_LEVELS.map(({ id }) => (
        <circle
          key={id}
          r={levelRadius(id) * r}
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth={id === 1 ? 1.2 : 0.6}
        />
      ))}
      {CLUSTER_ARCS.map((arc) => (
        <path
          key={arc.cluster}
          d={annularSectorPath(arc.startDeg, arc.endDeg, 1.02, 1.06, r)}
          fill={pigmentVar(arc.cluster)}
        />
      ))}
      {DOMAIN_WEDGES.map((wedge) => {
        const edge = polarToXY(wedge.startDeg, r);
        const inner = polarToXY(wedge.startDeg, levelBand(5).inner * r);
        const seat = polarToXY(wedge.centerDeg, r * 0.9);
        return (
          <g key={wedge.domain}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={edge.x}
              y2={edge.y}
              stroke="var(--color-border-subtle)"
              strokeWidth={0.6}
            />
            <g transform={`translate(${seat.x - 9} ${seat.y - 9})`}>
              <Seal
                domain={wedge.domain as SealDomain}
                size={18}
                color={pigmentVar(wedge.cluster)}
                label={false}
              />
            </g>
          </g>
        );
      })}
      {KNOWLEDGE_LEVELS.map(({ id }) => {
        const band = levelBand(id);
        const at = polarToXY(0, ((band.inner + band.outer) / 2) * r);
        return (
          <text
            key={id}
            x={at.x}
            y={at.y + 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-fg-muted)"
          >
            L{id}
          </text>
        );
      })}
    </svg>
  );
}

// Live sample of the author kit (docs/作者组件指南.md), so the a11y scan covers it.
const AUTHOR_KIT_SAMPLE = [
  "柏拉图把可知世界的原型称为{{term:理型|eidos，事物所分有的永恒形式}}。",
  "```levels\n想象 | 影子与映像 | 对影像的把握，最不确定\n信念 | 可见事物 | 对实物的常识判断\n思想 | 数学对象 | 借助假设向下推演\n理性 | 理型 | 不借助图像，上升到第一原理\n```",
  "```compare\n理性论 | 经验论\n知识始于天赋观念 | 心灵原是一块白板\n```",
  "```steps\n观察 | 记下反常现象\n假设 | 提出可被检验的解释\n检验 | 设计能推翻假设的实验\n```",
  "```timeline\n1543 | 哥白尼《天球运行论》出版\n1687 | 牛顿《自然哲学的数学原理》出版\n```",
  "```aside\n“格致”出自《礼记·大学》“致知在格物”。\n```",
].join("\n\n");

export default function DesignSystemPage() {
  const dark = PALETTE.dark;
  const light = PALETTE.light;
  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-8">
      <p className="text-fg-muted text-sm">内部样张 · 不对外链接</p>
      <h1 className="font-display text-fg-primary mt-2 text-4xl">观测台与手记 · 设计系统</h1>
      <p className="text-fg-secondary mt-4 max-w-2xl leading-relaxed">
        切换主题检查每一个令牌。颜色、字形、图版与几何都来自代码里的唯一真相源，改动见
        docs/设计方向-观测台与手记.md。
      </p>

      <Section
        title="色彩"
        note="夜墨与纸是底，铜是品牌，铜绿与朱砂是仪器的第二、第三种颜色。无后缀用于线与面，-ink 用于文字。"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch
            name="底 base"
            value="var(--color-bg-base)"
            dark={dark.surface.base}
            light={light.surface.base}
          />
          <Swatch
            name="浮层 panel"
            value="var(--color-bg-panel)"
            dark={dark.surface.panel}
            light={light.surface.panel}
          />
          <Swatch
            name="正文 fg-primary"
            value="var(--color-fg-primary)"
            dark={dark.fg.primary}
            light={light.fg.primary}
          />
          <Swatch
            name="次文 fg-secondary"
            value="var(--color-fg-secondary)"
            dark={dark.fg.secondary}
            light={light.fg.secondary}
          />
          <Swatch
            name="铜 brass"
            value="var(--brass)"
            dark={dark.brass.mark}
            light={light.brass.mark}
          />
          <Swatch
            name="铜绿 verdigris"
            value="var(--verdigris)"
            dark={dark.verdigris.mark}
            light={light.verdigris.mark}
          />
          <Swatch
            name="朱砂 cinnabar"
            value="var(--cinnabar)"
            dark={dark.cinnabar.mark}
            light={light.cinnabar.mark}
          />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAIN_CLUSTERS.map((cluster) => {
            const pigment = CLUSTER_PIGMENTS[cluster.id];
            return (
              <div key={cluster.id} className="border-border-faint rounded border p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-10 rounded-sm"
                    style={{ background: pigmentVar(cluster.id) }}
                  />
                  <span className="text-fg-primary">
                    {pigment.name} · {cluster.label}
                  </span>
                </div>
                <p className="mt-2 text-sm" style={{ color: pigmentVar(cluster.id, "ink") }}>
                  文字用 ink 变体（≥ 4.5:1）
                </p>
                <p className="text-fg-muted mt-1 font-mono text-xs">
                  {pigment.mark.dark} / {pigment.mark.light}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="学科印"
        note="22 方印，字形取自 Noto Serif SC Black（OFL），不下载字体。白文（印面挖字）用于卡片与首页，朱文（字与框着色）用于行内与小尺寸。颜色从不单独承载含义，印就是那个配对的记号。"
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {DOMAINS.map((domain) => (
            <li key={domain.id} className="flex items-center gap-3">
              <Seal domain={domain.id as SealDomain} size={40} label={false} />
              <Seal
                domain={domain.id as SealDomain}
                size={28}
                cut="relief"
                color={pigmentVar(domain.cluster)}
                label={false}
              />
              <span className="text-fg-secondary text-sm">
                {DOMAIN_SEALS[domain.id as SealDomain].name}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="功能图标"
        note="与学科印同一套刻线：24 格、1.5 线宽、跟随文字颜色。取代 emoji 与几何符号。"
      >
        <ul className="flex flex-wrap gap-8">
          {GLYPH_NAMES.map((name) => (
            <li key={name} className="text-fg-primary flex items-center gap-2">
              <Glyph name={name} size={24} />
              <span className="text-fg-secondary text-sm">{GLYPH_LABELS[name]}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="知识几何"
        note="全站唯一的空间模型（lib/knowledge-geometry.ts）：角度是学科，六簇顺时针铺满一圈；半径是认知层级，L1 在外缘，L5 靠近圆心——学科在前沿处汇合。格致山把层级读作高度，从上往下看就是这张星盘。"
      >
        <GeometryRing />
      </Section>

      <Section
        title="标本图版"
        note={`每个领域一张由自身题材生成的刻线图，以领域 id 为种子，服务端与浏览器画出同一张。首次出现时描线（编排入场 ≤ 1200 ms），减少动效时静止。动效令牌：${DURATION_MS.fast} / ${DURATION_MS.base} / ${DURATION_MS.slow} ms。`}
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <li key={domain.id} className="border-border-faint overflow-hidden rounded border">
              <SpecimenPlate domain={domain.id as SealDomain} accent={pigmentVar(domain.cluster)} />
              <div className="border-border-faint flex items-center gap-2 border-t px-3 py-2">
                <Seal domain={domain.id as SealDomain} size={18} label={false} />
                <span className="text-fg-secondary text-sm">{domain.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="作者组件"
        note="正文里的五种围栏块与行内术语释义，语法见 docs/作者组件指南.md。"
      >
        <div className="max-w-[40rem]">
          <MarkdownRenderer content={AUTHOR_KIT_SAMPLE} domain="philosophy" />
        </div>
      </Section>
    </main>
  );
}
