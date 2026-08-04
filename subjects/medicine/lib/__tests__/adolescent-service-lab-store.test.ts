// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import {
  ADOLESCENT_SERVICE_LAB_STORAGE_KEY,
  MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS,
  importAdolescentServiceLabSnapshots,
  isAdolescentServiceLabSnapshot,
  mergeAdolescentServiceLabSnapshots,
  removeAdolescentServiceLabSnapshot,
  resetAdolescentServiceLabSnapshots,
  saveAdolescentServiceLabSnapshot,
  type AdolescentServiceLabSnapshot,
} from "../adolescent-service-lab-store";

const input = {
  constraints: {
    budgetUnits: 24,
    equityWeight: 2,
    minimumUnderservedShare: 0.4,
    requireCompletePathway: true,
  },
  sensitivityOptionId: "community-youth-outreach",
  costMultiplier: 1,
  effectMultiplier: 1.25,
} as const;

function snapshot(id: string, savedAt: string): AdolescentServiceLabSnapshot {
  return { ...input, id, savedAt };
}

beforeEach(() => {
  window.localStorage.clear();
  resetAdolescentServiceLabSnapshots();
});

describe("adolescent service lab snapshot store", () => {
  it("saves, persists and removes snapshots", () => {
    const saved = saveAdolescentServiceLabSnapshot(input);
    const raw = window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY) ?? "";
    expect(raw).toContain(saved.id);
    expect(raw).toContain('"version":1');

    removeAdolescentServiceLabSnapshot(saved.id);
    expect(window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY)).not.toContain(saved.id);
  });

  it("keeps only the newest snapshots up to the cap", () => {
    for (let index = 0; index < MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS + 2; index += 1) {
      saveAdolescentServiceLabSnapshot(input);
    }
    const stored = JSON.parse(
      window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY) ?? "{}"
    ) as { snapshots: unknown[] };
    expect(stored.snapshots).toHaveLength(MAX_ADOLESCENT_SERVICE_LAB_SNAPSHOTS);
  });

  it("merges imported snapshots by id without overwriting local ones", () => {
    const local = snapshot("lab-local", "2026-07-20T02:00:00.000Z");
    const merged = mergeAdolescentServiceLabSnapshots(
      [local],
      [{ ...local, costMultiplier: 1.5 }, snapshot("lab-new", "2026-07-20T03:00:00.000Z")]
    );
    expect(merged.map((item) => item.id)).toEqual(["lab-new", "lab-local"]);
    expect(merged.find((item) => item.id === "lab-local")?.costMultiplier).toBe(1);

    importAdolescentServiceLabSnapshots([snapshot("lab-imported", "2026-07-20T04:00:00.000Z")]);
    expect(window.localStorage.getItem(ADOLESCENT_SERVICE_LAB_STORAGE_KEY)).toContain(
      "lab-imported"
    );
  });

  it("validates snapshot ranges and option ids strictly", () => {
    expect(isAdolescentServiceLabSnapshot(snapshot("lab-a", "2026-07-20T02:00:00.000Z"))).toBe(
      true
    );
    const valid = snapshot("lab-a", "2026-07-20T02:00:00.000Z");
    expect(
      isAdolescentServiceLabSnapshot({
        ...valid,
        constraints: { ...valid.constraints, budgetUnits: 40 },
      })
    ).toBe(false);
    expect(
      isAdolescentServiceLabSnapshot({
        ...valid,
        constraints: { ...valid.constraints, minimumUnderservedShare: 0.1 },
      })
    ).toBe(false);
    expect(isAdolescentServiceLabSnapshot({ ...valid, effectMultiplier: 0.1 })).toBe(false);
    expect(isAdolescentServiceLabSnapshot({ ...valid, sensitivityOptionId: "unknown" })).toBe(
      false
    );
    expect(isAdolescentServiceLabSnapshot({ ...valid, savedAt: "not-a-date" })).toBe(false);
  });
});
