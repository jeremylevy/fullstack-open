const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blogs have an \'id\' property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs.length).toBeGreaterThan(0)

  for (let blog of blogs) {
    expect(blog.id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 18
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdBlog = response.body
  expect(createdBlog).toMatchObject(newBlog)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsInDb).toContainEqual(createdBlog)
})

afterAll(() => {
  mongoose.connection.close()
})