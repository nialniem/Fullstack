const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const saved = await blog.save()
  res.status(201).json(saved)
})

blogsRouter.delete('/:id', async (req, res) => {
  const deleted = await Blog.findByIdAndDelete(req.params.id)

  if (!deleted) {
    return res.status(404).end()
  }

  return res.status(204).end()
})
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (!updatedBlog) return res.status(404).end()
  res.json(updatedBlog)
})

module.exports = blogsRouter
