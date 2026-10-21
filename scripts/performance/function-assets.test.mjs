import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auditFunctionAssets } from "./function-assets-audit.mjs";

describe("server function asset budgets", () => {
  let root;
  let directory;
  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "episteme-function-assets-"));
    directory = join(root, "server/app/example");
    mkdirSync(directory, { recursive: true });
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  function trace(files) {
    writeFileSync(join(directory, "page.js.nft.json"), JSON.stringify({ version: 1, files }));
  }

  it("counts a shared target once while retaining its runtime data", () => {
    writeFileSync(join(directory, "article.mdx"), "article");
    symlinkSync("article.mdx", join(directory, "alias.mdx"));
    trace(["article.mdx", "alias.mdx"]);
    const result = auditFunctionAssets(root, 10);
    expect(result.errors).toEqual([]);
    expect(result.entries[0].bytes).toBe(7);
  });

  it("rejects an oversized uncompressed payload even when it compresses well", () => {
    writeFileSync(join(directory, "payload.bin"), Buffer.alloc(2048));
    trace(["payload.bin"]);
    expect(auditFunctionAssets(root, 1024).errors[0]).toContain("exceeds");
  });

  it("rejects a missing runtime file", () => {
    trace(["missing.mdx"]);
    expect(auditFunctionAssets(root, 1024).errors[0]).toContain("missing traced file");
  });

  it("rejects a build without function traces", () => {
    expect(auditFunctionAssets(root).errors).toContain("No server function traces found");
  });
});
