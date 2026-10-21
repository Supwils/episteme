import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { afterEach, expect, it } from "vitest";
import { auditOgAssets } from "./og-assets-audit.mjs";

const roots = [];
afterEach(() => roots.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true })));
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "episteme-og-assets-"));
  roots.push(root);
  const next = join(root, ".next");
  const trace = join(next, "server/app/api/og/route.js.nft.json");
  mkdirSync(dirname(trace), { recursive: true });
  mkdirSync(join(root, "assets/og"), { recursive: true });
  mkdirSync(join(root, "node_modules/@resvg/resvg-wasm"), { recursive: true });
  const font = Buffer.from("font fixture");
  const files = [
    "assets/og/font.ttf",
    "assets/og/OFL.txt",
    "node_modules/@resvg/resvg-wasm/index_bg.wasm",
  ];
  files.forEach((name) => writeFileSync(join(root, name), font));
  writeFileSync(
    join(root, "assets/og/fonts.json"),
    JSON.stringify([
      {
        file: "font.ttf",
        license: "OFL.txt",
        sha256: createHash("sha256").update(font).digest("hex"),
      },
    ])
  );
  writeFileSync(
    trace,
    JSON.stringify({ files: files.map((name) => relative(dirname(trace), join(root, name))) })
  );
  writeFileSync(join(next, "server/middleware-manifest.json"), JSON.stringify({ functions: {} }));
  return { root, next, trace };
}

it("accepts a complete Node function inventory", () => {
  const { root, next } = fixture();
  expect(auditOgAssets(root, next).errors).toEqual([]);
});

it.each(["font.ttf", "OFL.txt", "index_bg.wasm"])("rejects a missing packaged %s", (name) => {
  const { root, next, trace } = fixture();
  const data = JSON.parse(readFileSync(trace, "utf8"));
  data.files = data.files.filter((path) => !path.endsWith(name));
  writeFileSync(trace, JSON.stringify(data));
  expect(auditOgAssets(root, next).errors.join("\n")).toContain(
    name === "index_bg.wasm" ? "WASM" : name
  );
});

it("rejects a corrupt font, an Edge function and an oversized inventory", () => {
  const { root, next } = fixture();
  writeFileSync(join(root, "assets/og/font.ttf"), Buffer.alloc(21 * 1024 * 1024));
  writeFileSync(
    join(next, "server/middleware-manifest.json"),
    JSON.stringify({ functions: { "/api/og": {} } })
  );
  expect(auditOgAssets(root, next).errors).toEqual(
    expect.arrayContaining([
      "OG font checksum changed: font.ttf",
      "OG must run in the Node runtime",
      "OG fonts exceed 14 MiB",
      "OG traced function exceeds 20 MiB",
    ])
  );
});
