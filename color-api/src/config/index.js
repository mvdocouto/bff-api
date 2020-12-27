const dotenv = require('dotenv')

dotenv.config()
require('./env')()

const server = require('./server')
const db = require('./db')
const boot = require('./boot')
const logger = require('./logger')

module.exports.logger = logger
module.exports.server = server
module.exports.db = db
module.exports.boot = boot
