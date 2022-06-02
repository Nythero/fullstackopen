const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Router = require('express').Router()
const User = require('../models/User.js')
const { SECRET } = require('../utils/config.js')

Router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const isPasswordCorrect = user?
    await bcrypt.compare(password, user.passwordHash) :
    false

  if(!isPasswordCorrect)
    return response.status(401).json({ error: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET)

  response.status(200).json({
    token: token,
    username: user.username,
    name: user.name
  })
})

module.exports = Router
