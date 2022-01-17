const jwt = require('jsonwebtoken')

const blog = require('../models/blog')
const user = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

const initialBlogsFor = user => initialBlogs.map(blog => ({ ...blog, user: user.id }))

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogsInDbWithUserPopulated = async () => {
  const blogs = await blog.find({}).populate('user')
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [{
  "username": "root",
  "passwordHash": "$2y$10$rUkh.0ulie2cFJl6s/zECO7DaSzOdx7N1ioOcMz6KeDcDEBcseTGu",
  "name": "root_name"
}, {
  "username": "root2",
  "passwordHash": "$2y$10$tCemKLEQhZy73EdAqbpkSeiFH7xieE5e7tvnl77wBHYggXZZnZ8TW",
  "name": "root2_name"
}]

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(user => user.toJSON())
}

const authorizationHeaderFor = user => {
  const userForToken = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return `Bearer ${token}`
}

module.exports = {
  initialBlogs,
  initialBlogsFor,
  blogsInDb,
  blogsInDbWithUserPopulated,
  initialUsers,
  usersInDb,
  authorizationHeaderFor
}