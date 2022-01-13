const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = await new Blog(request.body).save()
    response.status(201).json(blog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    return next(error)
  }
})

module.exports = blogsRouter