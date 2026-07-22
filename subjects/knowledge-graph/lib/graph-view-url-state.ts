import type { GraphNode } from "../data/types";
import type { GraphLayoutMode } from "./cognitive-layout";
import { ALL_DOMAINS } from "./constants";
import { normalizeSpatialRotation, rotationForSpatialDomain } from "./spatial-layout";
import { parseKnowledgeLevel, type KnowledgeLevel } from "@/lib/knowledge-levels";

export const GRAPH_LAYOUT_PARAM = "layout";
export const SPATIAL_ANGLE_PARAM = "spatialAngle";
export const SPATIAL_FRONT_PARAM = "spatialFront";
export const SPATIAL_LEVEL_PARAM = "spatialLevel";

const GRAPH_LAYOUT_MODES: readonly GraphLayoutMode[] = ["force", "cluster", "cognitive", "spatial"];

export type GraphViewUrlState = {
  layoutMode: GraphLayoutMode | null;
  spatialRotation: number;
  spatialLevel: KnowledgeLevel | null;
};

function isGraphDomain(value: string | null): value is GraphNode["domain"] {
  return value !== null && ALL_DOMAINS.some((domain) => domain === value);
}

function parseRotation(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? normalizeSpatialRotation(parsed) : null;
}

export function parseGraphViewUrlState(searchParams: URLSearchParams): GraphViewUrlState {
  const requestedLayout = searchParams.get(GRAPH_LAYOUT_PARAM);
  const layoutMode = GRAPH_LAYOUT_MODES.find((mode) => mode === requestedLayout) ?? null;
  const requestedFront = searchParams.get(SPATIAL_FRONT_PARAM);
  const rotation =
    parseRotation(searchParams.get(SPATIAL_ANGLE_PARAM)) ??
    (isGraphDomain(requestedFront) ? rotationForSpatialDomain(requestedFront) : 0);

  return {
    layoutMode,
    spatialRotation: rotation,
    spatialLevel:
      layoutMode === "spatial" ? parseKnowledgeLevel(searchParams.get(SPATIAL_LEVEL_PARAM)) : null,
  };
}

export function graphViewUrlKey(searchParams: URLSearchParams): string {
  return [
    searchParams.get(GRAPH_LAYOUT_PARAM) ?? "",
    searchParams.get(SPATIAL_ANGLE_PARAM) ?? "",
    searchParams.get(SPATIAL_FRONT_PARAM) ?? "",
    searchParams.get(SPATIAL_LEVEL_PARAM) ?? "",
  ].join("|");
}

export function writeGraphViewUrlState(
  searchParams: URLSearchParams,
  layoutMode: GraphLayoutMode,
  spatialRotation: number,
  spatialFrontDomain: GraphNode["domain"] | null,
  spatialLevel: KnowledgeLevel | null = null
): URLSearchParams {
  const nextParams = new URLSearchParams(searchParams);
  nextParams.set(GRAPH_LAYOUT_PARAM, layoutMode);

  if (layoutMode === "spatial" && spatialFrontDomain) {
    nextParams.delete("level");
    nextParams.set(
      SPATIAL_ANGLE_PARAM,
      String(Math.round(normalizeSpatialRotation(spatialRotation)))
    );
    nextParams.set(SPATIAL_FRONT_PARAM, spatialFrontDomain);
    if (spatialLevel) {
      nextParams.set(SPATIAL_LEVEL_PARAM, String(spatialLevel));
    } else {
      nextParams.delete(SPATIAL_LEVEL_PARAM);
    }
  } else {
    nextParams.delete(SPATIAL_ANGLE_PARAM);
    nextParams.delete(SPATIAL_FRONT_PARAM);
    nextParams.delete(SPATIAL_LEVEL_PARAM);
  }

  return nextParams;
}
