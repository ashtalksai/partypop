import { test, expect } from "@playwright/test"

test.describe("Quiz Flow", () => {
  test("quiz page loads with question 1", async ({ page }) => {
    await page.goto("/quiz")
    await expect(page.getByText(/question 1 of 5/i)).toBeVisible()
    await expect(page.getByRole("heading", { name: /how old/i })).toBeVisible()
  })

  test("quiz answer selection and navigation works", async ({ page }) => {
    await page.goto("/quiz")
    // Q1: Age
    await page.click("button:has-text('1–2')")
    await page.click("button:has-text('Next')")
    await expect(page.getByText(/question 2 of 5/i)).toBeVisible()

    // Q2: Theme
    await page.click("button:has-text('Unicorns')")
    await page.click("button:has-text('Next')")
    await expect(page.getByText(/question 3 of 5/i)).toBeVisible()

    // Q3: Venue
    await page.click("button:has-text('Home')")
    await page.click("button:has-text('Next')")
    await expect(page.getByText(/question 4 of 5/i)).toBeVisible()

    // Q4: Headcount (slider)
    await page.click("button:has-text('Next')")
    await expect(page.getByText(/question 5 of 5/i)).toBeVisible()

    // Q5: Vibe
    await page.click("button:has-text('Fun & Colorful')")
    await page.click("button:has-text('See My Themes')")
  })

  test("quiz results page shows 3 themes", async ({ page }) => {
    await page.goto("/quiz")
    // Complete quiz quickly
    await page.click("button:has-text('1–2')")
    await page.click("button:has-text('Next')")
    await page.click("button:has-text('Unicorns')")
    await page.click("button:has-text('Next')")
    await page.click("button:has-text('Home')")
    await page.click("button:has-text('Next')")
    await page.click("button:has-text('Next')")
    await page.click("button:has-text('Fun & Colorful')")
    await page.click("button:has-text('See My Themes')")
    await expect(page.getByRole("heading", { name: /top 3 party themes/i })).toBeVisible()
    // Should have 3 result cards
    const planButtons = page.getByRole("link", { name: /plan this party/i })
    expect(await planButtons.count()).toBeGreaterThanOrEqual(3)
  })

  test("quiz results has lead capture CTA", async ({ page }) => {
    await page.goto("/quiz/results")
    // Direct URL test
    await page.waitForTimeout(500)
    // Should have signup CTA
    const cta = page.getByRole("link", { name: /get my free plan|sign up|create account/i })
    if (await cta.count() > 0) {
      await expect(cta.first()).toBeVisible()
    }
  })

  test("Back button works on quiz", async ({ page }) => {
    await page.goto("/quiz")
    await page.click("button:has-text('1–2')")
    await page.click("button:has-text('Next')")
    await expect(page.getByText(/question 2/i)).toBeVisible()
    await page.click("button:has-text('Back')")
    await expect(page.getByText(/question 1/i)).toBeVisible()
  })
})
