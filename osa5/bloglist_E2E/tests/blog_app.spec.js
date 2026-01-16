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
})
