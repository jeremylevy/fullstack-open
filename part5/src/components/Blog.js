import React, { useState } from 'react'

const Blog = ({
  loggedUser,
  blog,
  handleBlogLike,
  handleBlogDeletion
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const preHandleBlogLike = async (event) => {
    event.preventDefault()

    await handleBlogLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const preHandleBlogDeletion = async (event) => {
    event.preventDefault()

    const deletionConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (!deletionConfirmed) {
      return
    }

    await handleBlogDeletion(blog)
  }

  const toggleExpandedView = (event) => {
    event.preventDefault()
    setIsExpanded(!isExpanded)
  }

  const collapsedView = () => (
    <div>
      <p>
        {blog.title}
        &nbsp;
        <button onClick={toggleExpandedView}>view</button>
      </p>
    </div>
  )

  const expandedView = () => (
    <div>
      <p>
        {blog.title}
        &nbsp;
        <button onClick={toggleExpandedView}>hide</button>
      </p>

      <p>{blog.url}</p>

      <p>
        likes {blog.likes}
        &nbsp;
        <button onClick={preHandleBlogLike}>like</button>
      </p>

      <p>{blog.author}</p>

      { blog.user.username === loggedUser.username
        ? <button onClick={preHandleBlogDeletion}>remove</button>
        : null }
    </div>
  )

  return (
    <div className="blog">
      { isExpanded ? expandedView() : collapsedView() }
    </div>
  )
}

export default Blog