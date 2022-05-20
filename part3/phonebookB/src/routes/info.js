const Person = require('../models/Person.js')

const info = async (req, res, next) => {
  try {
    const people = await Person.find({})
    const html = `<html>
        <body>
          <p>
            Phonebook has info for ${people.length}
          </p>
          <p>
            ${new Date()}
          </p>
        </body>
      </html>`
    res.status(200).send(html)
  }
  catch(err) {
    next(err)
  }
}

module.exports = info
