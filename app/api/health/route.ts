import { NextResponse } from "next/server";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Health check endpoint for deployment readiness.
 *
 * Validates that critical generated artifacts exist, parse correctly, and have
 * the expected structure. Returns 200 with counts when healthy, 503 when
 * missing or corrupt.
 *
 * This is a lightweight check (no full corpus scan) designed to catch
 * gen-all/build failures early without blocking requests.
 */

// Critical generated artifacts that must exist and be parseable
type ValidateResult = string | null;
type ContentData = string | Record<string, unknown>;

interface FileCheck {
  path: string;
  validate: (content: ContentData) => ValidateResult;
  getName: (content: ContentData) => string;
  getCount: (content: ContentData) => number;
}

const CRITICAL_FILES: readonly FileCheck[] = [
  {
    path: "public/search-index.json",
    validate: (data: ContentData) => {
      if (typeof data !== "object" || !data) return "not an object";
      const obj = data as Record<string, unknown>;
      if (!Array.isArray(obj.docs)) return "docs not an array";
      if (obj.docs.length === 0) return "docs array empty";
      if (typeof obj.v !== "number") return "version missing";
      return null;
    },
    getName: (data: ContentData) => `search-index-v${(data as { v: number }).v}`,
    getCount: (data: ContentData) => (data as { docs: unknown[] }).docs.length,
  },
  {
    path: "lib/wiki-link-index.ts",
    validate: (content: ContentData) => {
      const str = String(content);
      if (!str.includes("export const WIKI_LINK_INDEX")) return "export missing";
      if (!str.includes("export function resolveWikiLink")) return "resolver missing";
      if (str.trim().length < 100) return "suspiciously short";
      return null;
    },
    getName: () => "wiki-link-index",
    getCount: (content: ContentData) => {
      const str = String(content);
      const match = str.match(/WIKI_LINK_INDEX[^{]*\{([^}]+)\}/);
      return match ? match[1]!.split(",").filter((s) => s.includes(":")).length : 0;
    },
  },
  {
    path: "lib/backlinks-index.ts",
    validate: (content: ContentData) => {
      const str = String(content);
      if (!str.includes("export const BACKLINKS_INDEX")) return "export missing";
      if (!str.includes("export function getBacklinks")) return "getter missing";
      if (str.trim().length < 100) return "suspiciously short";
      return null;
    },
    getName: () => "backlinks-index",
    getCount: (content: ContentData) => {
      const str = String(content);
      const match = str.match(/BACKLINKS_INDEX[^{]*\{([^}]+)\}/);
      return match ? match[1]!.split(",").filter((s) => s.includes(":")).length : 0;
    },
  },
] as const;

interface HealthResult {
  ok: boolean;
  timestamp: string;
  artifacts?: Record<string, { ok: boolean; count?: number; error?: string; size?: number }>;
  error?: string;
}

export async function GET(): Promise<NextResponse<HealthResult>> {
  const timestamp = new Date().toISOString();
  const root = process.cwd();

  try {
    const artifacts: Record<string, { ok: boolean; count?: number; error?: string; size?: number }> =
      {};

    for (const file of CRITICAL_FILES) {
      const fullPath = join(root, file.path);
      const defaultKey = file.path.replace(/^(public|lib)\//, "").replace(/\.(ts|json)$/, "");

      // Check existence
      if (!existsSync(fullPath)) {
        artifacts[defaultKey] = { ok: false, error: "not found" };
        continue;
      }

      // Get file size
      let size: number;
      try {
        size = statSync(fullPath).size;
      } catch {
        artifacts[defaultKey] = { ok: false, error: "stat failed" };
        continue;
      }

      // Read and validate
      let content: unknown;
      let raw: string;
      try {
        raw = readFileSync(fullPath, "utf8");
        content = file.path.endsWith(".json") ? JSON.parse(raw) : raw;
      } catch (error) {
        artifacts[defaultKey] = {
          ok: false,
          error: `parse failed: ${error instanceof Error ? error.message : "unknown"}`,
          size,
        };
        continue;
      }

      // Run validation
      const contentData = content as ContentData;
      const validationError = file.validate(contentData);
      const artifactKey =
        typeof file.getName === "function" ? file.getName(contentData) : defaultKey;
      if (validationError) {
        artifacts[artifactKey] = { ok: false, error: validationError, size };
        continue;
      }

      // Get count
      let count: number;
      try {
        count = file.getCount(contentData);
      } catch {
        count = 0;
      }

      artifacts[artifactKey] = { ok: true, count, size };
    }

    // Overall health: all artifacts must be ok
    const allOk = Object.values(artifacts).every((a) => a.ok);

    if (!allOk) {
      return NextResponse.json(
        { ok: false, timestamp, artifacts },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { ok: true, timestamp, artifacts },
      { status: 200, headers: { "Cache-Control": "no-store, must-revalidate" } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        timestamp,
        error: `health check failed: ${error instanceof Error ? error.message : "unknown error"}`,
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
