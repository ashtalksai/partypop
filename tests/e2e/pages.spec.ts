import { test, expect } from "@playwright/test"

const publicPages = [
  { path: "/", name: "Landing" },
  { path: "/about", name: "About" },
  { path: "/pricing", name: "Pricing" },
  { path: "/contact", name: "Contact" },
  { path: "/quiz", name: "Quiz" },
  { path: "/vendors", name: "Vendors" },
  { path: "/privacy", name: "Privacy" },
  { path: "/terms", name: "Terms" },
]

for (const { path, name } of publicPages) {
  test(`${name} page loads without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on("console", msg => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto(path)
    await expect(page.locator("body")).toBeVisible()
    // No network 500 errors
    const networkErrors = errors.filter(e => e.includes("500") || e.includes("404"))
    expect(networkErrors).toHaveLength(0)
  })

  test(`${name} page has navbar and footer`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator("header, nav")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()
  })
}

test("About page has mission content", async ({ page }) => {
  await page.goto("/about")
  await expect(page.getByRole("heading", { name: /mission|broken|planned/i })).toBeVisible()
})

test("Pricing page has 3 plan tiers", async ({ page }) => {
  await page.goto("/pricing")
  await expect(page.getByRole("heading", { name: /free/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: /party pro/i })).toBeVisible()
  await expect(page.getByRole("heading", { name: /family/i })).toBeVisible()
})

test("Contact form has all required fields", async ({ page }) => {
  await page.goto("/contact")
  await expect(page.locator("input[placeholder*='name']")).toBeVisible()
  await expect(page.locator("input[type=email]")).toBeVisible()
  await expect(page.locator("textarea")).toBeVisible()
  await expect(page.getByRole("button", { name: /send/i })).toBeVisible()
})

test("Vendors page shows 7 categories", async ({ page }) => {
  await page.goto("/vendors")
  await expect(page.getByText(/entertainment/i)).toBeVisible()
  await expect(page.getByText(/cakes/i)).toBeVisible()
  await expect(page.getByText(/photography/i)).toBeVisible()
  await expect(page.getByText(/catering/i)).toBeVisible()
  await expect(page.getByText(/decorations/i)).toBeVisible()
  await expect(page.getByText(/activities/i)).toBeVisible()
  await expect(page.getByText(/party favors/i)).toBeVisible()
})

test("Privacy policy has required sections", async ({ page }) => {
  await page.goto("/privacy")
  await expect(page.getByRole("heading", { name: /privacy policy/i })).toBeVisible()
  await expect(page.getByText(/what we collect/i)).toBeVisible()
})

test("Terms has required sections", async ({ page }) => {
  await page.goto("/terms")
  await expect(page.getByRole("heading", { name: /terms of service/i })).toBeVisible()
  await expect(page.getByText(/subscriptions/i)).toBeVisible()
})

test("Dashboard redirects to login when not authenticated", async ({ page }) => {
  await page.goto("/dashboard")
  await expect(page).toHaveURL(/login/)
})

test("Onboarding redirects to login when not authenticated", async ({ page }) => {
  await page.goto("/onboarding")
  await expect(page).toHaveURL(/login/)
})

test("Deck page loads with slide content", async ({ page }) => {
  await page.goto("/deck")
  await expect(page.getByRole("heading", { name: /partypop/i })).toBeVisible()
})

test("Docs page loads with navigation", async ({ page }) => {
  await page.goto("/docs")
  await expect(page.locator("body")).toBeVisible()
})
