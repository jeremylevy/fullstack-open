import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'

import { addBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { addNotification, removeNotification } from './reducers/notificationReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Nav from './components/Nav'

const Notification = ({ type, message }) => (
  <Alert variant={type}>
    {message}
  </Alert>
)

const App = () => {
  const notification = useSelector(state => state.notification)
  // const blogs = useSelector(state => state.blogs)
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
    dispatch(setLoggedUser(null))
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
      <div className="container">
        <h2>Log in to application</h2>

        { notification ? <Notification type={notification.type} message={notification.message} /> : null }

        <Form className="loginForm" onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>blogs</h2>

      { notification ? <Notification type={notification.type} message={notification.message} /> : null }

      <Nav
        loggedUser={loggedUser}
        handleLogout={handleLogout} />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>

        <Route path="/users">
          <UserList />
        </Route>

        <Route path="/blogs/:id">
          <Blog
            loggedUser={loggedUser}
            handleBlogLike={handleBlogLike}
            handleBlogRemove={handleBlogRemove}
          />
        </Route>

        <Route path="/">
          <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
            <NewBlogForm addNewBlog={addNewBlog} />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App