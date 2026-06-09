import type { AtlasEra, ClickPulse } from "@/src-history/types/atlas";

export function drawLevel1(
  ctx: CanvasRenderingContext2D,
  ATLAS_ERAS: readonly AtlasEra[],
  hoveredEra: string | null,
  sr: number
): void;
export function drawLevel2(
  ctx: CanvasRenderingContext2D,
  activeEra: AtlasEra,
  hoveredTopic: string | null,
  sr: number
): void;
export function drawMinimap(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  zoom: number,
  pan: { x: number; y: number },
  level: number,
  ATLAS_ERAS: readonly AtlasEra[],
  activeEra: AtlasEra | null,
  sr: number
): void;
export function drawMain(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  pan: { x: number; y: number },
  zoom: number,
  level: number,
  ATLAS_ERAS: readonly AtlasEra[],
  activeEra: AtlasEra | null,
  hoveredEra: string | null,
  hoveredTopic: string | null,
  sr: number,
  showHelp: boolean,
  clickPulse: ClickPulse | null
): void;
