const express = require('express')
const app = express()

const persons = require('./db.json')

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

app.listen(3000, () => console.log('Server listening in: http://localhost:3000'))
