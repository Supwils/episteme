import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { contentTreeStamp } from "@/lib/content-freshness";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

function tempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "episteme-stamp-"));
  dirs.push(dir);
  return dir;
}

describe("contentTreeStamp", () => {
  it("changes when a content file is added and ignores narration sidecars", () => {
    const dir = tempDir();
    fs.writeFileSync(path.join(dir, "a.md"), "a");
    const first = contentTreeStamp(dir);
    fs.writeFileSync(path.join(dir, "a.narration.md"), "narration");
    expect(contentTreeStamp(dir)).toBe(first);
    const nested = path.join(dir, "nested");
    fs.mkdirSync(nested);
    fs.writeFileSync(path.join(nested, "b.mdx"), "b");
    expect(contentTreeStamp(dir)).not.toBe(first);
  });

  it("reports a missing directory without throwing", () => {
    expect(contentTreeStamp(path.join(os.tmpdir(), "episteme-stamp-missing-dir"))).toBe("missing");
  });
});
