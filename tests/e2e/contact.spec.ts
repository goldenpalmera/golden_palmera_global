import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toBeVisible();
  });

  test("submits a contact enquiry successfully", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your enquiry has been received.",
          reference: "GPG-2026-E2ETEST",
          requestId: "e2e-contact-success",
        }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill("E2E Test User");
    await page.getByLabel("Email", { exact: true }).fill("e2e@example.com");
    await page.getByLabel("Phone", { exact: true }).fill("+2348012345678");
    await page.getByLabel("Message", { exact: true }).fill(
      "This is a browser test enquiry."
    );

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/contact") &&
        response.request().method() === "POST"
    );

    await page.getByRole("button", { name: /send enquiry/i }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(201);

    await expect(
      page.getByRole("heading", {
        name: "Your enquiry has been received.",
      })
    ).toBeVisible();

    await expect(page.getByText("GPG-2026-E2ETEST")).toBeVisible();
  });

  test("shows validation errors returned by the API", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Please check the form and correct the highlighted fields.",
          fields: {
            email: ["Please enter a valid email address."],
          },
          requestId: "e2e-contact-validation",
        }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill("E2E Test User");
    await page.getByLabel("Email", { exact: true }).fill("e2e@example.com");
    await page.getByLabel("Phone", { exact: true }).fill("+2348012345678");
    await page.getByLabel("Message", { exact: true }).fill(
      "This is a browser test enquiry."
    );

    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(
      page.locator('div[role="alert"]').filter({
        hasText: "Please check the form and correct the highlighted fields."
      })
    ).toBeVisible();
  });

  test("allows the user to retry after a failed submission", async ({ page }) => {
    let requestCount = 0;

    await page.route("**/api/contact", async (route) => {
      requestCount += 1;

      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Unable to process your enquiry right now.",
            requestId: "e2e-contact-retry",
          }),
        });
        return;
      }

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your enquiry has been received.",
          reference: "GPG-2026-RETRY",
          requestId: "e2e-contact-retry-success",
        }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill("E2E Test User");
    await page.getByLabel("Email", { exact: true }).fill("e2e@example.com");
    await page.getByLabel("Phone", { exact: true }).fill("+2348012345678");
    await page.getByLabel("Message", { exact: true }).fill(
      "This is a browser test enquiry."
    );

    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(
      page.locator('div[role="alert"]').filter({
        hasText: "Unable to process your enquiry right now."
      })
    ).toBeVisible();

    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(
      page.getByRole("heading", {
        name: "Your enquiry has been received.",
      })
    ).toBeVisible();

    expect(requestCount).toBe(2);
  });
});
