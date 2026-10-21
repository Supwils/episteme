import { defineConfig, devices } from "@playwright/test";
import { resolveBrowserChannel } from "./scripts/e2e/browser-channel";

const isCI = Boolean(process.env.CI);
const channel = resolveBrowserChannel();

export default defineConfig({
  testDir: "./e2e",
  testMatch: "smoke.spec.ts",
  fullyParallel: false,
  forbidOnly: isCI,
  failOnFlakyTests: isCI,
  retries: isCI ? 1 : 0,
  workers: 1,
  metadata: { browserChannel: channel },
  reporter: isCI
    ? [["line"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : [["html", { open: "never", outputFolder: "playwright-report" }]],
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://127.0.0.1:3068",
    channel,
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-smoke",
      use: { ...devices["Desktop Chrome"], browserName: "chromium", channel },
    },
    {
      name: "mobile-smoke",
      use: { ...devices["iPhone 13"], browserName: "chromium", channel },
    },
  ],
  webServer: {
    command: "pnpm exec next start -p 3068",
    url: "http://127.0.0.1:3068",
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
