const express = require('express')
const app = express()

const notes = require('./db.json')

app.get('/api/persons', (req, res) => {
  res.status(200).json(notes)
})

app.get('/info', (req, res) => {
  const html = `<html>
      <body>
        <p>
	  Phonebook has info for ${notes.length}
	</p>
	<p>
	  ${new Date()}
	</p>
      </body>
    </html>`
  res.status(200).send(html)
})

app.listen(3000, () => console.log('Server listening in: http://localhost:3000'))
