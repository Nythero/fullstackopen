const info = (req, res) => {
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
}

module.exports = info
