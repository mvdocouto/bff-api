const dotenv = require('dotenv')

dotenv.config()
require('./env')()

const server = require('./server')
const { connect } = require('./db')
const boot = require('./boot')
const logger = require('./logger')

connect()

module.exports.logger = logger
module.exports.server = server
module.exports.boot = boot
