import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { DOMAIN_DATA } from "@/lib/search-index/domain-data";
import { buildValidRoutes } from "@/scripts/valid-routes";
import { RELEASED_LINGUISTICS_ARTICLES } from "@/lib/linguistics-subject-plan";
import { getDomainConfig } from "@/lib/new-domains";
import { LinguisticsArticleSchema } from "@/subjects/linguistics/lib/schema";
import { IPA_SOUNDS, getIpaSounds } from "@/subjects/linguistics/lib/ipa-explorer-data";
import { SYNTAX_EXAMPLES, visibleSyntaxNodes } from "@/subjects/linguistics/lib/syntax-tree-data";
import {
  GENEALOGY_TYPE_COMPARISONS,
  LANGUAGE_PROFILES,
  projectLanguageCoordinate,
} from "@/subjects/linguistics/lib/language-map-data";
import {
  WRITING_TIMELINE_ERAS,
  WRITING_TIMELINE_EVENTS,
} from "@/subjects/linguistics/lib/writing-timeline-data";
import {
  SOUND_CHANGE_CASES,
  SOUND_CHANGE_HYPOTHESIS_LABELS,
} from "@/subjects/linguistics/lib/sound-change-data";

const root = path.join(process.cwd(), "content", "linguistics");
const plannedRelease = RELEASED_LINGUISTICS_ARTICLES;
const files = fs
  .readdirSync(root, { recursive: true })
  .filter((file): file is string => typeof file === "string" && file.endsWith(".mdx"));

describe("linguistics staged release", () => {
  it("implements exactly the articles in the released waves", () => {
    const actualSlugs = files.map((file) => path.basename(file, ".mdx")).sort();
    expect(actualSlugs).toEqual(plannedRelease.map((article) => article.slug).sort());
  });

  it("validates dedicated metadata and expert-depth content", () => {
    const plannedBySlug = new Map(plannedRelease.map((article) => [article.slug, article]));
    for (const file of files) {
      const parsed = matter(fs.readFileSync(path.join(root, file), "utf8"));
      const result = LinguisticsArticleSchema.safeParse(parsed.data);
      expect(result.success, file).toBe(true);
      const slug = path.basename(file, ".mdx");
      expect(parsed.data.knowledge_level, slug).toBe(plannedBySlug.get(slug)?.level);
      expect((parsed.content.match(/[\u3400-\u9fff]/g) ?? []).length, slug).toBeGreaterThanOrEqual(
        2200
      );
    }
  });

  it("registers only populated sections and exposes real routes", () => {
    const config = getDomainConfig("linguistics");
    expect(config).not.toBeNull();
    expect(config?.sections).toHaveLength(6);
    const sectionsWithContent = new Set(files.map((file) => file.split(path.sep)[0]));
    expect(config?.sections.map((section) => section.key).sort()).toEqual(
      [...sectionsWithContent].sort()
    );

    const validRoutes = buildValidRoutes();
    for (const file of files) {
      const [section, filename] = file.split(path.sep);
      const slug = filename?.replace(/\.mdx$/, "");
      expect(validRoutes.has(`/linguistics/${section}/${slug}`), file).toBe(true);
    }
  });

  it("includes every foundation article in the generated search index", () => {
    const indexedSlugs = new Set(
      DOMAIN_DATA.filter((entry) => entry.domain === "linguistics").map((entry) => entry.slug)
    );
    expect(indexedSlugs).toEqual(new Set(plannedRelease.map((article) => article.slug)));
  });

  it("attaches the five released interactive visualizations to their source articles", () => {
    const interactiveBySlug = new Map(
      files.map((file) => {
        const parsed = matter(fs.readFileSync(path.join(root, file), "utf8"));
        return [path.basename(file, ".mdx"), parsed.data.interactive] as const;
      })
    );
    expect(interactiveBySlug.get("phonetics-and-ipa")).toBe("ipa-explorer");
    expect(interactiveBySlug.get("syntax")).toBe("syntax-tree-builder");
    expect(interactiveBySlug.get("linguistic-typology")).toBe("language-map");
    expect(interactiveBySlug.get("unicode-and-digital-writing")).toBe("writing-timeline");
    expect(interactiveBySlug.get("languages-change")).toBe("sound-change-lab");
    expect([...interactiveBySlug.values()].filter(Boolean)).toHaveLength(5);
  });

  it("models IPA contrasts with complete articulatory and non-audio cues", () => {
    expect(getIpaSounds("consonant").length).toBeGreaterThanOrEqual(12);
    expect(getIpaSounds("vowel").length).toBeGreaterThanOrEqual(5);
    expect(new Set(IPA_SOUNDS.map((sound) => sound.symbol)).size).toBe(IPA_SOUNDS.length);
    for (const sound of IPA_SOUNDS) {
      expect(sound.articulation.length).toBeGreaterThan(12);
      expect(sound.cue.length).toBeGreaterThan(12);
      expect(sound.exampleLanguage.length).toBeGreaterThan(0);
      expect(sound.x).toBeGreaterThan(0);
      expect(sound.x).toBeLessThan(100);
    }
  });

  it("keeps multilingual syntax examples connected through every reveal stage", () => {
    expect(new Set(SYNTAX_EXAMPLES.map((example) => example.order))).toEqual(
      new Set(["SVO", "SOV", "VSO", "SVO + PP 歧义"])
    );
    expect(
      SYNTAX_EXAMPLES.find((example) => example.id === "english-ambiguity")?.analyses
    ).toHaveLength(2);
    for (const example of SYNTAX_EXAMPLES) {
      for (const analysis of example.analyses) {
        for (const mode of ["constituency", "dependency"] as const) {
          const tree = analysis[mode];
          const nodeIds = new Set(tree.nodes.map((node) => node.id));
          expect(visibleSyntaxNodes(tree.nodes, 2)).toHaveLength(tree.nodes.length);
          for (const edge of tree.edges) {
            expect(nodeIds.has(edge.source), `${example.id}/${mode}/${edge.source}`).toBe(true);
            expect(nodeIds.has(edge.target), `${example.id}/${mode}/${edge.target}`).toBe(true);
          }
        }
      }
    }
  });

  it("uses a globally distributed map sample without conflating genealogy and type", () => {
    expect(LANGUAGE_PROFILES.length).toBeGreaterThanOrEqual(15);
    expect(
      new Set(LANGUAGE_PROFILES.map((language) => language.family)).size
    ).toBeGreaterThanOrEqual(10);
    expect(LANGUAGE_PROFILES.some((language) => language.modality === "signed")).toBe(true);
    for (const language of LANGUAGE_PROFILES) {
      const point = projectLanguageCoordinate(language.longitude, language.latitude);
      expect(point.x, language.id).toBeGreaterThanOrEqual(0);
      expect(point.x, language.id).toBeLessThanOrEqual(100);
      expect(point.y, language.id).toBeGreaterThanOrEqual(0);
      expect(point.y, language.id).toBeLessThanOrEqual(100);
    }
    expect(GENEALOGY_TYPE_COMPARISONS).toHaveLength(3);
  });

  it("models global writing history as evidence-bounded relationships rather than one ladder", () => {
    expect(WRITING_TIMELINE_ERAS).toHaveLength(4);
    expect(WRITING_TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(18);
    expect(
      new Set(WRITING_TIMELINE_EVENTS.map((event) => event.region)).size
    ).toBeGreaterThanOrEqual(8);
    expect(new Set(WRITING_TIMELINE_EVENTS.map((event) => event.relation)).size).toBe(5);
    for (const event of WRITING_TIMELINE_EVENTS) {
      expect(event.evidence.length, event.id).toBeGreaterThan(20);
      expect(event.caution.length, event.id).toBeGreaterThan(20);
      expect(event.sourceUrl, event.id).toMatch(/^https:\/\//);
    }
  });

  it("compares sound-change hypotheses against regularities, exceptions, and historical layers", () => {
    expect(SOUND_CHANGE_CASES).toHaveLength(4);
    expect(Object.keys(SOUND_CHANGE_HYPOTHESIS_LABELS)).toEqual([
      "regular",
      "conditioned",
      "borrowing",
      "analogy",
    ]);

    const assessments = new Set<string>();
    let counterexampleCaseCount = 0;
    for (const evidenceCase of SOUND_CHANGE_CASES) {
      expect(evidenceCase.rows.length, evidenceCase.id).toBeGreaterThanOrEqual(4);
      if (evidenceCase.rows.some((row) => row.counterexample)) counterexampleCaseCount += 1;
      expect(evidenceCase.sourceUrl, evidenceCase.id).toMatch(/^https:\/\//);
      expect(evidenceCase.caution.length, evidenceCase.id).toBeGreaterThan(20);
      expect(evidenceCase.inference.length, evidenceCase.id).toBeGreaterThan(20);
      for (const hypothesis of Object.values(evidenceCase.hypotheses)) {
        assessments.add(hypothesis.assessment);
        expect(hypothesis.evidence.length, evidenceCase.id).toBeGreaterThan(20);
        expect(hypothesis.nextCheck.length, evidenceCase.id).toBeGreaterThan(20);
      }
      expect(
        Object.values(evidenceCase.hypotheses).some(
          (hypothesis) => hypothesis.assessment === "supported"
        ),
        evidenceCase.id
      ).toBe(true);
    }
    expect(assessments).toEqual(new Set(["supported", "limited", "contradicted", "not-needed"]));
    expect(counterexampleCaseCount).toBeGreaterThanOrEqual(3);
  });
});
