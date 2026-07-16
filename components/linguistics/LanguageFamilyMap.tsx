"use client";

import { useMemo, useState } from "react";
import {
  GENEALOGY_TYPE_COMPARISONS,
  LANDMASS_POLYGONS,
  LANGUAGE_MAP_DIMENSION_LABELS,
  LANGUAGE_ORDER_LABELS,
  LANGUAGE_PROFILES,
  MORPHOLOGY_LABELS,
  projectLanguageCoordinate,
  type LanguageMapDimension,
  type LanguageProfile,
} from "@/subjects/linguistics/lib/language-map-data";

type MapMode = "genealogy" | "typology";

const ACCENT = "#3f9a91";
const FAMILY_COLORS = [
  "#db9b4b",
  "#5ca9a2",
  "#d16d67",
  "#7e91c7",
  "#9a80bd",
  "#73a36a",
  "#c887b0",
  "#b39b62",
] as const;
const TYPE_COLORS: Record<LanguageMapDimension, Record<string, string>> = {
  wordOrder: {
    SOV: "#db9b4b",
    SVO: "#5ca9a2",
    VSO: "#d16d67",
    "predicate-first": "#9a80bd",
    flexible: "#7e91c7",
  },
  morphology: {
    isolating: "#5ca9a2",
    agglutinative: "#db9b4b",
    fusional: "#d16d67",
    polysynthetic: "#9a80bd",
    mixed: "#7e91c7",
  },
  modality: { spoken: "#5ca9a2", signed: "#db9b4b" },
};

function familyColor(family: string) {
  const families = [...new Set(LANGUAGE_PROFILES.map((language) => language.family))];
  return FAMILY_COLORS[families.indexOf(family) % FAMILY_COLORS.length] ?? ACCENT;
}

function typeValue(language: LanguageProfile, dimension: LanguageMapDimension) {
  return language[dimension];
}

function typeLabel(value: string, dimension: LanguageMapDimension) {
  if (dimension === "wordOrder") {
    return LANGUAGE_ORDER_LABELS[value as keyof typeof LANGUAGE_ORDER_LABELS] ?? value;
  }
  if (dimension === "morphology") {
    return MORPHOLOGY_LABELS[value as keyof typeof MORPHOLOGY_LABELS] ?? value;
  }
  return value === "signed" ? "视觉—动作通道" : "听觉—口腔通道";
}

function languageColor(language: LanguageProfile, mode: MapMode, dimension: LanguageMapDimension) {
  if (mode === "genealogy") return familyColor(language.family);
  return TYPE_COLORS[dimension][typeValue(language, dimension)] ?? ACCENT;
}

function WorldBackdrop() {
  return (
    <svg
      viewBox="0 0 100 50"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="世界区域示意图，地理位置仅用于定位语言样本"
      preserveAspectRatio="none"
    >
      <rect width="100" height="50" fill="var(--color-bg-deep)" />
      {[25, 50, 75].map((x) => (
        <line
          key={`x-${x}`}
          x1={x}
          x2={x}
          y1="0"
          y2="50"
          stroke="var(--color-border-faint)"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {[12.5, 25, 37.5].map((y) => (
        <line
          key={`y-${y}`}
          x1="0"
          x2="100"
          y1={y}
          y2={y}
          stroke="var(--color-border-faint)"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {LANDMASS_POLYGONS.map((polygon, index) => (
        <polygon
          key={index}
          points={polygon
            .map(([longitude, latitude]) => {
              const point = projectLanguageCoordinate(longitude, latitude);
              return `${point.x},${point.y / 2}`;
            })
            .join(" ")}
          fill="var(--color-bg-elevated)"
          stroke="var(--color-border-subtle)"
          strokeWidth="0.45"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function LanguageFamilyMap() {
  const [mode, setMode] = useState<MapMode>("genealogy");
  const [dimension, setDimension] = useState<LanguageMapDimension>("wordOrder");
  const [family, setFamily] = useState("all");
  const [selectedId, setSelectedId] = useState(LANGUAGE_PROFILES[0]!.id);
  const families = useMemo(
    () => [...new Set(LANGUAGE_PROFILES.map((language) => language.family))].sort(),
    []
  );
  const selected =
    LANGUAGE_PROFILES.find((language) => language.id === selectedId) ?? LANGUAGE_PROFILES[0]!;
  const visibleLanguages = LANGUAGE_PROFILES.filter(
    (language) => family === "all" || language.family === family
  );
  const legendEntries = useMemo(() => {
    if (mode === "genealogy") {
      return families.map((name) => ({ name, color: familyColor(name) }));
    }
    return [...new Set(LANGUAGE_PROFILES.map((language) => typeValue(language, dimension)))].map(
      (value) => ({
        name: typeLabel(value, dimension),
        color: TYPE_COLORS[dimension][value] ?? ACCENT,
      })
    );
  }, [dimension, families, mode]);

  return (
    <section
      className="border-border-subtle bg-bg-near my-12 overflow-hidden border"
      aria-labelledby="language-map-title"
      data-testid="language-family-map"
    >
      <header className="border-border-faint border-b px-4 py-5 sm:px-6">
        <p className="text-fg-disabled font-mono text-[10px] tracking-[0.2em] uppercase">
          Comparison Lab · 3/5
        </p>
        <h2 id="language-map-title" className="text-fg-primary mt-1 text-xl font-medium">
          语言谱系与类型地图
        </h2>
        <p className="text-fg-muted mt-1 max-w-3xl text-sm leading-6">
          在“共同祖语”与“结构相似”两种视角之间切换。地图展示人工选取的教学样本，不代表语言数量、说话人数或文化权重。
        </p>
      </header>

      <div className="border-border-faint grid gap-4 border-b p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end sm:p-6">
        <div>
          <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            观察模式
          </p>
          <div className="flex w-fit border" style={{ borderColor: `${ACCENT}66` }}>
            {(["genealogy", "typology"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className="min-h-10 min-w-24 px-3 font-mono text-xs transition-colors motion-reduce:transition-none"
                style={{
                  color: mode === value ? ACCENT : "var(--color-fg-muted)",
                  background: mode === value ? `${ACCENT}14` : "transparent",
                }}
              >
                {value === "genealogy" ? "谱系" : "类型"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-fg-muted text-xs">
            <span className="mb-1 block">类型维度</span>
            <select
              aria-label="语言类型维度"
              value={dimension}
              onChange={(event) => setDimension(event.target.value as LanguageMapDimension)}
              disabled={mode === "genealogy"}
              className="border-border-subtle bg-bg-deep text-fg-primary min-h-10 w-full border px-3 text-sm disabled:opacity-45"
            >
              {Object.entries(LANGUAGE_MAP_DIMENSION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-fg-muted text-xs">
            <span className="mb-1 block">谱系聚焦</span>
            <select
              aria-label="语系筛选"
              value={family}
              onChange={(event) => setFamily(event.target.value)}
              className="border-border-subtle bg-bg-deep text-fg-primary min-h-10 w-full border px-3 text-sm"
            >
              <option value="all">全部教学样本</option>
              {families.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(250px,0.65fr)]">
        <div className="border-border-faint border-b p-3 sm:p-6 lg:border-r lg:border-b-0">
          <div className="overflow-x-auto">
            <div
              className="relative min-h-[360px] min-w-[680px] overflow-hidden border sm:min-h-[430px]"
              style={{ borderColor: "var(--color-border-faint)" }}
              role="group"
              aria-label={`语言样本地图，当前显示 ${visibleLanguages.length} 个样本`}
            >
              <WorldBackdrop />
              {visibleLanguages.map((language) => {
                const point = projectLanguageCoordinate(language.longitude, language.latitude);
                const selectedLanguage = selected.id === language.id;
                const color = languageColor(language, mode, dimension);
                return (
                  <button
                    key={language.id}
                    type="button"
                    aria-pressed={selectedLanguage}
                    aria-label={`${language.name}，${language.family}，${typeLabel(typeValue(language, dimension), dimension)}`}
                    title={language.name}
                    onClick={() => setSelectedId(language.id)}
                    className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:scale-125 focus-visible:scale-125 motion-reduce:transition-none"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      borderColor: selectedLanguage ? "var(--color-fg-primary)" : color,
                      background: color,
                      boxShadow: selectedLanguage ? `0 0 0 4px ${color}44` : undefined,
                      zIndex: selectedLanguage ? 3 : 2,
                    }}
                  >
                    <span className="sr-only">{language.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="地图图例">
            {legendEntries.map((entry) => (
              <span
                key={entry.name}
                className="text-fg-muted inline-flex items-center gap-1.5 text-xs"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
                {entry.name}
              </span>
            ))}
          </div>
        </div>

        <aside className="p-4 sm:p-6" aria-live="polite">
          <p
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: ACCENT }}
          >
            {selected.macroarea} · {selected.modality === "signed" ? "手语" : "口语"}
          </p>
          <h3 className="text-fg-primary mt-2 text-xl font-medium">{selected.name}</h3>
          <p className="text-fg-muted mt-0.5 text-sm">{selected.localName}</p>
          <dl className="border-border-faint mt-5 space-y-3 border-t pt-4 text-sm">
            <div>
              <dt className="text-fg-disabled text-xs">谱系</dt>
              <dd className="text-fg-secondary mt-0.5">
                {selected.family} · {selected.branch}
              </dd>
            </div>
            <div>
              <dt className="text-fg-disabled text-xs">类型剖面</dt>
              <dd className="text-fg-secondary mt-0.5">
                {LANGUAGE_ORDER_LABELS[selected.wordOrder]} ·{" "}
                {MORPHOLOGY_LABELS[selected.morphology]}
              </dd>
            </div>
            <div>
              <dt className="text-fg-disabled text-xs">结构线索</dt>
              <dd className="text-fg-secondary mt-0.5 leading-6">{selected.feature}</dd>
            </div>
          </dl>
          <p
            className="mt-5 border-l-2 pl-3 text-xs leading-5"
            style={{ borderColor: ACCENT, color: "var(--color-fg-muted)" }}
          >
            {selected.caution}
          </p>
        </aside>
      </div>

      <div className="border-border-faint border-t p-4 sm:p-6">
        <h3 className="text-fg-primary text-base font-medium">用对比阻断错误推理</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {GENEALOGY_TYPE_COMPARISONS.map((comparison) => (
            <div key={comparison.title} className="border-border-faint border-t pt-3">
              <p className="text-fg-primary text-sm font-medium">{comparison.title}</p>
              <p
                className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase"
                style={{ color: ACCENT }}
              >
                {comparison.languageIds
                  .map((id) => LANGUAGE_PROFILES.find((language) => language.id === id)?.name)
                  .join(" ↔ ")}
              </p>
              <p className="text-fg-muted mt-2 text-xs leading-5">{comparison.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
