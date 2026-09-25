import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUCTION_SITE_URL } from "@/lib/constants";

const ROOT = process.cwd();
const SOURCE_DIRS = ["app", "components", "lib", "subjects"];
const HOST_PATTERN = /https?:\/\/[a-z0-9-]+\.vercel\.app/;

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return entry === "__tests__" ? [] : listSourceFiles(full);
    return /\.(ts|tsx)$/.test(entry) ? [full] : [];
  });
}

describe("site URL", () => {
  it("defaults to the production alias this project owns", () => {
    // episteme.vercel.app is an unrelated project; canonical URLs once pointed there.
    expect(PRODUCTION_SITE_URL).toBe("https://episteme-self.vercel.app");
  });

  it("is declared only in lib/constants.ts", () => {
    const offenders = SOURCE_DIRS.flatMap((dir) => listSourceFiles(path.join(ROOT, dir)))
      .filter((file) => !file.endsWith(path.join("lib", "constants.ts")))
      .filter((file) => HOST_PATTERN.test(readFileSync(file, "utf8")))
      .map((file) => path.relative(ROOT, file));
    expect(offenders).toEqual([]);
  });
});
