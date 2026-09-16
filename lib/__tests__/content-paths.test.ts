import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  listContentSlugs,
  existingContentFile,
  isPathInsideRoot,
  isSafeContentSegment,
  resolveContentPath,
} from "@/lib/content-paths";
import { getNarration } from "@/lib/narration";
import { getThinkerBySlug } from "@/lib/mdx";

describe("isPathInsideRoot", () => {
  it("accepts the root and files inside it", () => {
    const root = path.resolve("/tmp/kb");
    expect(isPathInsideRoot(root, root)).toBe(true);
    expect(isPathInsideRoot(path.join(root, "era", "note.md"), root)).toBe(true);
  });

  it("rejects a sibling directory that only shares a prefix", () => {
    const root = path.resolve("/tmp/kb");
    expect(isPathInsideRoot(path.resolve("/tmp/kb-extra/note.md"), root)).toBe(false);
  });
});

describe("isSafeContentSegment", () => {
  it("accepts a plain slug", () => {
    expect(isSafeContentSegment("socrates")).toBe(true);
    expect(isSafeContentSegment("socrates.mdx")).toBe(true);
  });

  it("rejects empty, traversal, and separators", () => {
    expect(isSafeContentSegment("")).toBe(false);
    expect(isSafeContentSegment("..")).toBe(false);
    expect(isSafeContentSegment("../secrets")).toBe(false);
    expect(isSafeContentSegment("foo/bar")).toBe(false);
    expect(isSafeContentSegment("foo\\bar")).toBe(false);
  });
});

describe("resolveContentPath", () => {
  it("joins safe segments under root", () => {
    const root = path.resolve("/tmp/kb");
    expect(resolveContentPath(root, "era", "note.md")).toBe(path.join(root, "era", "note.md"));
  });

  it("returns null for traversal or a nested slash in one segment", () => {
    const root = path.resolve("/tmp/kb");
    expect(resolveContentPath(root, "../secrets.md")).toBeNull();
    expect(resolveContentPath(root, "foo/bar.mdx")).toBeNull();
    expect(resolveContentPath(root)).toBeNull();
  });
});

describe("listContentSlugs", () => {
  it("strips the longest extension and skips narration companions", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-slugs-"));
    try {
      fs.writeFileSync(path.join(root, "alpha.mdx"), "x");
      fs.writeFileSync(path.join(root, "beta.md"), "y");
      fs.writeFileSync(path.join(root, "talk.narration.md"), "z");
      expect(listContentSlugs(root, [".mdx", ".md"]).sort()).toEqual(["alpha", "beta"]);
      expect(listContentSlugs(root)).toEqual(["alpha"]);
      expect(listContentSlugs(root, [".md"])).toEqual(["beta"]);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

describe("existingContentFile", () => {
  it("returns null when the file is missing", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-content-"));
    try {
      expect(existingContentFile(root, "missing.mdx")).toBeNull();
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

describe("getNarration", () => {
  it("refuses slugs or sections that leave the domain directory", () => {
    expect(getNarration("philosophy", "thinkers", "../secrets")).toBeNull();
    expect(getNarration("philosophy", "../thinkers", "socrates")).toBeNull();
  });
});

describe("shared loader guard", () => {
  it("keeps thinker lookup on the same traversal contract", () => {
    expect(getThinkerBySlug("../../etc/passwd")).toBeNull();
    expect(getThinkerBySlug("foo/bar")).toBeNull();
  });
});
