const Router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

Router.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const user = await User.findById(id).populate('blogs', {
      title: 1,
      url: 1,
      likes: 1,
      author: 1
    })
    response.status(200).json(user)
  }
  catch(err) {
    next(err)
  }
})

Router.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      url: 1,
      likes: 1,
      author: 1
    })
    response.status(200).json(users)
  }
  catch(err) {
    next(err)
  }
})

Router.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if(!password)
    return response.status(400).json({ error: 'password needed' })
  else if(password.length < 3)
    return response.status(400).json({ error: 'password need to be at least 3 characters long' })

  const userWithUsername = await User.findOne({ username })
  if(userWithUsername)
    return response.status(400).json({ error: 'username already taken' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userData = { username, name, passwordHash }
  const user = new User(userData)

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(err) {
    next(err)
  }
})

module.exports = Router
