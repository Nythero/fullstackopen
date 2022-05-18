const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = require('./db.json')

const newId = () => {
  let id
  do {
    id = Math.floor(Math.random() * 1000)
  }
  while(persons.some(p => p.id === id)) 
    
  return id 
}

app.use(cors())

app.use(express.json())

morgan.token('body', function (req,res) {
  return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    res.status(200).json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  
  if(!name)
    return res.status(400).json({error:'Missing name'})
  else if(!number)
    return res.status(400).json({error:'Missing number'})
  else if(persons.some(p => p.name === name))
    return res.status(400).json({error:'Name must be unique'})

  const person = {
    name: req.body.name,
    number: req.body.number,
    id: newId()
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

app.get('/info', (req, res) => {
  const html = `<html>
      <body>
        <p>
	  Phonebook has info for ${persons.length}
	</p>
	<p>
	  ${new Date()}
	</p>
      </body>
    </html>`
  res.status(200).send(html)
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server listening in: http://localhost:${PORT}`))
