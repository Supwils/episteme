import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FONT_BUDGET = 14 * 1024 * 1024;
const FUNCTION_BUDGET = 20 * 1024 * 1024;

function inventory(trace) {
  const files = new Set();
  const errors = [];
  let bytes = 0;
  for (const name of JSON.parse(readFileSync(trace, "utf8")).files) {
    const path = resolve(dirname(trace), name);
    if (!existsSync(path)) {
      errors.push(`Missing traced file: ${path}`);
      continue;
    }
    const canonical = realpathSync(path);
    if (!files.has(canonical)) {
      files.add(canonical);
      bytes += statSync(canonical).size;
    }
  }
  return { files, bytes, errors };
}

export function auditOgAssets(
  root = ROOT,
  nextDir = resolve(root, process.env.NEXT_DIST_DIR ?? ".next")
) {
  const trace = resolve(nextDir, "server/app/api/og/route.js.nft.json");
  if (!existsSync(trace))
    return { errors: ["OG Node function trace is missing"], bytes: 0, fontBytes: 0 };
  const result = inventory(trace);
  let fontBytes = 0;
  for (const font of JSON.parse(readFileSync(resolve(root, "assets/og/fonts.json"), "utf8"))) {
    for (const name of [font.file, font.license]) {
      const path = resolve(root, "assets/og", name);
      if (!existsSync(path) || !result.files.has(realpathSync(path)))
        result.errors.push(`OG asset is not packaged: ${name}`);
    }
    const path = resolve(root, "assets/og", font.file);
    if (existsSync(path)) {
      const data = readFileSync(path);
      fontBytes += data.byteLength;
      if (createHash("sha256").update(data).digest("hex") !== font.sha256)
        result.errors.push(`OG font checksum changed: ${font.file}`);
    }
  }
  const wasm = resolve(root, "node_modules/@resvg/resvg-wasm/index_bg.wasm");
  if (!existsSync(wasm) || !result.files.has(realpathSync(wasm)))
    result.errors.push("Resvg WASM is not packaged");
  const edge = JSON.parse(
    readFileSync(resolve(nextDir, "server/middleware-manifest.json"), "utf8")
  );
  if (Object.hasOwn(edge.functions, "/api/og"))
    result.errors.push("OG must run in the Node runtime");
  if (fontBytes > FONT_BUDGET) result.errors.push("OG fonts exceed 14 MiB");
  if (result.bytes > FUNCTION_BUDGET) result.errors.push("OG traced function exceeds 20 MiB");
  return { errors: result.errors, bytes: result.bytes, fontBytes };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = auditOgAssets();
    console.log(
      `OG assets: ${(result.fontBytes / 1024 / 1024).toFixed(2)} MiB fonts / ${(result.bytes / 1024 / 1024).toFixed(2)} MiB function`
    );
    if (result.errors.length) {
      console.error(result.errors.join("\n"));
      process.exitCode = 1;
    } else console.log("PASS: OG fonts, licenses, WASM and Node function budgets");
  } catch (error) {
    console.error(String(error));
    process.exitCode = 1;
  }
}
