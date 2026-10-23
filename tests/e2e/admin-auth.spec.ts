
import { expect, test } from "@playwright/test";

test.describe("Admin authentication", () => {
  test("public homepage remains accessible", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.status()).toBeLessThan(500);
    await expect(page).not.toHaveURL(/\/admin\/login/);
  });

  test("admin login page is publicly accessible", async ({ page }) => {
    await page.goto("/admin/login");

    await expect(
      page.getByRole("heading", { name: "Admin Portal" })
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Continue with Google" })
    ).toBeVisible();
  });

  test("unauthenticated users are redirected from admin inquiries", async ({
    page,
  }) => {
    await page.goto("/admin/inquiries");

    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("unauthenticated users are redirected from admin contacts", async ({
    page,
  }) => {
    await page.goto("/admin/contacts");

    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
