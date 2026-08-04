import type { KnowledgeGapJourney } from "./knowledge-gap-journey";
import {
  KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT,
  parseKnowledgeGapJourneyArchive,
  type KnowledgeGapJourneyArchiveError,
} from "./knowledge-gap-journey-archive";
import {
  isMentalHealthComparisonRecord,
  type MentalHealthComparisonRecord,
} from "./mental-health-tour-comparison-store";
import {
  isAdolescentServiceLabSnapshot,
  MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS,
  type AdolescentServiceLabSnapshot,
} from "@/subjects/medicine/lib/adolescent-service-lab-store";

export const LOCAL_ROUTE_ARCHIVE_FORMAT = "episteme-local-route-archive";
export const LOCAL_ROUTE_ARCHIVE_VERSION = 1;

export interface LocalRouteArchive {
  format: typeof LOCAL_ROUTE_ARCHIVE_FORMAT;
  version: typeof LOCAL_ROUTE_ARCHIVE_VERSION;
  exportedAt: string;
  journeys: readonly KnowledgeGapJourney[];
  comparison: MentalHealthComparisonRecord | null;
  serviceLabSnapshots: readonly AdolescentServiceLabSnapshot[];
}

export type LocalRouteArchiveError =
  | KnowledgeGapJourneyArchiveError
  | "invalid-comparison"
  | "invalid-service-lab-snapshots"
  | "too-many-service-lab-snapshots"
  | "duplicate-service-lab-snapshots";

export type LocalRouteArchiveParseResult =
  | { ok: true; archive: LocalRouteArchive }
  | { ok: false; error: LocalRouteArchiveError };

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function createLocalRouteArchive(
  sections: {
    journeys: readonly KnowledgeGapJourney[];
    comparison: MentalHealthComparisonRecord | null;
    serviceLabSnapshots: readonly AdolescentServiceLabSnapshot[];
  },
  exportedAt = new Date().toISOString()
): LocalRouteArchive {
  return {
    format: LOCAL_ROUTE_ARCHIVE_FORMAT,
    version: LOCAL_ROUTE_ARCHIVE_VERSION,
    exportedAt,
    journeys: sections.journeys,
    comparison:
      sections.comparison && sections.comparison.checkedIds.length > 0 ? sections.comparison : null,
    serviceLabSnapshots: sections.serviceLabSnapshots
      .slice()
      .sort((left, right) => right.savedAt.localeCompare(left.savedAt))
      .slice(0, MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS),
  };
}

function parseJourneysSection(
  exportedAt: unknown,
  journeys: unknown
):
  | { ok: true; journeys: readonly KnowledgeGapJourney[] }
  | { ok: false; error: KnowledgeGapJourneyArchiveError } {
  const result = parseKnowledgeGapJourneyArchive({
    format: KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT,
    version: 1,
    exportedAt,
    journeys,
  });
  return result.ok ? { ok: true, journeys: result.archive.journeys } : result;
}

export function parseLocalRouteArchive(value: unknown): LocalRouteArchiveParseResult {
  if (!value || typeof value !== "object") return { ok: false, error: "invalid-format" };
  const candidate = value as { format?: unknown };

  if (candidate.format === KNOWLEDGE_GAP_JOURNEY_ARCHIVE_FORMAT) {
    // Legacy journey-only archives migrate into the unified shape on import.
    const legacy = parseKnowledgeGapJourneyArchive(value);
    if (!legacy.ok) return legacy;
    return {
      ok: true,
      archive: {
        format: LOCAL_ROUTE_ARCHIVE_FORMAT,
        version: LOCAL_ROUTE_ARCHIVE_VERSION,
        exportedAt: legacy.archive.exportedAt,
        journeys: legacy.archive.journeys,
        comparison: null,
        serviceLabSnapshots: [],
      },
    };
  }

  if (candidate.format !== LOCAL_ROUTE_ARCHIVE_FORMAT)
    return { ok: false, error: "invalid-format" };
  const archive = value as Partial<LocalRouteArchive>;
  if (archive.version !== LOCAL_ROUTE_ARCHIVE_VERSION) {
    return { ok: false, error: "unsupported-version" };
  }
  if (!isTimestamp(archive.exportedAt)) return { ok: false, error: "invalid-export-date" };

  const journeys = parseJourneysSection(archive.exportedAt, archive.journeys);
  if (!journeys.ok) return journeys;

  if (archive.comparison !== null && !isMentalHealthComparisonRecord(archive.comparison)) {
    return { ok: false, error: "invalid-comparison" };
  }

  if (!Array.isArray(archive.serviceLabSnapshots)) {
    return { ok: false, error: "invalid-service-lab-snapshots" };
  }
  if (archive.serviceLabSnapshots.length > MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS) {
    return { ok: false, error: "too-many-service-lab-snapshots" };
  }
  if (!archive.serviceLabSnapshots.every(isAdolescentServiceLabSnapshot)) {
    return { ok: false, error: "invalid-service-lab-snapshots" };
  }
  const snapshotIds = archive.serviceLabSnapshots.map((snapshot) => snapshot.id);
  if (new Set(snapshotIds).size !== snapshotIds.length) {
    return { ok: false, error: "duplicate-service-lab-snapshots" };
  }

  return {
    ok: true,
    archive: {
      format: LOCAL_ROUTE_ARCHIVE_FORMAT,
      version: LOCAL_ROUTE_ARCHIVE_VERSION,
      exportedAt: archive.exportedAt,
      journeys: journeys.journeys,
      comparison: archive.comparison,
      serviceLabSnapshots: archive.serviceLabSnapshots,
    },
  };
}
