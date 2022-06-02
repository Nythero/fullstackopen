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

describe('when there\'s an user already in the database', () => {
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

  describe('when getting the list of users', () => {
    test('asking for the list of users succeeds', async () => {
      await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('users have property blogs', async () => {
      const response = await api.get('/api/users')

      const users = response.body

      expect(users.length).toBe(1)
      for(const user of users) {
        expect(user.blogs).toBeDefined()
        expect(user.blogs).toEqual([])
      }
    })

    test('users.blogs follows the schema', async () => {
      const newBlog = {
        title: 'Sample Text',
        author: 'Sample Text',
        url: 'http://sample.url',
        likes: 3,
      }

      await api.post('/api/blogs')
        .send(newBlog)

      const response = await api.get('/api/users')
      const users = response.body
      const user = users[0]
      expect(user.blogs.length).toBe(1)

      const blog = user.blogs[0]
      const properties = Object.keys(newBlog)
      for(const p of properties) {
        expect(blog[p]).toBeDefined()
        expect(blog[p]).toBe(newBlog[p])
      }
    })
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

  test('addition of an user without username fails', async () => {
    const userData = {
      name: 'name',
      password: 'password'
    }

    await api.post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('addition of an user with an username with less than 3 characters fails', async () => {
    const userData = {
      username: 'us',
      name: 'name',
      password: 'password'
    }

    await api.post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('addition of an user without password fails', async () => {
    const userData = {
      username: 'username2',
      name: 'name'
    }

    await api.post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('addition of an user with a password with less than 3 characters fails', async () => {
    const userData = {
      username: 'username2',
      name: 'name',
      password: 'pa'
    }

    await api.post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('addition of an user with a not unique username fails', async () => {
    const userData = {
      username: 'username',
      name: 'name',
      password: 'password'
    }

    await api.post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
