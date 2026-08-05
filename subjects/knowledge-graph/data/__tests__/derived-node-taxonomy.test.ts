import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../graph-data";
import {
  DERIVED_DOMAINS,
  SECTION_ANCHOR_OVERRIDES,
  SECTION_KNOWLEDGE_LEVEL,
} from "../derived-node-taxonomy";

/**
 * A content section that nobody registers does not fail — it quietly produces
 * nothing, or produces nodes at a default level that no learning path can reach.
 * That failure mode has cost five separate repair rounds, so it is asserted here
 * rather than discovered again.
 */

const contentRoot = path.join(process.cwd(), "content");

/** Sections deliberately kept out of the registry, with the reason. */
const UNREGISTERED_BY_DESIGN = new Map<string, string>([
  [
    "human-history/knowledge-base",
    "six editorial meta documents, removed from the detail routes in session #217; the history articles themselves are composites one directory deeper",
  ],
]);

const sectionsWithArticles = (domainDirectory: string): string[] =>
  fs
    .readdirSync(path.join(contentRoot, domainDirectory), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((section) =>
      fs
        .readdirSync(path.join(contentRoot, domainDirectory, section))
        .some((file) => /\.mdx?$/.test(file) && !file.endsWith(".narration.md"))
    );

describe("derived node taxonomy", () => {
  it("assigns a knowledge level to every registered section", () => {
    for (const domain of DERIVED_DOMAINS) {
      for (const section of domain.sections) {
        expect(
          SECTION_KNOWLEDGE_LEVEL[section],
          `${domain.contentDirectory}/${section}`
        ).toBeDefined();
      }
    }
  });

  it("registers every section that holds articles, or records why not", () => {
    for (const domain of DERIVED_DOMAINS) {
      const registered = new Set(domain.sections);
      for (const section of sectionsWithArticles(domain.contentDirectory)) {
        const key = `${domain.contentDirectory}/${section}`;
        expect(registered.has(section) || UNREGISTERED_BY_DESIGN.has(key), key).toBe(true);
      }
    }
  });

  it("points every registered section at a directory that exists", () => {
    for (const domain of DERIVED_DOMAINS) {
      for (const section of domain.sections) {
        const sectionPath = path.join(contentRoot, domain.contentDirectory, section);
        expect(fs.existsSync(sectionPath), sectionPath).toBe(true);
      }
    }
  });

  it("anchors each domain to a level-1 node so its articles gain a prerequisite", () => {
    const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    for (const domain of DERIVED_DOMAINS) {
      if (!domain.entryNodeId) continue;
      const anchor = nodeMap.get(domain.entryNodeId);
      expect(anchor, domain.entryNodeId).toBeDefined();
      expect(anchor!.knowledgeLevel, domain.entryNodeId).toBe(1);
    }
  });

  it("keeps every section anchor override below the section it serves", () => {
    const nodeMap = new Map(ALL_NODES.map((node) => [node.id, node]));
    for (const [key, anchorId] of Object.entries(SECTION_ANCHOR_OVERRIDES)) {
      const anchor = nodeMap.get(anchorId);
      expect(anchor, anchorId).toBeDefined();
      const section = key.split("/").at(-1)!;
      expect(anchor!.knowledgeLevel, `${anchorId} -> ${key}`).toBeLessThan(
        SECTION_KNOWLEDGE_LEVEL[section]!
      );
    }
  });
});
