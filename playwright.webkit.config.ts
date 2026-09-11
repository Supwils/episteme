import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  testMatch: "webkit-smoke.spec.ts",
  fullyParallel: false,
  forbidOnly: isCI,
  retries: 0,
  workers: 1,
  reporter: [["line"], ["html", { open: "never", outputFolder: "playwright-report/webkit" }]],
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://127.0.0.1:3070",
    browserName: "webkit",
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-webkit",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "pnpm exec next start -p 3070",
    url: "http://127.0.0.1:3070",
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
