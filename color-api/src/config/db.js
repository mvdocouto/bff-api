const mongoose = require('mongoose')
const logger = require('./logger')

const connect = async () =>{
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}

const db = mongoose.connection
db.on('error', (error) => logger.error(error))
db.once('open', () => logger.info('Conected to database'))
db.on('disconnected', () => logger.info('default connection is disconnected'))

module.exports = {
  db,
  connect,
  disconnect
}
