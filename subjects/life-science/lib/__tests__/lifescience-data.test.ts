import { describe, it, expect } from "vitest";
import { getAllSpecies, getSpeciesById, getSpeciesByEra } from "../species";
import { getAllScientists, getScientistById } from "../scientists";
import { getAllExtinctions, getExtinctionById } from "../extinctions";
import { getAllTimelineEvents, getTimelineEventById } from "../timeline-events";
import { getAllDomains, getDomainById } from "../tree-data";

describe("life-science data access", () => {
  describe("getAllSpecies", () => {
    it("has at least the core species set", () => {
      expect(getAllSpecies().length).toBeGreaterThanOrEqual(93);
    });

    it("each species has required fields (id, name, era, taxonomy)", () => {
      for (const species of getAllSpecies()) {
        expect(species.id).toBeTruthy();
        expect(species.name).toBeTruthy();
        expect(species.era).toBeTruthy();
        expect(species.taxonomy).toBeDefined();
        expect(species.taxonomy.kingdom).toBeTruthy();
      }
    });

    it("no duplicate IDs", () => {
      const ids = getAllSpecies().map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("all species have keyTraits", () => {
      for (const species of getAllSpecies()) {
        expect(species.keyTraits).toBeDefined();
        expect(Array.isArray(species.keyTraits)).toBe(true);
        expect(species.keyTraits.length).toBeGreaterThan(0);
      }
    });

    it("all species have extinct field", () => {
      for (const species of getAllSpecies()) {
        expect(typeof species.extinct).toBe("boolean");
      }
    });
  });

  describe("getSpeciesById", () => {
    it("returns a species for a valid ID", () => {
      const species = getSpeciesById("stromatolite");
      expect(species).toBeDefined();
      expect(species!.name).toBe("叠层石");
    });

    it("returns undefined for an invalid ID", () => {
      expect(getSpeciesById("nonexistent-id")).toBeUndefined();
    });
  });

  describe("getSpeciesByEra", () => {
    it("returns species matching the given era", () => {
      const ancient = getSpeciesByEra("太古宙");
      expect(ancient.length).toBeGreaterThan(0);
      for (const s of ancient) {
        expect(s.era).toBe("太古宙");
      }
    });

    it("returns empty array for non-existent era", () => {
      expect(getSpeciesByEra("不存在的纪元")).toEqual([]);
    });
  });

  describe("getAllScientists", () => {
    it("returns at least 18 scientists", () => {
      expect(getAllScientists().length).toBeGreaterThanOrEqual(18);
    });
  });

  describe("getScientistById", () => {
    it("returns a scientist for a valid ID", () => {
      const scientist = getScientistById("darwin");
      expect(scientist).toBeDefined();
      expect(scientist!.nameEn).toBe("Charles Darwin");
    });

    it("returns undefined for an invalid ID", () => {
      expect(getScientistById("nonexistent")).toBeUndefined();
    });
  });

  describe("getAllExtinctions", () => {
    it("returns 5 extinctions", () => {
      expect(getAllExtinctions()).toHaveLength(5);
    });

    it("extinctions are ordered by time (oldest first)", () => {
      const extinctions = getAllExtinctions();
      for (let i = 1; i < extinctions.length; i++) {
        expect(extinctions[i - 1]!.dateMYA).toBeGreaterThanOrEqual(extinctions[i]!.dateMYA);
      }
    });
  });

  describe("getExtinctionById", () => {
    it("returns an extinction for a valid ID", () => {
      const ext = getExtinctionById("permian");
      expect(ext).toBeDefined();
      expect(ext!.speciesLostPercent).toBe(96);
    });

    it("returns undefined for an invalid ID", () => {
      expect(getExtinctionById("nonexistent")).toBeUndefined();
    });
  });

  describe("getAllTimelineEvents", () => {
    it("returns a non-empty array", () => {
      expect(getAllTimelineEvents().length).toBeGreaterThan(0);
    });

    it("no duplicate IDs", () => {
      const ids = getAllTimelineEvents().map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("getTimelineEventById", () => {
    it("returns undefined for an invalid ID", () => {
      expect(getTimelineEventById("nonexistent")).toBeUndefined();
    });
  });

  describe("getAllDomains", () => {
    it("returns 3 domains", () => {
      expect(getAllDomains()).toHaveLength(3);
    });

    it("each domain has required fields", () => {
      for (const domain of getAllDomains()) {
        expect(domain.id).toBeTruthy();
        expect(domain.name).toBeTruthy();
        expect(domain.characteristics.length).toBeGreaterThan(0);
        expect(domain.keyPhyla.length).toBeGreaterThan(0);
      }
    });
  });

  describe("getDomainById", () => {
    it("returns a domain for a valid ID", () => {
      const domain = getDomainById("bacteria");
      expect(domain).toBeDefined();
      expect(domain!.nameEn).toBe("Bacteria");
    });

    it("returns undefined for an invalid ID", () => {
      expect(getDomainById("nonexistent")).toBeUndefined();
    });
  });
});
