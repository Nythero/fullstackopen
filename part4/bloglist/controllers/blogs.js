const Router = require('express').Router()

const Blog = require('../models/Blog.js')
const User = require('../models/User.js')

Router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    })
    response.json(blogs)
  }
  catch(err) {
    next(err)
  }
})

Router.post('/', async (request, response, next) => {
  const user = await User.findOne({})
  if(!user)
    return response.status(500).json({ error: 'can\'t find a user to assign' })

  const blogData = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  }

  const blog = new Blog(blogData)
  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  }
  catch(err) {
    next(err)
  }
})

Router.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

Router.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blogData = {
    likes: request.body.likes
  }

  try {
    const blog = await Blog.findByIdAndUpdate(id, blogData, {
      new: true
    })
    if(blog === null)
      return response.status(404).json({ error: 'Not Found' })
    response.status(200).json(blog)
  }
  catch(err) {
    next(err)
  }
})

module.exports = Router
