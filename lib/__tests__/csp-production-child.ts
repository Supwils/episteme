/**
 * Loaded only by csp-headers.test.ts under NODE_ENV=production.
 * Vitest itself imports next.config while NODE_ENV is "test", so the
 * production branch of the policy cannot be seen in-process.
 */
if (process.env.NODE_ENV !== "production") {
  console.error("csp production probe requires NODE_ENV=production");
  process.exit(1);
}

async function main(): Promise<void> {
  const { getPathMatch } = await import("next/dist/shared/lib/router/utils/path-match");
  const loaded: { default: unknown } = await import("../../next.config");

  type HeaderRule = { source: string; headers: { key: string; value: string }[] };
  type NextConfig = { headers?: () => Promise<HeaderRule[]> };

  function unwrap(value: unknown): NextConfig {
    let current = value;
    for (let depth = 0; depth < 4; depth += 1) {
      if (
        current &&
        typeof current === "object" &&
        "headers" in current &&
        typeof current.headers === "function"
      ) {
        return current as NextConfig;
      }
      if (current && typeof current === "object" && "default" in current) {
        current = current.default;
        continue;
      }
      break;
    }
    throw new Error("next config has no headers()");
  }

  const nextConfig = unwrap(loaded);
  if (!nextConfig.headers) throw new Error("next config has no headers()");
  const rules = await nextConfig.headers();

  function cspFor(pathname: string): string {
    const matching = rules.filter((rule) => getPathMatch(rule.source)(pathname));
    if (matching.length !== 1) throw new Error(`${pathname} matched ${matching.length} policies`);
    const csp = matching[0]?.headers.find(
      (header) => header.key === "Content-Security-Policy"
    )?.value;
    if (!csp) throw new Error(`missing CSP for ${pathname}`);
    return csp;
  }

  function flags(pathname: string) {
    const csp = cspFor(pathname);
    return {
      eval: csp.includes("unsafe-eval"),
      rcsb: csp.includes("rcsb.org"),
      iconify: csp.includes("iconify"),
      pinnedIconify: csp.includes("iconify-icon/2.1.0/iconify-icon.min.js"),
      blobWorker: /worker-src[^;]*blob:/.test(csp),
    };
  }

  console.log(
    JSON.stringify({
      home: flags("/"),
      search: flags("/search"),
      medicineExtra: flags("/medicine-extra"),
      medicine: flags("/medicine/concepts/immune-system"),
      chemistry: flags("/chemistry"),
      molecules: flags("/molecules"),
      history: flags("/human-history/timeline"),
    })
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
