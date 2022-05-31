const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/Blog.js')
const dummyBlogs = require('./dummyBlogs.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  Promise.all(dummyBlogs.map(async blog => {
    const blogObject = new Blog(blog)
    return await blogObject.save()
  }))
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toEqual(dummyBlogs.length)
}, 10000)

test('blogs have property id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0].id)

  for(const blog of response.body) {
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
    expect(blog.__v).not.toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Sample Text',
    author: 'Sample Text',
    url: 'http://sample.url',
    likes: 3,
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = response.body

  for(const property in newBlog) {
    expect(blog[property]).toEqual(newBlog[property])
  }

  const blogs = (await api.get('/api/blogs')).body

  expect(blogs.length).toBe(dummyBlogs.length + 1)
  expect(blogs).toContainEqual(blog)
})

afterAll(() => {
  mongoose.connection.close()
})
