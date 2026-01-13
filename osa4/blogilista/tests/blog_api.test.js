const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Blog = require('../models/blog')


const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id field instead of _id', async () => {
    const response = await api.get('/api/blogs')
  
    response.body.forEach(blog => {
      assert.ok(blog.id)
      assert.equal(blog._id, undefined)
    })
  })
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Tester',
      url: 'http://example.com',
      likes: 10
    }
  
    const blogsAtStart = await Blog.find({})
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201) 
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Test blog'))
  })
  test('if likes is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'No Likes Author',
      url: 'http://example.com/nolikes',
      
    }
  
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(res.body.likes, 0)
  })

  test('POST /api/blogs fails with 400 if title is missing', async () => {
    const newBlog = {
      author: 'No title',
      url: 'http://example.com',
      likes: 5,
    }
  
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  
  test('POST /api/blogs fails with 400 if url is missing', async () => {
    const newBlog = {
      title: 'No url',
      author: 'No url author',
      likes: 5,
    }
  
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('DELETE /api/blogs/:id succeeds with 204 and removes the blog', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]
  
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
  test('PUT /api/blogs/:id updates likes', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
  
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }
  
    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(res.body.likes, blogToUpdate.likes + 1)
  })
  
  
after(async () => {
  await mongoose.connection.close()
})