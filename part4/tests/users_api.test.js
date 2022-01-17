const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('POST /api/users', () => {
  test('rejects creating user with invalid username', async () => {
    const usersInDbBeforeRequest = await helper.usersInDb()
    const userToCreate = {
      name: 'another_name',
      password: 'another_password',
      username: 'x'
    }
  
    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const returnedErrorMessage = response.body.error
    expect(returnedErrorMessage).toMatch('`username` (`x`) is shorter than the minimum allowed length')
  
    const usersInDbAfterRequest = await helper.usersInDb()
    expect(usersInDbAfterRequest).toEqual(usersInDbBeforeRequest)
  })

  test('rejects creating user with used username', async () => {
    const usersInDbBeforeRequest = await helper.usersInDb()
    const userToCreate = {
      name: 'another_name',
      password: 'another_password',
      username: helper.initialUsers[0].username
    }
  
    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const returnedErrorMessage = response.body.error
    expect(returnedErrorMessage).toMatch('expected `username` to be unique')
  
    const usersInDbAfterRequest = await helper.usersInDb()
    expect(usersInDbAfterRequest).toEqual(usersInDbBeforeRequest)
  })

  test('rejects creating user with invalid password', async () => {
    const usersInDbBeforeRequest = await helper.usersInDb()
    const userToCreate = {
      name: 'another_name',
      password: 'x',
      username: 'another_username'
    }
  
    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const returnedErrorMessage = response.body.error
    expect(returnedErrorMessage).toMatch('password is shorter than the minimum allowed length')
  
    const usersInDbAfterRequest = await helper.usersInDb()
    expect(usersInDbAfterRequest).toEqual(usersInDbBeforeRequest)
  })
})

afterAll(() => {
  mongoose.connection.close()
})