// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { buildCatalogKnowledgeGapPlan } from "../knowledge-gap-plan-catalog";
import { createKnowledgeGapJourney } from "../knowledge-gap-journey";
import { createKnowledgeGapJourneyArchive } from "../knowledge-gap-journey-archive";
import {
  KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY,
  importKnowledgeGapJourneyArchive,
  resetKnowledgeGapJourneys,
} from "../knowledge-gap-journey-store";
import {
  KNOWLEDGE_PROFILE_STORAGE_KEY,
  resetKnowledgeProfile,
  setKnowledgeNodeMastered,
} from "../knowledge-profile";
import {
  createLocalRouteArchive,
  parseLocalRouteArchive,
  LOCAL_ROUTE_ARCHIVE_FORMAT,
} from "../local-route-archive";
import {
  MENTAL_HEALTH_COMPARISON_STORAGE_KEY,
  replaceMentalHealthComparisonRecord,
  resetMentalHealthComparisonRecord,
  type MentalHealthComparisonRecord,
} from "../mental-health-tour-comparison-store";
import {
  ADOLESCENT_SERVICE_LAB_STORAGE_KEY,
  importAdolescentServiceLabSnapshots,
  resetAdolescentServiceLabSnapshots,
  type AdolescentServiceLabSnapshot,
} from "@/subjects/medicine/lib/adolescent-service-lab-store";

const journey = createKnowledgeGapJourney(
  buildCatalogKnowledgeGapPlan("political-science:security-dilemma-war-peace", [], 45),
  "2026-07-20T00:00:00.000Z"
);

const comparison: MentalHealthComparisonRecord = {
  schemaVersion: 1,
  checkedIds: ["rights-and-agency", "social-support"],
  updatedAt: "2026-07-20T01:00:00.000Z",
};

function snapshot(id: string, savedAt: string): AdolescentServiceLabSnapshot {
  return {
    id,
    savedAt,
    constraints: {
      budgetUnits: 24,
      equityWeight: 2,
      minimumUnderservedShare: 0.4,
      requireCompletePathway: true,
    },
    sensitivityOptionId: "community-youth-outreach",
    costMultiplier: 1,
    effectMultiplier: 1.25,
  };
}

const baseSections = {
  journeys: [journey],
  comparison,
  serviceLabSnapshots: [snapshot("lab-a", "2026-07-20T02:00:00.000Z")],
};

beforeEach(() => {
  window.localStorage.clear();
  resetKnowledgeGapJourneys();
  resetKnowledgeProfile();
  resetMentalHealthComparisonRecord();
  resetAdolescentServiceLabSnapshots();
});

describe("local route archive", () => {
  it("round-trips journeys, comparison records and service lab snapshots", () => {
    const archive = createLocalRouteArchive(baseSections, "2026-07-20T03:00:00.000Z");
    const parsed = parseLocalRouteArchive(JSON.parse(JSON.stringify(archive)));

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.archive.format).toBe(LOCAL_ROUTE_ARCHIVE_FORMAT);
    expect(parsed.archive.journeys.map((item) => item.target.id)).toEqual([journey.target.id]);
    expect(parsed.archive.comparison).toEqual(comparison);
    expect(parsed.archive.serviceLabSnapshots).toEqual(baseSections.serviceLabSnapshots);
  });

  it("omits an empty comparison record and caps service lab snapshots", () => {
    const archive = createLocalRouteArchive(
      {
        journeys: [],
        comparison: { schemaVersion: 1, checkedIds: [], updatedAt: "2026-07-20T01:00:00.000Z" },
        serviceLabSnapshots: Array.from({ length: 10 }, (_, index) =>
          snapshot(`lab-${index}`, `2026-07-20T0${index % 10}:00:00.000Z`)
        ),
      },
      "2026-07-20T03:00:00.000Z"
    );

    expect(archive.comparison).toBeNull();
    expect(archive.serviceLabSnapshots).toHaveLength(8);
    expect(parseLocalRouteArchive(JSON.parse(JSON.stringify(archive))).ok).toBe(true);
  });

  it("migrates legacy journey-only archives into the unified shape", () => {
    const legacy = createKnowledgeGapJourneyArchive([journey], "2026-07-13T03:00:00.000Z");
    const parsed = parseLocalRouteArchive(JSON.parse(JSON.stringify(legacy)));

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.archive.format).toBe(LOCAL_ROUTE_ARCHIVE_FORMAT);
    expect(parsed.archive.journeys).toHaveLength(1);
    expect(parsed.archive.comparison).toBeNull();
    expect(parsed.archive.serviceLabSnapshots).toEqual([]);
  });

  it("rejects malformed unified archives section by section", () => {
    const base = createLocalRouteArchive(baseSections, "2026-07-20T03:00:00.000Z");
    const roundTrip = (value: unknown) => parseLocalRouteArchive(JSON.parse(JSON.stringify(value)));

    expect(roundTrip({ ...base, format: "something-else" })).toEqual({
      ok: false,
      error: "invalid-format",
    });
    expect(roundTrip({ ...base, version: 2 })).toEqual({
      ok: false,
      error: "unsupported-version",
    });
    expect(
      roundTrip({
        ...base,
        comparison: {
          schemaVersion: 1,
          checkedIds: ["unknown-checkpoint"],
          updatedAt: "2026-07-20T01:00:00.000Z",
        },
      })
    ).toEqual({
      ok: false,
      error: "invalid-comparison",
    });
    expect(
      roundTrip({
        ...base,
        serviceLabSnapshots: [
          { ...snapshot("lab-a", "2026-07-20T02:00:00.000Z"), costMultiplier: 9 },
        ],
      })
    ).toEqual({ ok: false, error: "invalid-service-lab-snapshots" });
    expect(
      roundTrip({
        ...base,
        serviceLabSnapshots: [
          snapshot("lab-dup", "2026-07-20T02:00:00.000Z"),
          snapshot("lab-dup", "2026-07-20T02:10:00.000Z"),
        ],
      })
    ).toEqual({ ok: false, error: "duplicate-service-lab-snapshots" });
    expect(
      roundTrip({
        ...base,
        serviceLabSnapshots: Array.from({ length: 9 }, (_, index) =>
          snapshot(`lab-${index}`, "2026-07-20T02:00:00.000Z")
        ),
      })
    ).toEqual({ ok: false, error: "too-many-service-lab-snapshots" });
  });

  it("imports every section without ever touching the mastered profile", () => {
    setKnowledgeNodeMastered("political-science:public-policy", true);
    const before = window.localStorage.getItem(KNOWLEDGE_PROFILE_STORAGE_KEY);

    const parsed = parseLocalRouteArchive(
      JSON.parse(JSON.stringify(createLocalRouteArchive(baseSections)))
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    importKnowledgeGapJourneyArchive(parsed.archive, "keep-existing");
    if (parsed.archive.comparison) replaceMentalHealthComparisonRecord(parsed.archive.comparison);
    importAdolescentServiceLabSnapshots(parsed.archive.serviceLabSnapshots);

    expect(window.localStorage.getItem(KNOWLEDGE_PROFILE_STORAGE_KEY)).toBe(before);
    expect(window.localStorage.getItem(KNOWLEDGE_GAP_JOURNEY_STORAGE_KEY)).toContain(
      journey.target.id
    );
    expect(window.localStorage.getItem(MENTAL_HEALTH_COMPARISON_STORAGE_KEY)).toContain(
      "rights-and-agency"
    );
    expect(window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY)).toContain("lab-a");

    const exported = JSON.stringify(createLocalRouteArchive(baseSections));
    expect(exported).not.toContain("entries");
    expect(exported).not.toContain(KNOWLEDGE_PROFILE_STORAGE_KEY);
  });
});
