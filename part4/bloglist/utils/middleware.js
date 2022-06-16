const logger = require('./logger.js')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config.js')
const User = require('../models/User.js')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    return authorization.substring(7)
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

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

  request.user = await User.findById(decodedToken.id)
  if(request.user === null)
    return response.status(401).json({ error: 'token missing or invalid' })

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
