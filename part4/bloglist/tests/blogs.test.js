const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/Blog.js')
const User = require('../models/User.js')
const dummyBlogs = require('./dummyBlogs.js')
const dummyUser = require('./dummyUser.js')

const api = supertest(app)

describe('when there are multiple blogs already in the database', () => {
  describe('when there\'s an user already in the database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const userData = await dummyUser()

      const user = new User(userData)
      const savedUser = await user.save()

      await Blog.deleteMany({})
      await Promise.all(dummyBlogs.map(async blog => {
        const blogData = { ...blog, user: savedUser._id }
        const blogObject = new Blog(blogData)
        return await blogObject.save()
      }))
    })

    describe('when getting the list of blogs', () => {
      test('blogs are returned as json', async () => {
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        expect(response.body.length).toEqual(dummyBlogs.length)
      })

      test('blogs have property id', async () => {
        const response = await api.get('/api/blogs')

        for(const blog of response.body) {
          expect(blog.id).toBeDefined()
          expect(blog._id).not.toBeDefined()
          expect(blog.__v).not.toBeDefined()
        }
      })

      test('blogs have property user', async () => {
        const response = await api.get('/api/blogs')

        for(const blog of response.body) {
          expect(blog.user).toBeDefined()
          const user = blog.user
          expect(user.id).toBeDefined()
          expect(user.username).toBeDefined()
          expect(user.name).toBeDefined()
        }
      })
    })

    describe('addition', () => {
      describe('while not logged in', () => {
        test('a valid blog succeeds', async () => {
          const newBlog = {
            title: 'Sample Text',
            author: 'Sample Text',
            url: 'http://sample.url',
            likes: 3,
          }

          await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        })
      })
      describe('while logged in', () => {
        let token
        beforeEach(async () => {
          const credentials = {
            username: 'username',
            password: 'password'
          }
          const response = await api.post('/api/login')
            .send(credentials)
          token = response.body.token
        })

        test('a valid blog succeeds', async () => {
          const newBlog = {
            title: 'Sample Text',
            author: 'Sample Text',
            url: 'http://sample.url',
            likes: 3,
          }

          const response = await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

          const blog = response.body

          for(const property in newBlog) {
            expect(blog[property]).toEqual(newBlog[property])
          }
          expect(blog.user).toBeDefined()

          const blogs = (await api.get('/api/blogs')).body

          expect(blogs.length).toBe(dummyBlogs.length + 1)
        })

        test('a blog without likes succeeds', async () => {
          const newBlog = {
            title: 'Sample Text',
            author: 'Sample Text',
            url: 'http://sample.url',
          }

          const response = await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

          const blog = response.body

          for(const property in newBlog) {
            expect(blog[property]).toEqual(newBlog[property])
          }
          expect(blog.likes).toBeDefined()
          expect(blog.likes).toBe(0)

          const blogs = (await api.get('/api/blogs')).body

          expect(blogs.length).toBe(dummyBlogs.length + 1)
          expect(blogs.some(b => b.id === blog.id)).toBeTruthy()
        })

        test('a blog without title fails', async () => {
          const newBlog = {
            author: 'Sample Text',
            url: 'http://sample.url',
            likes: 3
          }

          await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

          const blogs = (await api.get('/api/blogs')).body

          expect(blogs.length).toEqual(dummyBlogs.length)
        })

        test('a blog without url fails', async () => {
          const newBlog = {
            title: 'Sample Text',
            author: 'Sample Text',
            likes: 3
          }

          await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

          const blogs = (await api.get('/api/blogs')).body

          expect(blogs.length).toEqual(dummyBlogs.length)
        })
      })
    })

    describe('deletion', () => {
      describe('while logged in', () => {
        let token
        beforeEach(async () => {
          const credentials = {
            username: 'username',
            password: 'password'
          }
          const response = await api.post('/api/login')
            .send(credentials)
          token = response.body.token
        })

        test('a blog from the user succeeds', async () => {
          const id = dummyBlogs[0]._id

          await api.delete(`/api/blogs/${id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

          const blogs = (await api.get('/api/blogs')).body

          expect(blogs.length).toBe(dummyBlogs.length - 1)
        })

        test('a blog without id fails', async () => {
          await api.delete('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .expect(404)
        })

        test('a blog from another user fails', async () => {
          const userData =  {
            username: 'username2',
            name: 'name',
            password: 'password2'
          }
          await api.post('/api/users')
            .send(userData)

          const response = await api.post('/api/login')
            .send(userData)
          const token2 = response.body.token

          const id = dummyBlogs[0]._id
          await api.delete(`/api/blogs/${id}`)
            .set('Authorization', `bearer ${token2}`)
            .expect(401)
        })
      })
      describe('while not logged in', () => {
        test('a blog from fails', async () => {
          const id = dummyBlogs[0]._id

          await api.delete(`/api/blogs/${id}`)
            .expect(401)
        })
      })
    })

    describe('updating', () => {
      test('a blog with valid information succeeds', async () => {
        const oldBlog = dummyBlogs[0]
        const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 }

        const response = await api.put(`/api/blogs/${oldBlog._id}`)
          .send(updatedBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blog = response.body

        const properties = ['title', 'author', 'url', 'likes']
        for(const p of properties) {
          expect(blog[p]).toBe(updatedBlog[p])
        }
      })

      test('a blog with only the id succeeds', async () => {
        const oldBlog = dummyBlogs[0]

        const response = await api.put(`/api/blogs/${oldBlog._id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blog = response.body

        const properties = ['title', 'author', 'url', 'likes']
        for(const p of properties) {
          expect(blog[p]).toBe(oldBlog[p])
        }
      })
    })
  })
})

describe('when there\'s no users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('addition of', () => {
    test('a valid blog fails', async () => {
      const newBlog = {
        title: 'Sample Text',
        author: 'Sample Text',
        url: 'http://sample.url',
        likes: 3,
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})
