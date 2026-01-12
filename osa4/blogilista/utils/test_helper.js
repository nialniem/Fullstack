const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostBlogs = _.maxBy(
    Object.keys(groupedByAuthor),
    author => groupedByAuthor[author].length
  )

  return {
    author: authorWithMostBlogs,
    blogs: groupedByAuthor[authorWithMostBlogs].length,
  }
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostLikes = _.maxBy(
    Object.keys(blogsByAuthor),
    author => _.sumBy(blogsByAuthor[author], 'likes')
  )

  return {
    author: authorWithMostLikes,
    likes: _.sumBy(blogsByAuthor[authorWithMostLikes], 'likes'),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
