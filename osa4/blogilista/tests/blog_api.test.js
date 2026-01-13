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
after(async () => {
  await mongoose.connection.close()
})