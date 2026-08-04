"use client";

import Link from "next/link";
import { useState } from "react";

// 法学域主题金（与 lib/data.tsx 中 law 域 accent 一致）
const ACCENT = "#a8843c";

type TraditionId = "civil" | "common" | "mixed" | "islamic";

// 法系分布事实来源：渥太华大学 Juriglobe 世界法系分类（juriglobe.ca），
// 与比较法通说一致——大陆法系覆盖欧洲大陆、拉美与东亚；普通法系覆盖英美及
// 英联邦；南非、苏格兰、路易斯安那、魁北克、以色列为公认的混合法域；
// 中东、北非多国为民法典与伊斯兰法并行的混合体制，沙特等少数国家以
// 伊斯兰法为基本法源。
const TRADITIONS: Record<
  TraditionId,
  {
    label: string;
    labelEn: string;
    regions: string;
    features: string;
    link: { href: string; text: string };
  }
> = {
  civil: {
    label: "大陆法系",
    labelEn: "Civil Law",
    regions:
      "法国、德国、意大利、西班牙等欧洲大陆国家；拉丁美洲各国；日本、韩国、中国大陆等东亚法域。",
    features:
      "以成文法典为中心（法国民法典 1804、德国民法典 1900 是两座源头）；法官「适用」法典，判例原则上无正式约束力；法律教育以法典与教义学体系为骨架。",
    link: {
      href: "/law/legal-traditions/civil-vs-common-law",
      text: "大陆法与普通法：两种法律心智",
    },
  },
  common: {
    label: "普通法系",
    labelEn: "Common Law",
    regions:
      "英格兰、美国、加拿大（除魁北克）、澳大利亚、新西兰、爱尔兰，以及印度、新加坡、中国香港等前英属法域。",
    features:
      "遵循先例（stare decisis）：判例本身就是正式法源，法官在裁判中「造法」；诉讼采对抗制，律师主导举证，法官更像裁判而非调查官。",
    link: {
      href: "/law/legal-traditions/civil-vs-common-law",
      text: "大陆法与普通法：两种法律心智",
    },
  },
  mixed: {
    label: "混合法系",
    labelEn: "Mixed Systems",
    regions:
      "南非、苏格兰、路易斯安那（美）、魁北克（加）、以色列，以及撒哈拉以南非洲诸多民法典与习惯法并行的国家。",
    features:
      "两种以上传统的层叠：常见配方是私法保留大陆法底色（如路易斯安那民法典、魁北克民法典），公法、商法与诉讼程序则吸收普通法；非洲多国再叠加习惯法。",
    link: { href: "/law/legal-traditions/mixed-legal-systems", text: "混合法系：法律传统的叠层" },
  },
  islamic: {
    label: "伊斯兰法影响区",
    labelEn: "Islamic Law",
    regions:
      "沙特阿拉伯、伊朗等以沙里亚为基本法源的国家；埃及、摩洛哥等中东、北非国家的婚姻、继承领域仍适用伊斯兰法规则。",
    features:
      "沙里亚以《古兰经》与圣训为最高渊源。多数国家已将其编入民法典、与世俗法并行；少数国家（如沙特）不以成文宪法、而以伊斯兰法为国家基本规范。",
    link: {
      href: "/law/legal-traditions/islamic-law-tradition",
      text: "伊斯兰法传统：经训与现代国家",
    },
  },
};

// 简化世界分区示意：色块只做「相对位置」提示，不代表精确疆域。
type Tile = {
  id: string;
  label: string;
  tradition: TraditionId;
  x: number;
  y: number;
  w: number;
  h: number;
};
const TILES: Tile[] = [
  { id: "namerica", label: "北美", tradition: "common", x: 8, y: 28, w: 78, h: 42 },
  { id: "latam", label: "拉丁美洲", tradition: "civil", x: 34, y: 96, w: 62, h: 44 },
  { id: "britain", label: "英伦", tradition: "common", x: 138, y: 6, w: 44, h: 18 },
  { id: "weurope", label: "欧洲大陆", tradition: "civil", x: 150, y: 30, w: 60, h: 32 },
  { id: "mena", label: "中东·北非", tradition: "islamic", x: 186, y: 66, w: 68, h: 28 },
  { id: "africa", label: "撒哈拉以南非洲", tradition: "mixed", x: 150, y: 100, w: 64, h: 42 },
  { id: "easia", label: "东亚", tradition: "civil", x: 288, y: 26, w: 64, h: 38 },
  { id: "sasia", label: "南亚", tradition: "common", x: 254, y: 70, w: 48, h: 26 },
  { id: "oceania", label: "大洋洲", tradition: "common", x: 292, y: 112, w: 60, h: 28 },
];

export function LegalTraditionsMap() {
  const [active, setActive] = useState<TraditionId>("civil");
  const t = TRADITIONS[active];

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: `color-mix(in oklab, ${ACCENT} 42%, var(--color-fg-primary))` }}
        >
          法律传统地图 · 交互
        </span>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="法律传统">
          {(Object.keys(TRADITIONS) as TraditionId[]).map((id) => {
            const selected = id === active;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(id)}
                className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors"
                style={{
                  borderColor: selected ? ACCENT : "var(--color-border-subtle)",
                  color: selected ? "#0e0f14" : "var(--color-fg-muted)",
                  backgroundColor: selected ? ACCENT : "transparent",
                }}
              >
                {TRADITIONS[id].label}
              </button>
            );
          })}
        </div>
      </figcaption>

      <div className="p-4 sm:p-6">
        {/* 简化分区示意：每个色块可选中（点击或 Tab + Enter），选中其所属传统 */}
        <svg
          viewBox="0 0 360 152"
          className="h-auto w-full max-w-[560px]"
          role="group"
          aria-label="世界法律传统分区示意图"
        >
          {TILES.map((tile) => {
            const lit = tile.tradition === active;
            return (
              <g
                key={tile.id}
                role="button"
                tabIndex={0}
                aria-pressed={lit}
                aria-label={`${tile.label}：${TRADITIONS[tile.tradition].label}`}
                onClick={() => setActive(tile.tradition)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(tile.tradition);
                  }
                }}
                className="group cursor-pointer outline-none"
              >
                <rect
                  x={tile.x}
                  y={tile.y}
                  width={tile.w}
                  height={tile.h}
                  rx={4}
                  fill={lit ? ACCENT : "var(--color-border-subtle)"}
                  opacity={lit ? 0.9 : 0.35}
                  stroke={lit ? ACCENT : "transparent"}
                  strokeWidth={1.5}
                />
                {/* 聚焦指示环（仅键盘聚焦时可见） */}
                <rect
                  x={tile.x - 2}
                  y={tile.y - 2}
                  width={tile.w + 4}
                  height={tile.h + 4}
                  rx={6}
                  fill="none"
                  stroke="var(--color-fg-secondary)"
                  strokeWidth={1}
                  className="opacity-0 group-focus-visible:opacity-100"
                  pointerEvents="none"
                />
                <text
                  x={tile.x + tile.w / 2}
                  y={tile.y + tile.h / 2}
                  fontSize={tile.h < 22 ? 8 : 9.5}
                  fontFamily="monospace"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={lit ? "#0e0f14" : "var(--color-fg-muted)"}
                  pointerEvents="none"
                >
                  {tile.label}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-fg-disabled mt-1 font-mono text-[9px] tracking-[0.14em] uppercase">
          示意图 · 色块位置仅为相对提示，不代表精确疆域
        </p>

        {/* 选中传统说明卡 */}
        <div
          className="border-border-faint mt-5 rounded-md border-l-2 py-1 pl-4"
          style={{ borderLeftColor: ACCENT }}
          aria-live="polite"
        >
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            {t.labelEn}
          </p>
          <p className="text-fg-primary mt-1 text-sm font-semibold">{t.label}</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                代表法域
              </dt>
              <dd className="text-fg-secondary mt-1 text-xs leading-relaxed">{t.regions}</dd>
            </div>
            <div>
              <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                核心特征
              </dt>
              <dd className="text-fg-secondary mt-1 text-xs leading-relaxed">{t.features}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs">
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
              深入阅读{"　"}
            </span>
            <Link
              href={t.link.href}
              className="underline decoration-dotted underline-offset-4 transition-colors"
              style={{ color: `color-mix(in oklab, ${ACCENT} 55%, var(--color-fg-primary))` }}
            >
              {t.link.text}
            </Link>
          </p>
        </div>
      </div>
    </figure>
  );
}
