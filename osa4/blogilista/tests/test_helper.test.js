const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/test_helper')

describe('dummy', () => {
  test('returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: 'Only blog',
        author: 'Niklas',
        url: 'https://example.com',
        likes: 5,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 5)
  })
})

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test('returns the blog with most likes', () => {
    const blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com',
        likes: 5,
      },
      {
        title: 'Second blog',
        author: 'Someone Else',
        url: 'http://example.com',
        likes: 10,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, {
      title: 'Second blog',
      author: 'Someone Else',
      url: 'http://example.com',
      likes: 10,
    })
  })
})
