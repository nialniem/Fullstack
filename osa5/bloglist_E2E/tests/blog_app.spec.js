const { test, expect, beforeEach, describe } = require('@playwright/test')

const BACKEND = 'http://127.0.0.1:3003' 

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BACKEND}/api/testing/reset`)

    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.locator('input[type="password"]').fill('salainen')
      await page.getByRole('button', { name: /login/i }).click()
  
      await expect(page.getByText(/logged in/i)).toBeVisible()
  
      await expect(page.getByRole('button', { name: /login/i })).not.toBeVisible()
    })
  
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.locator('input[type="password"]').fill('väärä')
      await page.getByRole('button', { name: /login/i }).click()
  
      await expect(page.getByText(/wrong|invalid/i)).toBeVisible()

      await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  
      await expect(page.getByText(/logged in/i)).not.toBeVisible()
    })
  })
  
})
