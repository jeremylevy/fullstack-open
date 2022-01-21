import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ type, message }) => (
  <div className={'notification ' + type}>
    {message}
  </div>
)

const App = () => {
  const [notification, setNotification] = useState(null)

  const [blogs, _setBlogs] = useState([])
  // We want blogs ordered by likes (most liked first)
  const setBlogs = (blogs) => {
    _setBlogs([...blogs].sort((blogA, blogB) => blogB.likes - blogA.likes))
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    const userAsJson = window.localStorage.getItem('user')

    if (userAsJson) {
      const user = JSON.parse(userAsJson)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }

    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [user])

  const displayNotification = (type, message, timeout = 5000) => {
    setNotification({
      type,
      message
    })

    setTimeout(() => setNotification(null), timeout)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)

      displayNotification('error', 'Invalid username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      displayNotification('success', `a new blog ${createdBlog.title} by ${createdBlog.author} added`)

      newBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogLike = async (updatedBlogData) => {
    try {
      const updatedBlog = await blogService.update(updatedBlogData)

      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))

      displayNotification('success', `blog ${updatedBlog.title} by ${updatedBlog.author} liked`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogDeletion = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete)

      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))

      displayNotification('success', `blog ${blogToDelete.title} by ${blogToDelete.author} deleted`)
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        { notification ? <Notification type={notification.type} message={notification.message} /> : null }

        <form className="loginForm" onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      { notification ? <Notification type={notification.type} message={notification.message} /> : null }

      <p>
        { user.name } logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
        <NewBlogForm addNewBlog={addNewBlog} />
      </Togglable>

      { blogs.map(blog => <Blog
        key={blog.id}
        loggedUser={user}
        blog={blog}
        handleBlogLike={handleBlogLike}
        handleBlogDeletion={handleBlogDeletion} />) }
    </div>
  )
}

export default App