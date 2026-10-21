import { readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Leave headroom below the platform's 250 MB uncompressed function limit.
export const FUNCTION_TRACE_BUDGET = 225 * 1024 * 1024;

export function auditFunctionAssets(nextDir, budget = FUNCTION_TRACE_BUDGET) {
  const root = resolve(nextDir, "server/app");
  const errors = [];
  const entries = [];
  const sizes = new Map();
  const paths = readdirSync(root, { recursive: true }).filter((name) =>
    name.endsWith(".js.nft.json")
  );
  if (paths.length === 0) errors.push("No server function traces found");
  for (const name of paths) {
    const trace = resolve(root, name);
    const seen = new Set();
    let bytes = 0;
    for (const file of JSON.parse(readFileSync(trace, "utf8")).files) {
      const path = resolve(dirname(trace), file);
      let entry = sizes.get(path);
      if (!entry) {
        try {
          entry = { canonical: realpathSync(path), bytes: statSync(path).size };
          sizes.set(path, entry);
        } catch {
          errors.push(`${name}: missing traced file ${file}`);
          continue;
        }
      }
      if (seen.has(entry.canonical)) continue;
      seen.add(entry.canonical);
      bytes += entry.bytes;
    }
    entries.push({ trace: relative(root, trace), bytes });
    if (bytes > budget) {
      errors.push(
        `${name}: ${(bytes / 1024 / 1024).toFixed(2)} MiB exceeds ${(budget / 1024 / 1024).toFixed(2)} MiB trace budget`
      );
    }
  }
  return { errors, entries: entries.sort((left, right) => right.bytes - left.bytes) };
}

function main() {
  const nextDir = resolve(process.argv[2] ?? process.env.NEXT_DIST_DIR ?? ".next");
  const result = auditFunctionAssets(nextDir);
  console.log(`Server function traces: ${result.entries.length}`);
  for (const entry of result.entries.slice(0, 5))
    console.log(`${entry.trace}: ${(entry.bytes / 1024 / 1024).toFixed(2)} MiB`);
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else console.log("PASS: server function traces retain platform size headroom");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
