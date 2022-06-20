const express = require('express')
const Router = express.Router({
  mergeParams: true
})
const Blog = require('../models/Blog.js')

Router.post('/', async (request, response, next) => {
  const id = request.params.id
  const comment = request.body.comment
  try {
    const blog = await Blog.findById(id)
    blog.comments = blog.comments.concat(comment)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  }
  catch(err) {
    next(err)
  }
})

module.exports = Router
