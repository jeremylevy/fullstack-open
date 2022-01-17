const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let initialUsersInDb = []

beforeEach(async () => {
  await User.deleteMany({})
  initialUsersInDb = await User.insertMany(helper.initialUsers)

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogsFor(initialUsersInDb[0]))
})

describe('GET /api/blogs', () => {
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
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 18
    }
    const user = initialUsersInDb[0]
  
    const response = await api.post('/api/blogs')
      .set('Authorization', helper.authorizationHeaderFor(user))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const createdBlog = response.body
    expect(createdBlog).toMatchObject({
      ...newBlog,
      user: user.id
    })
  
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsInDb).toContainEqual(createdBlog)
  })
  
  test('a blog with missing likes can be added and get \'0\' as default value', async () => {
    const newBlog = {
      title: "title",
      author: "author",
      url: "url",
    }
    const user = initialUsersInDb[0]
    const expectedCreatedBlog = {
      ...newBlog,
      likes: 0,
      user: user.id
    }
  
    const response = await api.post('/api/blogs')
      .set('Authorization', helper.authorizationHeaderFor(user))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const createdBlog = response.body
    expect(createdBlog).toMatchObject(expectedCreatedBlog)
  
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsInDb).toContainEqual(createdBlog)
  })
  
  test('a blog with missing \'title\' and \'url\' cannot be added', async () => {
    const newBlog = {
      author: "author",
      likes: 18
    }
    const user = initialUsersInDb[0]
  
    const response = await api.post('/api/blogs')
      .set('Authorization', helper.authorizationHeaderFor(user))
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const returnedError = response.body.error
    expect(returnedError).toMatch(new RegExp('Path `url` is required'))
    expect(returnedError).toMatch(new RegExp('Path `title` is required'))
  
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('an existing blog can be updated', async () => {
    const blogsInDbBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsInDbBeforeUpdate[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toEqual(JSON.parse(JSON.stringify(updatedBlog)))

    const blogsInDbAfterUpdate = await helper.blogsInDb()
    expect(blogsInDbAfterUpdate).toContainEqual(updatedBlog)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('delete existing blog', async () => {
    const blogsInDbBeforeDeletion = await helper.blogsInDbWithUserPopulated()
    const blogToDelete = blogsInDbBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', helper.authorizationHeaderFor(blogToDelete.user))
      .expect(204)

    const blogsInDbAfterDeletion = await helper.blogsInDb()
    expect(blogsInDbAfterDeletion).toHaveLength(blogsInDbBeforeDeletion.length - 1)
    expect(blogsInDbAfterDeletion).not.toContainEqual(blogToDelete)
  })
})

afterAll(() => {
  mongoose.connection.close()
})