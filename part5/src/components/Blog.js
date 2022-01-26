import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { commentBlog, loadBlogs } from '../reducers/blogReducer'

const Blog = ({ handleBlogLike }) => {
  const dispatch = useDispatch()

  const blogId = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  const preHandleBlogLike = async (event) => {
    event.preventDefault()

    await handleBlogLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    dispatch(commentBlog(blog, comment))

    event.target.comment.value = ''
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <p><a href={blog.info}>{blog.info}</a></p>

      {blog.likes} likes <button onClick={preHandleBlogLike}>like</button>

      <p>added by {blog.author}</p>

      <h3>comments</h3>

      <form onSubmit={handleNewCommentSubmit}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>

      <ul>
        { blog.comments.map((comment, i) => <li key={i}>{comment}</li>) }
      </ul>
    </div>
  )
}

export default Blog