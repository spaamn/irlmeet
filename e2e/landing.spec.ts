import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("has correct title and meta", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/irlmeet/);
  });

  test("displays hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan a date");
  });

  test("hero CTA links to signup", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator('a[href="/signup"]').first();
    await expect(cta).toBeVisible();
  });

  test("nav Get Started links to signup", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Get Started/i });
    await expect(cta).toHaveAttribute("href", "/signup");
  });

  test("features section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Stop chatting.")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Four steps.")).toBeVisible();
  });

  test("testimonials are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Ananya S.")).toBeVisible();
  });

  test("dark mode toggle works", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /switch to/i });
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("scroll hint is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Scroll to explore")).toBeVisible();
  });
});
