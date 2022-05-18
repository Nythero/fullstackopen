const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const personsRoute = require('./routes/persons.js')
const infoRoute = require('./routes/info.js')

const newId = () => {
  let id
  do {
    id = Math.floor(Math.random() * 1000)
  }
  while(persons.some(p => p.id === id)) 
    
  return id 
}

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

morgan.token('body', function (req,res) {
  return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personsRoute)

app.get('/info', infoRoute)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server listening in: http://localhost:${PORT}`))
