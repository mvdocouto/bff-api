const logger = require('./logger')

module.exports = (server) => {
  server.listen(server.get('port'), () => {
    logger.info(`BFF API running - Port ${server.get('port')}`)
  })

  process.on('SIGINT', () => {
    process.exit(1)
  })
}
