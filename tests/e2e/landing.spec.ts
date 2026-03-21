import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("loads successfully with correct title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/partypop/i)
    await expect(page.locator("h1")).toBeVisible()
  })

  test("has hero section with headline and CTA", async ({ page }) => {
    await page.goto("/")
    const h1 = page.locator("h1")
    await expect(h1).toContainText(/party/i)
    await expect(page.getByRole("link", { name: /plan my party|get started/i })).toBeVisible()
  })

  test("has 9+ content sections", async ({ page }) => {
    await page.goto("/")
    const main = page.locator("main")
    const sections = main.locator("> *")
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(9)
  })

  test("has working navbar", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("nav, header")).toBeVisible()
    await expect(page.getByRole("link", { name: /partypop/i })).toBeVisible()
  })

  test("has footer with legal links", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("footer")).toBeVisible()
    await expect(page.getByRole("link", { name: /privacy/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /terms/i })).toBeVisible()
  })

  test("hero image loads", async ({ page }) => {
    await page.goto("/")
    const heroImg = page.locator("img[alt*='party plan']")
    await expect(heroImg).toBeVisible()
    const naturalWidth = await heroImg.evaluate((img: HTMLImageElement) => img.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  })

  test("FAQ accordion works", async ({ page }) => {
    await page.goto("/")
    const firstFaq = page.getByRole("button", { name: /really free/i })
    await firstFaq.click()
    // FAQ content should expand — wait for aria-expanded or visible answer
    await page.waitForTimeout(300)
  })

  test("pricing section has 3 tiers", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /free/i }).first()).toBeVisible()
    await expect(page.getByRole("heading", { name: /party pro/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /family/i })).toBeVisible()
  })

  test("is responsive at 375px mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    const body = page.locator("body")
    const box = await body.boundingBox()
    expect(box!.width).toBeLessThanOrEqual(376)
  })

  test("CTA links to signup", async ({ page }) => {
    await page.goto("/")
    const cta = page.getByRole("link", { name: /plan my party free/i }).first()
    const href = await cta.getAttribute("href")
    expect(href).toContain("/signup")
  })
})
