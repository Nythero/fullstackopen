const { PORT } = require('./utils/config.js')
const app = require('./app.js')
const logger = require('./utils/logger.js')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
