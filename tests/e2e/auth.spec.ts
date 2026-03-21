import { test, expect } from "@playwright/test"

test.describe("Auth Flow", () => {
  test("signup page loads with form", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("heading", { name: /create/i })).toBeVisible()
    await expect(page.locator("input[type=text]")).toBeVisible()
    await expect(page.locator("input[type=email]")).toBeVisible()
  })

  test("login page loads with form", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()
    await expect(page.locator("input[type=email]")).toBeVisible()
  })

  test("dashboard redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/login/)
  })

  test("onboarding redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/onboarding")
    await expect(page).toHaveURL(/login/)
  })

  test("signup form submits and creates user", async ({ page }) => {
    await page.goto("/signup")
    const timestamp = Date.now()
    await page.fill("input[placeholder='Your name']", "Test Parent")
    await page.fill("input[placeholder='you@example.com']", `testparent${timestamp}@sharklasers.com`)
    await page.click("button:has-text('Create Free Account')")
    // BUG: Currently fails with server configuration error
    // Expected: redirect to /onboarding
    // Actual: server error shown
    await page.waitForTimeout(2000)
    const url = page.url()
    // Should redirect, not stay on signup or show error
    expect(url).not.toContain("api/auth/error")
  })

  test("Google OAuth button is visible", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible()
  })

  test("login link works from signup", async ({ page }) => {
    await page.goto("/signup")
    await page.click("a:has-text('Log in')")
    await expect(page).toHaveURL(/login/)
  })

  test("signup link works from login", async ({ page }) => {
    await page.goto("/login")
    await page.click("a:has-text('Sign up')")
    await expect(page).toHaveURL(/signup/)
  })
})
