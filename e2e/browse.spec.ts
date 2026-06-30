import { test, expect } from "@playwright/test";

// Helper: sign up and get to dashboard
async function signupAndGoToDashboard(page) {
  await page.goto("/signup");
  await page.getByPlaceholder("Your name").fill("Browse Test User");
  await page.getByPlaceholder("you@email.com").fill("browse@test.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 77777 77777");
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByPlaceholder("25").fill("26");
  await page.getByRole("button", { name: /Create Account/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

test.describe("Browse Dates Flow", () => {
  test("can browse dates from dashboard", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.getByRole("link", { name: /Browse all/i }).click();
    await expect(page).toHaveURL(/\/dates/);
    await expect(page.getByRole("heading", { name: /Browse dates/i })).toBeVisible();
  });

  test("sample dates are visible", async ({ page }) => {
    await page.goto("/dates");
    // Should see at least one of the sample dates
    await expect(page.getByText("Brunch at Bastian")).toBeVisible();
  });

  test("city filter works", async ({ page }) => {
    await page.goto("/dates");
    // Click Mumbai filter
    await page.getByRole("button", { name: "Mumbai", exact: true }).click();
    // Should see Mumbai dates
    await expect(page.getByRole('button', { name: 'Mumbai', exact: true })).toBeVisible();
  });

  test("activity filter works", async ({ page }) => {
    await page.goto("/dates");
    // Click Coffee filter
    await page.getByRole("button", { name: "Coffee", exact: true }).click();
    // Should see coffee dates
    await expect(page.getByText("Chai at Blue Tokai")).toBeVisible();
  });

  test("search works", async ({ page }) => {
    await page.goto("/dates");
    await page.getByPlaceholder(/Search dates/i).fill("Bastian");
    await expect(page.getByText("Brunch at Bastian")).toBeVisible();
  });

  test("can express interest in a date", async ({ page }) => {
    await signupAndGoToDashboard(page);
    await page.goto("/dates");
    // Find an open date and click Express Interest
    const interestButton = page.getByRole("button", { name: /Express Interest/i }).first();
    await interestButton.click();
    // Button should change to "Interested"
    await expect(page.getByRole("button", { name: /Interested/i }).first()).toBeVisible();
  });
});
