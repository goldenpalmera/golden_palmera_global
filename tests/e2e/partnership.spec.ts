import { test, expect } from "@playwright/test";

test.describe("Partnership inquiry form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/partnership");

    await expect(
      page.getByLabel("Full name")
    ).toBeVisible();

    await expect(
      page.getByLabel("Email")
    ).toBeVisible();
  });

  test("submits a partnership enquiry successfully", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your enquiry has been received.",
          reference: "GPG-2026-PARTNER-E2E",
          requestId: "e2e-partnership-success",
        }),
      });
    });

    await page.getByLabel("Full name").fill("E2E Partnership Tester");
    await page.getByLabel("Email").fill("partner@example.com");
    await page.getByLabel("Additional information").fill(
      "We would like to discuss a potential agricultural trade partnership."
    );

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/inquiry") &&
        response.request().method() === "POST"
    );

    await page.getByRole("button", {
      name: /Submit partnership enquiry/i,
    }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(201);

    await expect(page.getByRole("status")).toContainText(
      "Thank you for getting in touch."
    );
    await expect(page.getByRole("status")).toContainText(
      "GPG-2026-PARTNER-E2E"
    );
  });

  test("shows an error when the inquiry API fails", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Unable to process your enquiry right now.",
          requestId: "e2e-partnership-failure",
        }),
      });
    });

    await page.getByLabel("Full name").fill("E2E Partnership Tester");
    await page.getByLabel("Email").fill("partner@example.com");
    await page.getByLabel("Additional information").fill(
      "We would like to discuss a potential agricultural trade partnership."
    );

    await page.getByRole("button", {
      name: /Submit partnership enquiry/i,
    }).click();

    await expect(
      page.locator('[role="alert"]').filter({
        hasText: "Unable to process your enquiry right now.",
      })
    ).toBeVisible();
  });
});