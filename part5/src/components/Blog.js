import React, { useState } from 'react'

const Blog = ({ blog, handleBlogLike }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const preHandleBlogLike = async (event) => {
    event.preventDefault()

    await handleBlogLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
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
    </div>
  )

  return (
    <div className="blog">
      { isExpanded ? expandedView() : collapsedView() }
    </div>
  )
}

export default Blog