const { test, expect, beforeEach, describe } = require('@playwright/test')

const BACKEND = 'http://127.0.0.1:3003'

const loginByApi = async (request, username, password) => {
  const res = await request.post(`${BACKEND}/api/login`, {
    data: { username, password },
  })
  if (!res.ok()) {
    const body = await res.text()
    throw new Error(`API login failed for ${username}: ${res.status()} ${body}`)
  }
  return await res.json()
}

const setUserToLocalStorage = async (page, user) => {
  await page.evaluate((u) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(u))
  }, user)
}

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
    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'User Two',
        username: 'user2',
        password: 'password2',
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

    test('blog can be deleted', async ({ page }) => {
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

    test('only the creator sees the delete button', async ({ page, request }) => {
      await page.getByRole('button', { name: /create new blog/i }).click()
      await page.locator('#title').fill('Only creator can remove')
      await page.locator('#author').fill('Tester')
      await page.locator('#url').fill('https://example.com')
      await page.getByRole('button', { name: /^create$/i }).click()

      const blog = page.locator('.blog').filter({ hasText: 'Only creator can remove' })
      await expect(blog).toBeVisible()

      await blog.getByRole('button', { name: /view/i }).click()
      await expect(blog.getByRole('button', { name: /delete/i })).toBeVisible()

      const user2 = await loginByApi(request, 'user2', 'password2')
      await setUserToLocalStorage(page, user2)
      await page.reload()

      await expect(page.getByText(/logged in/i)).toBeVisible()
      await expect(page.locator('.blog').first()).toBeVisible()

      await expect(page.getByRole('button', { name: /delete/i })).toHaveCount(0)
    })

    test('blogs should be organized from most likes to least likes', async ({ page }) => {
      await expect(page.getByText(/logged in/i)).toBeVisible()

      const createBlog = async (title) => {
        const titleInput = page.locator('#title')
      
        // jos blogiformi ei ole näkyvissä, avaa se
        if (!(await titleInput.isVisible())) {
          const openFormBtn = page.getByRole('button', {
            name: /create new blog|new blog|add blog|create blog|new|add|create/i,
          })
          await expect(openFormBtn).toBeVisible()
          await openFormBtn.click()
        }
      
        await expect(titleInput).toBeVisible()
      
        await titleInput.fill(title)
        await page.locator('#author').fill('Tester')
        await page.locator('#url').fill('https://example.com')
        await page.getByRole('button', { name: /^create$/i }).click()
      
        await expect(page.locator('.blog').filter({ hasText: title })).toBeVisible()
      }
      
    
      await createBlog('blog-1')
      await createBlog('blog-2')
      await createBlog('blog-3')
    
      const blog1 = page.locator('.blog').filter({ hasText: 'blog-1' })
      const blog2 = page.locator('.blog').filter({ hasText: 'blog-2' })
      const blog3 = page.locator('.blog').filter({ hasText: 'blog-3' })
    
      await blog1.getByRole('button', { name: /view/i }).click()
      await blog2.getByRole('button', { name: /view/i }).click()
      await blog3.getByRole('button', { name: /view/i }).click()
    
      await blog3.getByRole('button', { name: /like/i }).click()
      await expect(blog3.getByText(/likes\s*1/i)).toBeVisible()
    
      await blog3.getByRole('button', { name: /like/i }).click()
      await expect(blog3.getByText(/likes\s*2/i)).toBeVisible()
    
      await blog2.getByRole('button', { name: /like/i }).click()
      await expect(blog2.getByText(/likes\s*1/i)).toBeVisible()
    
      const ourBlogs = page.locator('.blog').filter({ hasText: /blog-(1|2|3)/ })

      await expect(ourBlogs).toHaveCount(3)

      await expect(ourBlogs.nth(0)).toContainText('blog-3')
      await expect(ourBlogs.nth(1)).toContainText('blog-2')
      await expect(ourBlogs.nth(2)).toContainText('blog-1')

    })
    
  })
})
