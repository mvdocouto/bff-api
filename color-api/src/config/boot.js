const { disconnect } = require('./db')
const logger = require('./logger')

module.exports = (server) => {
  server.listen(server.get('port'), () => {
    logger.info(`COLOR API - Port ${server.get('port')}`)
  })

  process.on('SIGINT', () => {
    disconnect()
    logger.info(
      'The connection was disconnected due to application termination'
    )
    process.exit(1)
  })
}
