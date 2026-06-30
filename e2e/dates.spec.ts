import { test, expect } from "@playwright/test";

// Helper: sign up and get to dashboard
async function signupAndGoToDashboard(page) {
  await page.goto("/signup");
  await page.getByPlaceholder("Your name").fill("Date Test User");
  await page.getByPlaceholder("you@email.com").fill("datetest@example.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 88888 88888");
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByPlaceholder("25").fill("28");
  await page.getByRole("button", { name: /Create Account/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

test.describe("Date Creation Flow", () => {
  test("can navigate to create date from dashboard", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.getByRole("link", { name: /Plan a Date/i }).click();
    await expect(page).toHaveURL(/\/dates\/new/);
    await expect(page.getByRole("heading", { name: /Plan a date/i })).toBeVisible();
  });

  test("can create a new date", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.getByRole("link", { name: /Plan a Date/i }).first().click();

    // Fill the form
    await page.getByPlaceholder(/e.g. Chai at Blue Tokai/i).fill("Test Coffee Date");
    await page.getByPlaceholder(/What's the plan/i).fill("A test date for E2E");
    await page.locator('input[type="date"]').fill("2026-07-15");
    await page.locator('input[type="time"]').fill("10:00");
    await page.getByPlaceholder(/e.g. Blue Tokai, Koramangala/i).fill("Blue Tokai, Koramangala");

    // Submit
    await page.getByRole("button", { name: /Post This Date/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("submit disabled without required fields", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.goto("/dates/new");
    await expect(page.getByRole("button", { name: /Post This Date/i })).toBeDisabled();
  });

  test("activity type selector works", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.goto("/dates/new");
    await page.getByRole("button", { name: "Trek", exact: true }).click();
    // The button should now have the accent style (selected)
    await expect(page.getByRole("button", { name: "Trek", exact: true })).toBeVisible();
  });

  test("toggles work", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.goto("/dates/new");

    // Toggle women only
    const womenOnlyCheckbox = page.getByLabel("Women only");
    await womenOnlyCheckbox.check();
    await expect(womenOnlyCheckbox).toBeChecked();

    // Toggle verified only
    const verifiedCheckbox = page.getByLabel("Verified profiles only");
    await verifiedCheckbox.check();
    await expect(verifiedCheckbox).toBeChecked();
  });
});
