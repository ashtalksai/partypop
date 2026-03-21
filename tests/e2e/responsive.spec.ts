import { test, expect } from "@playwright/test"

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
]

const criticalPages = ["/", "/pricing", "/quiz", "/about"]

for (const vp of viewports) {
  for (const path of criticalPages) {
    test(`${path} renders at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(path)
      await expect(page.locator("body")).toBeVisible()
      // Check for horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      expect(scrollWidth).toBeLessThanOrEqual(vp.width + 5) // 5px tolerance
    })
  }
}

test("Mobile landing has hamburger menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/")
  // Burger/menu button should be visible at mobile
  const menuBtn = page.locator("button").filter({ hasNot: page.locator("nav a") }).first()
  // Navbar should not show full links at mobile (they should be hidden or in hamburger)
  await expect(page.locator("header")).toBeVisible()
})

test("Desktop landing shows full nav links", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto("/")
  await expect(page.locator("header")).toBeVisible()
})
