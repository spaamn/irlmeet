import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    headless: false,
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
        launchOptions: {
          headless: false,
          args: ["--start-maximized"],
        },
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 30000,
  },
});
