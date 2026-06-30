import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: "list",
  timeout: 30000,
  use: {
    baseURL: process.env.TEST_URL || "http://localhost:3000",
    headless: false,
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    launchOptions: {
      headless: false,
      args: ["--start-maximized"],
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: process.env.TEST_URL
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 30000,
      },
});
