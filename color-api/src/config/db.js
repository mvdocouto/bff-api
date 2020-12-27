const mongoose = require('mongoose')
const logger = require('./logger')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => logger.error(error))
db.once('open', () => logger.info('Conected to database'))
db.on('disconnected', () => logger.info('default connection is disconnected'))

module.exports = db
