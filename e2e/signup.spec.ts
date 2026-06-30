import { test, expect } from "@playwright/test";

test.describe("Signup Flow", () => {
  test("signup page renders correctly", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /Join irlmeet/i })).toBeVisible();
  });

  test("can navigate between signup steps", async ({ page }) => {
    await page.goto("/signup");

    // Step 1: fill name and email
    await page.getByPlaceholder("Your name").fill("Test User");
    await page.getByPlaceholder("you@email.com").fill("test@example.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");

    // Click Next
    await page.getByRole('button', { name: 'Next', exact: true }).click();

    // Step 2 should be visible with city and age fields
    await expect(page.locator('select').first()).toBeVisible();
    await expect(page.getByPlaceholder("25")).toBeVisible();
  });

  test("can complete full signup", async ({ page }) => {
    await page.goto("/signup");

    // Step 1
    await page.getByPlaceholder("Your name").fill("E2E Test User");
    await page.getByPlaceholder("you@email.com").fill("e2e@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 99999 99999");
    await page.getByRole("button", { name: "Next", exact: true }).click();

    // Step 2
    await page.locator("select").first().selectOption("Bangalore");
    await page.getByPlaceholder("25").fill("25");
    await page.getByRole("button", { name: /Create Account/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/Hey, E2E/)).toBeVisible();
  });

  test("Next button disabled without required fields", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  });

  test("login link navigates to login page", async ({ page }) => {
    await page.goto("/signup");
    await page.getByRole('paragraph').filter({ hasText: 'Already have an account?' }).getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
