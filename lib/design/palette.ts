/**
 * 观测台与手记的色彩令牌（T-DESIGN-01b）——CSS 变量的唯一真相源。
 * app/globals.css 与各域 globals.css 里的同名变量由 palette.test.ts 对账；
 * 改色先改这里，再同步 CSS，测试会指出漏改的文件。
 * 取值依据与对比度记录：docs/设计方向-观测台与手记.md。
 */
import type { DomainClusterId } from "@/lib/domain-clusters";

export type ThemeName = "dark" | "light";

type Surfaces = {
  deep: string;
  base: string;
  panel: string;
  floating: string;
};

type Inks = {
  primary: string;
  secondary: string;
  muted: string;
  disabled: string;
};

/** Brand and instrument colors: `mark` is for lines and fills, `ink` for text. */
type Instrument = { mark: string; ink: string };

export type ThemePalette = {
  surface: Surfaces;
  fg: Inks;
  brass: Instrument;
  verdigris: Instrument;
  cinnabar: Instrument;
};

export const PALETTE: Record<ThemeName, ThemePalette> = {
  // 观测台：夜墨底 + 羊皮纸字 + 铜。
  dark: {
    surface: { deep: "#0a0f18", base: "#0f1622", panel: "#172131", floating: "#1e2a3d" },
    fg: { primary: "#e8dfc9", secondary: "#b3ab98", muted: "#9a9483", disabled: "#97917f" },
    brass: { mark: "#c39a45", ink: "#c39a45" },
    verdigris: { mark: "#5e9c8a", ink: "#659b8c" },
    cinnabar: { mark: "#c9553f", ink: "#e76c57" },
  },
  // 手记：保留原纸色，字改铁胆墨（偏蓝的黑），与铜色成对。
  light: {
    surface: { deep: "#efece4", base: "#faf6ef", panel: "#ffffff", floating: "#ffffff" },
    fg: { primary: "#1e2638", secondary: "#454b58", muted: "#51565f", disabled: "#5a5f6b" },
    brass: { mark: "#ad7b21", ink: "#795719" },
    verdigris: { mark: "#3f7466", ink: "#3c7163" },
    cinnabar: { mark: "#b8412f", ink: "#b63f2d" },
  },
};

export type Pigment = {
  name: string;
  en: string;
  /** Lines, seals, plates, graph nodes: ≥ 3:1 on every surface of the theme. */
  mark: Record<ThemeName, string>;
  /** The same hue lifted or deepened for text: ≥ 4.5:1 on every surface. */
  ink: Record<ThemeName, string>;
};

/** 六簇国画颜料。只作强调：线、印、图版、图谱节点、焦点环；不铺在正文底下。 */
export const CLUSTER_PIGMENTS: Record<DomainClusterId, Pigment> = {
  "cosmos-nature": {
    name: "石青",
    en: "azurite",
    mark: { dark: "#2c79a8", light: "#2c79a8" },
    ink: { dark: "#4d98c8", light: "#1f6f9d" },
  },
  "life-mind": {
    name: "石绿",
    en: "malachite",
    mark: { dark: "#3e8e63", light: "#3e8e63" },
    ink: { dark: "#509f73", light: "#24774e" },
  },
  "society-institutions": {
    name: "赭石",
    en: "ochre",
    mark: { dark: "#a86a3a", light: "#a86a3a" },
    ink: { dark: "#c28252", light: "#965a29" },
  },
  "history-civilization": {
    name: "胭脂",
    en: "carmine",
    mark: { dark: "#bb5064", light: "#a2394f" },
    ink: { dark: "#dc6d80", light: "#a2394f" },
  },
  "humanities-arts": {
    name: "青莲",
    en: "lotus",
    mark: { dark: "#8265af", light: "#7b5ea7" },
    ink: { dark: "#9f82ce", light: "#775aa2" },
  },
  "formal-technology": {
    name: "黛蓝",
    en: "indigo",
    mark: { dark: "#64738b", light: "#425066" },
    ink: { dark: "#8291aa", light: "#425066" },
  },
};

/** CSS custom property names for a cluster pigment, e.g. `--pigment-cosmos-nature`. */
export function pigmentVar(cluster: DomainClusterId, role: "mark" | "ink" = "mark"): string {
  return role === "mark" ? `var(--pigment-${cluster})` : `var(--pigment-${cluster}-ink)`;
}

function channel(value: number): number {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map(channel) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio between two `#rrggbb` colors. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
