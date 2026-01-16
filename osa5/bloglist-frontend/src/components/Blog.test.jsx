import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let mockLikeHandler

  beforeEach(() => {
    blog = {
      title: 'Component testing with RTL',
      author: 'Ada Lovelace',
      url: 'https://example.com',
      likes: 12,
    }

    mockLikeHandler = vi.fn()
  })

  test('renders only title by default, not url or likes', () => {
    const { container } = render(<Blog blog={blog} />)

    expect(container).toHaveTextContent(blog.title)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(String(blog.likes))
  })

  test('shows url and likes when view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(String(blog.likes))
  })

  test('clicking like button calls event handler once', async () => {
    render(<Blog blog={blog} handleLike={mockLikeHandler} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))
    expect(mockLikeHandler).toHaveBeenCalledTimes(2)

  })
})
