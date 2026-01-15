import { useState, useEffect,useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const STORAGE_KEY = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(b => setBlogs(b)).catch(() => {
        setBlogs([])
      })
    } else {
      setBlogs([])
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
      showNotification(`welcome ${loggedInUser.name}`, 'success')
    } catch {
      showNotification('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    showNotification('logged out', 'success')
  }

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
  
    setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
  }
  
  const createBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author) {
      showNotification('title and author are required', 'error')
      return
    }

    const newBlog = {
      ...blogObject,
      id: String(Date.now()),
      likes: 0,
      user: { name: user.name, username: user.username },
    }
    

    setBlogs(prev => [newBlog, ...prev])
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
  }


  if (!user) {
    return (
      <div>
        <Notification message={notification} />

        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password{' '}
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <Notification message={notification} />

      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
      </Togglable>


      {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} handleLike={handleLike} />
    ))}

    </div>
  )
}

export default App
