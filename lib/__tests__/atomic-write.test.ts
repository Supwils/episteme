import { describe, it, expect, afterEach } from "vitest";
import { existsSync, readFileSync, rmSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { writeFileAtomic } from "../atomic-write";

const FIXTURES = join(process.cwd(), ".test-fixtures", "atomic-write");

describe("writeFileAtomic", () => {
  afterEach(() => {
    rmSync(FIXTURES, { recursive: true, force: true });
  });

  it("writes a new file atomically", () => {
    mkdirSync(FIXTURES, { recursive: true });
    const target = join(FIXTURES, "new-file.txt");
    const content = "Hello, atomic world!";

    writeFileAtomic(target, content);

    expect(existsSync(target)).toBe(true);
    expect(readFileSync(target, "utf8")).toBe(content);
  });

  it("replaces an existing file atomically", () => {
    mkdirSync(FIXTURES, { recursive: true });
    const target = join(FIXTURES, "existing.txt");
    writeFileSync(target, "old content");

    const newContent = "new content";
    writeFileAtomic(target, newContent);

    expect(readFileSync(target, "utf8")).toBe(newContent);
  });

  it("writes binary data", () => {
    mkdirSync(FIXTURES, { recursive: true });
    const target = join(FIXTURES, "binary.dat");
    const buffer = Buffer.from([0x00, 0x01, 0x02, 0x03]);

    writeFileAtomic(target, buffer);

    expect(existsSync(target)).toBe(true);
    expect(readFileSync(target)).toEqual(buffer);
  });

  it("does not leave temp files on success", () => {
    mkdirSync(FIXTURES, { recursive: true });
    const target = join(FIXTURES, "no-temp.txt");

    writeFileAtomic(target, "content");

    const files = readdirSync(FIXTURES).filter((f: string) => f.startsWith(".tmp-"));
    expect(files.length).toBe(0);
  });

  it("cleans up temp file on write failure", () => {
    mkdirSync(FIXTURES, { recursive: true });
    const target = join(FIXTURES, "nonexistent", "file.txt");

    expect(() => writeFileAtomic(target, "content")).toThrow();

    const tempFiles = readdirSync(FIXTURES).filter((f: string) => f.startsWith(".tmp-"));
    expect(tempFiles.length).toBe(0);
  });
});
