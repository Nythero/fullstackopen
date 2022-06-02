const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there\'s no users', () => {
  test('login fails', async () => {
    const credentials = {
      username: 'username',
      password: 'password'
    }

    api.post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when there\'s an user already in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const password = 'password'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const userData = {
      username: 'username',
      name: 'name',
      passwordHash: passwordHash
    }
    const user = new User(userData)
    await user.save()
  })

  test('login with valid credentials succeeds', async () => {
    const credentials = {
      username: 'username',
      password: 'password'
    }

    const response = await api.post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const body = response.body

    const properties = ['token', 'name', 'username']
    for(const p of properties) {
      expect(body[p]).toBeDefined()
    }
  })

  test('login without credentials fails', async () => {
    await api.post('/api/login')
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
