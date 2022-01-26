import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  return blogs.map(blog => (
    <div key={blog.id} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  ))
}

export default BlogList