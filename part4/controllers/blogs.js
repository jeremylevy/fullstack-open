const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const createdBlogAuthor = request.user
  const createdBlog = await new Blog({
    ...request.body,
    user: createdBlogAuthor.id
  }).save()

  // We use 'updateOne' instead of 'save'
  // to bypass 'mongoose-unique-validator' bug.
  // See: https://github.com/blakehaswell/mongoose-unique-validator/issues/88
  await User.updateOne({
    _id: createdBlogAuthor.id
  }, {
    blogs: createdBlogAuthor.blogs.concat(createdBlog._id)
  })

  response.status(201).json(createdBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const updatedBlogData = request.body

  const updatedDbFieldsForBlog = {
    likes: updatedBlogData.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId, 
    updatedDbFieldsForBlog,
    { new: true }
  )

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blogToDelete = await Blog.findById(blogId)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blogToDelete.user.toString() !== request.user.id) {
    return response.status(403).json({ error: 'forbidden' })
  }

  await Blog.findByIdAndRemove(blogToDelete.id)
  
  response.status(204).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const blogToComment = await Blog.findById(blogId)

  if (!blogToComment) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const { comment } = request.body

  const updatedDbFieldsForBlog = {
    comments: blogToComment.comments.concat(comment)
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    updatedDbFieldsForBlog,
    { new: true }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter