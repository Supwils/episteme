import { defineConfig, devices } from "@playwright/test";

// Every feature spec against a production server. Smoke gates each deploy;
// this suite runs nightly so drift in the slower specs surfaces within a day.
const isCI = Boolean(process.env.CI);
const port = Number(process.env.E2E_PORT ?? 3070);

export default defineConfig({
  testDir: "./e2e",
  testIgnore: ["smoke.spec.ts", "physics-runtime.spec.ts", "webkit-smoke.spec.ts"],
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : 4,
  timeout: 60_000,
  reporter: isCI
    ? [["line"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : [["html", { open: "never", outputFolder: "playwright-report" }]],
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: "chrome",
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], browserName: "chromium", channel: "chrome" },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], browserName: "chromium", channel: "chrome" },
    },
  ],
  webServer: {
    command: `pnpm exec next start -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
