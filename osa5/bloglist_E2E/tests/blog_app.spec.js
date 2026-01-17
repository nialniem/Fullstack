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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.locator('input[type="password"]').fill('salainen')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText(/logged in/i)).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: /create new blog/i }).click()

        await page.locator('#title').fill('Uusblogi')
        await page.locator('#author').fill('Tester')
        await page.locator('#url').fill('https://example.com')

        await page.getByRole('button', { name: /^create$/i }).click()

        const blog = page.locator('.blog').filter({ hasText: 'Uusblogi' })
        await expect(blog).toBeVisible()
        await expect(blog).toHaveText(/Uusblogi.*Tester/)


    })
    test('a blog can be liked', async ({ page }) => {

        await page.getByRole('button', { name: /create new blog/i }).click()
        await page.locator('#title').fill('Likettava blogi')
        await page.locator('#author').fill('Tester')
        await page.locator('#url').fill('https://example.com')
        await page.getByRole('button', { name: /^create$/i }).click()
      
        const blog = page.locator('.blog').filter({ hasText: 'Likettava blogi' })
        await expect(blog).toBeVisible()
        await blog.getByRole('button', { name: /view/i }).click()
      
        const likesLine = blog.getByText(/likes/i)
        await expect(likesLine).toBeVisible()
        
        await blog.getByRole('button', { name: /like/i }).click()
    
        await expect(blog.getByText(/likes\s*\d+/i)).toBeVisible()
        await expect(blog.getByText(/likes\s*1/i)).toBeVisible()
      })
      test('blog can be deleted', async({ page }) => {
        await page.getByRole('button', { name: /create new blog/i }).click()
        await page.locator('#title').fill('Poistettava blogi')
        await page.locator('#author').fill('Tester')
        await page.locator('#url').fill('https://example.com')
        await page.getByRole('button', { name: /^create$/i }).click()

        const blog = page.locator('.blog').filter({ hasText: 'Poistettava blogi' })
        await expect(blog).toBeVisible()
        await blog.getByRole('button', { name: /view/i }).click()

        page.once('dialog', async (dialog) => {
            await dialog.accept()
        })
        await blog.getByRole('button', { name: /delete/i }).click()

        await expect(page.locator('.blog').filter({ hasText: 'Poistettava blogi' })).toHaveCount(0)
  })
  })
  

  
  
})
