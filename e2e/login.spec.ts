import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  });

  test("can log in and reach dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Your name").fill("Login Test User");
    await page.getByPlaceholder("you@email.com").fill("login@test.com");
    await page.getByRole("button", { name: /Log in/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/Hey, Login/)).toBeVisible();
  });

  test("login button disabled without fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /Log in/i })).toBeDisabled();
  });

  test("signup link navigates to signup page", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /Create an account/i }).click();
    await expect(page).toHaveURL(/\/signup/);
  });
});
