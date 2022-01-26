import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'BLOGS_INIT':
    return action.blogs
  case 'BLOG_ADD':
    return state.concat(action.blog)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'BLOGS_INIT',
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

export default reducer