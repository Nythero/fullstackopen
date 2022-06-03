const Router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/Blog.js')
const User = require('../models/User.js')

const { SECRET } = require('../utils/config.js')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    return authorization.substring(7)
  return null
}

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
  const token = getTokenFrom(request)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, SECRET)
  }
  catch(err) {
    if(err.message === 'jwt must be provided')
      decodedToken = {}
    else
      next(err)
  }
  if(!decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

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
