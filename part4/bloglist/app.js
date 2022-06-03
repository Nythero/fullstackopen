const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware.js')

const { MONGODB_URI } = require('./utils/config.js')

const blogs = require('./controllers/blogs.js')
const users = require('./controllers/users.js')
const login = require('./controllers/login.js')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogs)
app.use('/api/users', users)
app.use('/api/login', login)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
