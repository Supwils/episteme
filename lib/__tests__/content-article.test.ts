import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  loadAllContent,
  loadContentBySlug,
  readContentBySlug,
  readContentEntries,
  readParsedFile,
  recoverBrokenFrontmatter,
} from "@/lib/content-article";

type Article = { title: string; slug: string; body: string };

function toArticle(data: Record<string, unknown>, content: string, slug: string): Article {
  return { title: String(data.title ?? ""), slug, body: content.trim() };
}

describe("loadContentBySlug", () => {
  it("does not cache a missing file, so a later write can appear", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    const cache = new Map<string, Article | null>();
    try {
      expect(loadContentBySlug(dir, "alpha", cache, toArticle)).toBeNull();
      expect(cache.has("alpha")).toBe(false);
      fs.writeFileSync(path.join(dir, "alpha.mdx"), "---\ntitle: Alpha\n---\nHello\n");
      expect(loadContentBySlug(dir, "alpha", cache, toArticle)).toEqual({
        title: "Alpha",
        slug: "alpha",
        body: "Hello",
      });
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("caches a map failure as null", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    const cache = new Map<string, Article | null>();
    try {
      fs.writeFileSync(path.join(dir, "beta.mdx"), "---\ntitle: Beta\n---\nBody\n");
      expect(
        loadContentBySlug(dir, "beta", cache, () => {
          throw new Error("map failed");
        })
      ).toBeNull();
      expect(cache.get("beta")).toBeNull();
      expect(loadContentBySlug(dir, "beta", cache, toArticle)).toBeNull();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("loadAllContent", () => {
  it("skips missing parses and honors sort", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    const cache = new Map<string, Article | null>();
    try {
      fs.writeFileSync(path.join(dir, "b.mdx"), "---\ntitle: B\n---\n");
      fs.writeFileSync(path.join(dir, "a.mdx"), "---\ntitle: A\n---\n");
      const items = loadAllContent(dir, cache, toArticle, {
        sort: (left, right) => left.title.localeCompare(right.title),
      });
      expect(items.map((item) => item.title)).toEqual(["A", "B"]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("readContentEntries", () => {
  it("returns frontmatter without going through the slug cache", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    try {
      fs.writeFileSync(path.join(dir, "gamma.mdx"), "---\ntitle: Gamma\n---\nText\n");
      expect(readContentEntries(dir)).toEqual([
        { slug: "gamma", frontmatter: { title: "Gamma" }, content: "Text\n" },
      ]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

const BROKEN_FRONTMATTER = "---\ntitle: [\n---\nKept body\n";

describe("recoverBrokenFrontmatter", () => {
  it("keeps the raw file as body in safe mode", () => {
    expect(recoverBrokenFrontmatter(BROKEN_FRONTMATTER, "safe")).toEqual({
      data: {},
      content: BROKEN_FRONTMATTER,
    });
  });

  it("strips a leftover fence in lenient mode", () => {
    expect(recoverBrokenFrontmatter(BROKEN_FRONTMATTER, "lenient")).toEqual({
      data: {},
      content: "Kept body",
    });
  });
});

describe("readContentBySlug and readParsedFile", () => {
  it("returns null when the article is missing", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    try {
      expect(readContentBySlug(dir, "missing")).toBeNull();
      expect(readParsedFile(path.join(dir, "missing.mdx"), "lenient")).toBeNull();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("reads a .md frontier-style file with safe parse", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-article-"));
    try {
      fs.writeFileSync(path.join(dir, "note.md"), "---\ntitle: Note\n---\nBody\n");
      expect(readContentBySlug(dir, "note", [".md"], "safe")).toEqual({
        slug: "note",
        frontmatter: { title: "Note" },
        content: "Body\n",
      });
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
