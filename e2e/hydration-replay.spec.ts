import { build, stop } from "esbuild";
import { expect, test } from "@playwright/test";

const bundles = new Map<string, string>();
const runtimes = [
  { name: "production", environment: "production", entry: "client" },
  { name: "development", environment: "development", entry: "client" },
  { name: "profiling-production", environment: "production", entry: "profiling" },
  { name: "profiling-development", environment: "development", entry: "profiling" },
];

test.beforeAll(async () => {
  for (const runtime of runtimes) {
    const bundle = await build({
      entryPoints: ["e2e/fixtures/hydration-replay.tsx"],
      bundle: true,
      write: false,
      platform: "browser",
      format: "iife",
      jsx: "automatic",
      define: { "process.env.NODE_ENV": JSON.stringify(runtime.environment) },
      // App Router aliases these packages to Next's vendored React. Testing
      // the top-level react-dom dependency would miss the production runtime.
      alias: {
        react: "next/dist/compiled/react",
        "react-dom": "next/dist/compiled/react-dom",
        "react-dom/client": `next/dist/compiled/react-dom/${runtime.entry}`,
      },
    });
    bundles.set(runtime.name, bundle.outputFiles![0]!.text);
  }
});

// The build service must release its worker before Playwright changes projects.
test.afterAll(() => stop());

for (const runtime of runtimes) {
  for (const host of ["main", "div"] as const) {
    for (const mode of ["replay", "sync", "late", "mismatch"] as const) {
      test(`${runtime.name}: ${host} ${mode} preserves hydration diagnostics and DOM`, async ({
        page,
      }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.route("**/hydration-replay-fixture", (route) =>
          route.fulfill({
            contentType: "text/html",
            body: `<!doctype html><html><body><div id="fixture"><div><p>Before article</p><${host} id="replay-target"><section id="resolved-child">Resolved article</section></${host}><p>After article</p><button>Clicks: 0</button></div></div><script>window.hydrationReplay=${JSON.stringify({ mode, host, errors: [], reused: false, done: false })}</script><script>${bundles.get(runtime.name)}</script></body></html>`,
          })
        );
        await page.goto("/hydration-replay-fixture");
        await expect.poll(() => page.evaluate(() => window.hydrationReplay.done)).toBe(true);
        const result = await page.evaluate(() => window.hydrationReplay);
        if (mode === "mismatch") {
          expect(result.errors.length).toBeGreaterThan(0);
          expect(result.reused).toBe(false);
          await expect(page.getByText("Different client text")).toBeVisible();
        } else {
          expect(result.errors).toEqual([]);
          expect(result.reused).toBe(true);
        }
        await page.getByRole("button", { name: "Clicks: 0" }).click();
        await expect(page.getByRole("button", { name: "Clicks: 1" })).toBeVisible();
        expect(errors).toEqual([]);
      });
    }
  }
}
