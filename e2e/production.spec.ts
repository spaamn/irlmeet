import { test, expect } from "@playwright/test";

/**
 * Production functionality tests.
 * These test real user flows against the deployed app.
 * Run with: TEST_URL=https://irlmeet.vercel.app npx playwright test
 * Or locally: npx playwright test (starts dev server automatically)
 */

test.describe("End-to-End User Flows", () => {
  test("complete journey: landing → signup → browse → express interest → withdraw", async ({
    page,
  }) => {
    // 1. Landing page loads with key elements
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan a date");

    // 2. Navigate to signup
    await page.getByRole("link", { name: /Get Started/i }).click();
    await expect(page).toHaveURL(/\/signup/);

    // 3. Complete signup flow
    await page.getByPlaceholder("Your name").fill("Production Test User");
    await page.getByPlaceholder("you@email.com").fill("production@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 99999 99999");
    await page.getByRole("button", { name: "Next", exact: true }).click();

    // Step 2
    await page.locator("select").first().selectOption("Mumbai");
    await page.getByPlaceholder("25").fill("25");
    await page.getByRole("button", { name: /Create Account/i }).click();

    // 4. Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/Hey, Production/)).toBeVisible();

    // 5. Browse dates
    await page.goto("/dates");
    await expect(page.getByRole("heading", { name: /Browse dates/i })).toBeVisible();

    // 6. Verify date cards have images and details
    const firstCard = page.locator('a[href^="/dates/sample"]').first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard.locator("img")).toBeVisible();

    // 7. Click into detail page
    await firstCard.click();
    await expect(page).toHaveURL(/\/dates\/sample-/);

    // 8. Verify detail page has all key sections
    await expect(page.getByText("The Plan")).toBeVisible();
    await expect(page.getByText("Details")).toBeVisible();

    // 9. Express interest
    await page.getByRole("button", { name: /Express Interest/i }).click();
    await expect(page.getByRole("button", { name: /Withdraw interest/i })).toBeVisible();

    // 10. Withdraw interest (reversible action)
    await page.getByRole("button", { name: /Withdraw interest/i }).click();
    await expect(page.getByRole("button", { name: /Express Interest/i })).toBeVisible();
  });

  test("browse filters work correctly", async ({ page }) => {
    await page.goto("/dates");

    // Verify time filters exist
    await expect(page.getByRole("button", { name: "Today" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tomorrow" })).toBeVisible();
    await expect(page.getByRole("button", { name: "This weekend" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next 7 days" })).toBeVisible();

    // Verify city filters
    await expect(page.getByRole("button", { name: "Mumbai" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delhi" })).toBeVisible();

    // Verify activity filters
    await expect(page.getByRole("button", { name: "Coffee" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Trek" })).toBeVisible();

    // Apply a filter and verify results update
    await page.getByRole("button", { name: "Mumbai", exact: true }).click();
    await expect(page.getByText(/dates found/)).toBeVisible();
  });

  test("create date flow works end-to-end", async ({ page }) => {
    // Sign up first
    await page.goto("/signup");
    await page.getByPlaceholder("Your name").fill("Host Test User");
    await page.getByPlaceholder("you@email.com").fill("host@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 88888 88888");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.getByPlaceholder("25").fill("28");
    await page.getByRole("button", { name: /Create Account/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Navigate to create date
    await page.goto("/dates/new");
    await expect(page.getByRole("heading", { name: /Plan a date/i })).toBeVisible();

    // Fill the form
    await page.getByPlaceholder(/e.g. Chai at Blue Tokai/i).fill("Test Coffee Meetup");
    await page.getByPlaceholder(/What's the plan/i).fill("A test date for production verification");
    await page.locator('input[type="date"]').fill("2026-07-20");
    await page.locator('input[type="time"]').fill("11:00");
    await page.getByPlaceholder(/e.g. Blue Tokai, Koramangala/i).fill("Blue Tokai, Koramangala");

    // Submit
    await page.getByRole("button", { name: /Post This Date/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("profile shows my dates and interests", async ({ page }) => {
    // Sign up
    await page.goto("/signup");
    await page.getByPlaceholder("Your name").fill("Profile Test User");
    await page.getByPlaceholder("you@email.com").fill("profile@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 77777 77777");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.getByPlaceholder("25").fill("24");
    await page.getByRole("button", { name: /Create Account/i }).click();

    // Go to profile
    await page.goto("/profile");
    await expect(page.getByText("Profile Test User")).toBeVisible();

    // Verify sections exist
    await expect(page.getByText(/Dates you planned/)).toBeVisible();
    await expect(page.getByText(/Dates you're interested in/)).toBeVisible();
  });

  test("safety page is accessible and has key content", async ({ page }) => {
    await page.goto("/safety");

    await expect(page.getByText("Your Safety Matters")).toBeVisible();
    await expect(page.getByText("Emergency Assistance")).toBeVisible();
    await expect(page.getByText("Verified Profiles")).toBeVisible();
    await expect(page.getByText("Public Places Only")).toBeVisible();
  });

  test("login flow works", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("Your name").fill("Login Test User");
    await page.getByPlaceholder("you@email.com").fill("login@test.com");
    await page.getByRole("button", { name: /Log in/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/Hey, Login/)).toBeVisible();
  });

  test("dark mode toggle persists", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");

    // Toggle dark mode
    const toggle = page.getByRole("button", { name: /switch to/i });
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    // Toggle back
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });
});
