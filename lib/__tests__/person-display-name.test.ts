import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { UNIVERSE_PHYSICS_DIALOGUES_DATA } from "@/content/universe-physics/dialogues-data";
import { readContentBySlug } from "@/lib/content-article";
import { getDomainContentDir } from "@/lib/content-paths";
import { personDisplayName, personPageTitle } from "@/lib/person-display-name";
import { loadEngine } from "@/lib/search/engine";
import type { SearchIndexArtifact } from "@/lib/search/types";
import { indexPhysics } from "@/lib/search-index/physics-index";

function articleBody(domain: string, section: string, slug: string): string {
  const dir = path.join(getDomainContentDir(domain), section);
  return readContentBySlug(dir, slug, undefined, "safe")?.content ?? "";
}

describe("personDisplayName", () => {
  it("prefers the person-page title over a longer name in the same article", () => {
    const text = articleBody("life-science", "dialogues", "darwin-nietzsche");
    expect(personDisplayName("nietzsche", text)).toBe("尼采");
    expect(personDisplayName("darwin", text)).toBe("查尔斯·达尔文");
  });

  it("uses the name already written beside the Latin form", () => {
    expect(
      personDisplayName("linnaeus", articleBody("life-science", "dialogues", "linnaeus-darwin"))
    ).toBe("卡尔·林奈");
    expect(
      personDisplayName("arendt", articleBody("life-science", "dialogues", "margulis-arendt"))
    ).toBe("汉娜·阿伦特");
    expect(
      personDisplayName("bohr", articleBody("universe-physics", "dialogues", "bohr-nagarjuna"))
    ).toBe("尼尔斯·玻尔");
  });

  it("keeps the slug when no page and no beside-name exist", () => {
    expect(
      personDisplayName("wilkins", articleBody("life-science", "dialogues", "franklin-wilkins"))
    ).toBe("wilkins");
    expect(
      personDisplayName("morgan", articleBody("life-science", "dialogues", "mendel-morgan"))
    ).toBe("morgan");
    expect(personDisplayName("mayr", articleBody("life-science", "dialogues", "wilson-mayr"))).toBe(
      "mayr"
    );
    expect(
      personDisplayName(
        "mainstream",
        articleBody("life-science", "dialogues", "mcclintock-mainstream")
      )
    ).toBe("mainstream");
    expect(
      personDisplayName(
        "heisenberg",
        articleBody("universe-physics", "dialogues", "bohr-heisenberg")
      )
    ).toBe("heisenberg");
    expect(personDisplayName("not-a-person", "")).toBe("not-a-person");
  });

  it("does not choose between person pages that disagree", () => {
    expect(personPageTitle("jurgen-habermas")).toBeNull();
  });

  it("uses the scientist page title when that id has no article file", () => {
    expect(personDisplayName("lyell", "")).toBe("查尔斯·莱尔");
  });
});

describe("physics dialogue search labels", () => {
  const docs = indexPhysics([], [], null, null, { UNIVERSE_PHYSICS_DIALOGUES_DATA });

  it("prints the resolved names and keeps the ids for recall", () => {
    const doc = docs.find((item) => item.url === "/universe-physics/dialogues/einstein-kant");
    expect(doc?.subtitle).toBe("阿尔伯特·爱因斯坦、康德");
    expect(doc?.aliases).toBe("einstein kant");
  });

  it("leaves an unresolved pair as slugs", () => {
    const doc = docs.find((item) => item.url === "/universe-physics/dialogues/tesla-edison");
    expect(doc?.subtitle).toBe("tesla、edison");
    expect(doc?.aliases).toBe("tesla edison");
  });
});

describe("shipped physics dialogue subtitles", () => {
  const artifact = JSON.parse(
    readFileSync("public/search-index.json", "utf8")
  ) as SearchIndexArtifact;

  it("does not show a resolvable slug, and the slug still matches", () => {
    const doc = artifact.docs.find(
      (item) => item.u === "/universe-physics/dialogues/einstein-kant"
    );
    expect(doc?.s).toBe("阿尔伯特·爱因斯坦、康德");
    const urls = loadEngine(artifact)
      .search("einstein", 8)
      .map((hit) => hit.url);
    expect(urls).toContain("/universe-physics/dialogues/einstein-kant");
  });
});
