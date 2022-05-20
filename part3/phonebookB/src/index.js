const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const personsRoute = require('./routes/persons.js')
const infoRoute = require('./routes/info.js')

const errorHandler = require('./errorHandler.js')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personsRoute)

app.get('/info', infoRoute)

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server listening in: http://localhost:${PORT}`))
