import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const showDelete =
    blog.user &&
    loggedUser &&
    blog.user.username === loggedUser.username

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>

          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>

          <div>added by {blog.user?.name}</div>

          {showDelete && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
