import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })

      setBlogs(blogs.concat(createdBlog))

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
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
      <p>
        { user.name } logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>

      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title
            <input
            type="text"
            value={newBlogTitle}
            name="new_blog_title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        
        <div>
          author
            <input
            type="text"
            value={newBlogAuthor}
            name="new_blog_author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        
        <div>
          url
            <input
            type="text"
            value={newBlogUrl}
            name="new_blog_url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        
        <button type="submit">create</button>
      </form>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App