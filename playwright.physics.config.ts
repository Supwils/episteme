import { defineConfig, devices } from "@playwright/test";
import { resolveBrowserChannel } from "./scripts/e2e/browser-channel";

const isCI = Boolean(process.env.CI);
const channel = resolveBrowserChannel();

export default defineConfig({
  testDir: "./e2e",
  testMatch: "physics-runtime.spec.ts",
  fullyParallel: false,
  forbidOnly: isCI,
  retries: 0,
  workers: 1,
  timeout: 60_000,
  metadata: { browserChannel: channel },
  reporter: [["line"], ["html", { open: "never", outputFolder: "playwright-report/physics" }]],
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://127.0.0.1:3069",
    browserName: "chromium",
    channel,
    launchOptions: { args: ["--enable-precise-memory-info"] },
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], browserName: "chromium", channel },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], browserName: "chromium", channel },
    },
  ],
  webServer: {
    command: "pnpm exec next start -p 3069",
    url: "http://127.0.0.1:3069",
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
