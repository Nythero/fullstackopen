const Router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

Router.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.status(200).json(users)
  }
  catch(err) {
    next(err)
  }
})

Router.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userData = { username, name, passwordHash }
  const user = new User(userData)

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = Router
