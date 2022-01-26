import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { addBlog, initBlogs, likeBlog, removeBlog } from './reducers/blogReducer'

import { addNotification, removeNotification } from './reducers/notificationReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ type, message }) => (
  <div className={'notification ' + type}>
    {message}
  </div>
)

const App = () => {
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const newBlogFormRef = useRef()

  useEffect(() => {
    const userAsJson = window.localStorage.getItem('user')

    if (userAsJson) {
      const user = JSON.parse(userAsJson)

      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!loggedUser) {
      return
    }

    dispatch(initBlogs())
  }, [loggedUser])

  const displayNotification = (type, message, hideAfterMs = 5000) => {
    dispatch(addNotification(
      type,
      message,
      hideAfterMs
    ))

    setTimeout(() => dispatch(removeNotification()), hideAfterMs)
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
      dispatch(setLoggedUser(user))

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
    setLoggedUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      dispatch(addBlog(newBlog))
      displayNotification('success', `a new blog ${newBlog.title} by ${newBlog.author} added`)

      newBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogLike = async (updatedBlogData) => {
    try {
      dispatch(likeBlog(updatedBlogData))
      displayNotification('success', `blog ${updatedBlogData.title} by ${updatedBlogData.author} liked`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogRemove = async (blogToRemove) => {
    try {
      dispatch(removeBlog(blogToRemove))
      displayNotification('success', `blog ${blogToRemove.title} by ${blogToRemove.author} deleted`)
    } catch (exception) {
      console.log(exception)
    }
  }

  if (loggedUser === null) {
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
        { loggedUser.name } logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>

      <Router>
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>

          <Route path="/">
            <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
              <NewBlogForm addNewBlog={addNewBlog} />
            </Togglable>

            { blogs.map(blog => <Blog
              key={blog.id}
              loggedUser={loggedUser}
              blog={blog}
              handleBlogLike={handleBlogLike}
              handleBlogRemove={handleBlogRemove} />) }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App