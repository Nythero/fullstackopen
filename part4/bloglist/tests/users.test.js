const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const User = require('../models/User.js')

const api = supertest(app)

describe('when there\'s no users', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('asking for the list of users succeeds', async () => {
    api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('addition of a valid user succeeds', async () => {
    const userData = {
      username: 'username',
      name: 'name',
      password: 'password'
    }

    const response = await api.post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = response.body

    expect(user.id).toBeDefined()
    expect(user.username).toBeDefined()
    expect(user.name).toBeDefined()
    expect(user.passwordHash).not.toBeDefined()

    const users = (await api.get('/api/users')).body
    expect(users.length).toBe(1)
    expect(users).toContainEqual(user)
  })
})

describe('when there\'s a user already in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const userData = {
      username: 'username',
      name: 'name',
      password: 'password'
    }
    const user = new User(userData)
    await user.save()
  })

  test('asking for the list of users succeeds', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.length).toBe(1)
  })

  test('addition of a valid user succeeds', async () => {
    const userData = {
      username: 'username2',
      name: 'name2',
      password: 'password'
    }

    const response = await api.post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = response.body

    expect(user.username).toBeDefined()
    expect(user.name).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.passwordHash).not.toBeDefined()

    const users = (await api.get('/api/users')).body

    expect(users.length).toBe(2)
    expect(users).toContainEqual(user)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
