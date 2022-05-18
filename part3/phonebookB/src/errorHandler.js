const errorHandler = (err, req, res, next) => {
  console.error(err)

  if(err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id'})
  }

  next(error)
}

module.exports = errorHandler
