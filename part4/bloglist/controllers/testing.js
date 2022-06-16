const express = require('express')
const Testing = express.Router()
const User = require('../models/User.js')
const Blog = require('../models/Blog.js')

Testing.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = Testing
