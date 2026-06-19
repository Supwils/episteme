import type { AnyTierId } from "./tier";

export type DataCard = {
  /** Localized label (中文优先, 拉丁名小字注释). */
  label: string;
  latinLabel?: string;
  /** Pre-formatted main value, e.g. "8.8 × 10²⁶ m". */
  value: string;
  /** Optional unit suffix shown smaller, e.g. "(93 Gly)". */
  hint?: string;
};

export type NarrativeSection = {
  heading: string;
  /** Paragraphs, plain strings (no MDX in Phase 1). */
  body: string[];
};

export type SourceRef = {
  label: string;
  url: string;
  /** Used to render a small kind chip. */
  kind: "paper" | "agency" | "encyclopedia";
};

/**
 * An interactive marker placed in the 3D scene. Hovering over the marker
 * shows a tooltip with scientific context. Each marker represents a real
 * astronomical object or structure with verified data.
 */
export type SceneMarker = {
  id: string;
  name: { primary: string; latin: string };
  /** Scene-local [x, y, z] position. Coordinate system depends on the tier. */
  position: [number, number, number];
  /** One-paragraph description shown in the hover tooltip. */
  description: string;
  /** Short data snippets shown as inline chips in the tooltip. */
  data?: Array<{ label: string; value: string }>;
  /** Color override for the marker point (CSS hex). */
  color?: string;
  /** Size override for the marker point (scene units). */
  size?: number;
};

export type TierContent = {
  tier: AnyTierId;
  name: { primary: string; latin: string };
  tagline: string;
  /** One-line poetic line for the subject card. */
  whisper?: string;
  dataCards: DataCard[];
  narrative: NarrativeSection[];
  sources: SourceRef[];
  /** Interactive 3D markers with hover tooltips. */
  markers?: SceneMarker[];
  /**
   * Curated "深入阅读" links from the 3D scene into the prose knowledge base,
   * so viewers can drill from the visual tier into a full article. When absent,
   * the panel falls back to the tier's section knowledge-base index.
   */
  relatedArticles?: { href: string; title: string }[];
};
