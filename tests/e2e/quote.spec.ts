import { test, expect } from "@playwright/test";

test.describe("Request Quote form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quote/request-quote?product=sesame-seed");

    await expect(page.getByLabel("Full Name")).toBeVisible();
    await expect(page.getByLabel("Email Address")).toBeVisible();
    await expect(page.getByRole("button", {
      name: "Submit Enquiry",
    })).toBeVisible();
  });

  async function fillRequiredFields(
    page: import("@playwright/test").Page
  ) {
    await page.getByLabel("Full Name").fill("E2E Quote Tester");
    await page.getByLabel("Email Address").fill("quote@example.com");
    await page.getByLabel("Phone / WhatsApp").fill("+2348012345678");
    await page.getByRole("textbox", {
      name: "Country",
      exact: true,
    }).fill("Nigeria");
    await page.getByLabel("Quantity Required").fill("50 MT");
    await page.getByLabel("Destination Port / Country").fill(
      "Rotterdam, Netherlands"
    );
    await page.getByLabel("Additional Requirements").fill(
      "Please provide pricing and delivery details for export-quality sesame seed."
    );
  }

  test("preselects the product from the URL", async ({ page }) => {
    await expect(
      page.getByRole("textbox", { name: "Product", exact: true })
    ).toHaveValue("Sesame Seed");
  });

  test("submits a quote request successfully", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      const request = route.request();
      const payload = request.postDataJSON();

      expect(payload.type).toBe("product");
      expect(payload.product).toBe("Sesame Seed");
      expect(payload.quantity).toBe("50 MT");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Your enquiry has been received.",
          reference: "GPG-2026-QUOTE-E2E",
          requestId: "e2e-quote-success",
        }),
      });
    });

    await fillRequiredFields(page);

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/inquiry") &&
        response.request().method() === "POST"
    );

    await page.getByRole("button", {
      name: "Submit Enquiry",
    }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(201);

    await expect(page.getByRole("status")).toContainText(
      "Enquiry Received"
    );
    await expect(page.getByRole("status")).toContainText(
      "GPG-2026-QUOTE-E2E"
    );
  });

  test("displays an error when the inquiry API fails", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Unable to process your enquiry right now.",
          requestId: "e2e-quote-failure",
        }),
      });
    });

    await fillRequiredFields(page);

    await page.getByRole("button", {
      name: "Submit Enquiry",
    }).click();

    await expect(
      page.getByRole("alert").filter({
        hasText: "Unable to process your enquiry right now.",
      })
    ).toBeVisible();
  });
});