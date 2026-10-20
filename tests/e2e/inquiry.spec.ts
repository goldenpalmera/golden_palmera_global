import { test, expect } from "@playwright/test";

test.describe("Export-buyer inquiry form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/export-buyer");

    await expect(
      page.getByRole("heading", {
        name: "Tell us what you need.",
      }).first()
    ).toBeVisible();

    await expect(
      page.getByLabel("Full name")
    ).toBeVisible();
  });

  async function fillRequiredFields(
    page: import("@playwright/test").Page
  ) {
    await page.getByLabel("Full name").fill("E2E Buyer");
    await page.getByLabel("Email").fill("buyer@example.com");
    await page.getByLabel("Product required").fill("Sesame seed");
    await page.getByLabel("Additional information").fill(
      "We require 50 metric tonnes of export-quality sesame seed."
    );
  }

  test("submits an export-buyer enquiry successfully", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your enquiry has been received.",
          reference: "GPG-2026-BUYERE2E",
          requestId: "e2e-buyer-success",
        }),
      });
    });

    await fillRequiredFields(page);
    await page.getByLabel("Phone / WhatsApp").fill("+2348012345678");
    await page.getByLabel("Quantity").fill("50 MT");
    await page.getByLabel("Destination").fill("Lagos, Nigeria");

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/inquiry") &&
        response.request().method() === "POST"
    );

    await page.getByRole("button", {
      name: /Submit buyer enquiry/,
    }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(201);

    await expect(page.getByRole("status")).toContainText(
      "Thank you for getting in touch."
    );
    await expect(page.getByRole("status")).toContainText(
      "GPG-2026-BUYERE2E"
    );
  });

  test("shows validation errors returned by the API", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Please check the form and correct the highlighted fields.",
          fields: {
            product: ["Please specify the product required."],
          },
          requestId: "e2e-buyer-validation",
        }),
      });
    });

    await fillRequiredFields(page);

    await page.getByRole("button", {
      name: /Submit buyer enquiry/,
    }).click();

    await expect(
      page.locator('div[role="alert"]').filter({
        hasText: "Please check the form and correct the highlighted fields.",
      })
    ).toBeVisible();
  });

  test("allows the buyer to retry after a failed submission", async ({ page }) => {
    let requestCount = 0;

    await page.route("**/api/inquiry", async (route) => {
      requestCount += 1;

      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Unable to process your enquiry right now.",
            requestId: "e2e-buyer-failure",
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
          reference: "GPG-2026-BUYERRETRY",
          requestId: "e2e-buyer-retry",
        }),
      });
    });

    await fillRequiredFields(page);

    const submitButton = page.getByRole("button", {
      name: /Submit buyer enquiry/,
    });

    await submitButton.click();

    await expect(
      page.locator('div[role="alert"]').filter({
        hasText: "Unable to process your enquiry right now.",
      })
    ).toBeVisible();

    await submitButton.click();

    await expect(page.getByRole("status")).toContainText(
      "GPG-2026-BUYERRETRY"
    );
    expect(requestCount).toBe(2);
  });
});
