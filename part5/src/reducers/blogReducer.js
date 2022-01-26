import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'BLOGS_LOAD':
    return action.blogs
  case 'BLOG_ADD':
    return state.concat(action.blog)
  case 'BLOG_LIKE':
  case 'BLOG_COMMENT':
    return state.map(blog => blog.id !== action.blog.id ? blog : action.blog)
  case 'BLOG_REMOVE':
    return state.filter(blog => blog.id !== action.blog.id)
  default:
    return state
  }
}

export const loadBlogs = () => {
  return async (dispatch, getState) => {
    if (getState().blogs.length) {
      return
    }

    const blogs = await blogService.getAll()

    dispatch({
      type: 'BLOGS_LOAD',
      blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)

    dispatch({
      type: 'BLOG_ADD',
      blog: createdBlog
    })
  }
}

export const likeBlog = (updatedBlogData) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(updatedBlogData)

    dispatch({
      type: 'BLOG_LIKE',
      blog: updatedBlog
    })
  }
}

export const removeBlog = (blogToRemove) => {
  return async dispatch => {
    await blogService.remove(blogToRemove)

    dispatch({
      type: 'BLOG_REMOVE',
      blog: blogToRemove
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(blog, comment)

    dispatch({
      type: 'BLOG_COMMENT',
      blog: updatedBlog
    })
  }
}

export default reducer