// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { replaceKnowledgeProfile, resetKnowledgeProfile } from "../knowledge-profile";

afterEach(() => {
  resetKnowledgeProfile();
  window.localStorage.clear();
});

describe("replaceKnowledgeProfile", () => {
  it("drops node ids and timestamps that cannot belong to the catalog", () => {
    const snapshot = replaceKnowledgeProfile({
      entries: [
        { nodeId: "socrates", confirmedAt: "2026-10-05T00:00:00.000Z" },
        { nodeId: "x".repeat(201), confirmedAt: "2026-10-05T00:00:00.000Z" },
        { nodeId: "plato", confirmedAt: "x".repeat(41) },
      ],
    });
    expect(snapshot.entries.map((entry) => entry.nodeId)).toEqual(["socrates"]);
  });
});
