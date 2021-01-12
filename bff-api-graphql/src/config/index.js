const dotenv = require('dotenv')

dotenv.config()

require('./env')()
const server = require('./server')
const boot = require('./boot')
const graphql = require('./graphql')
const logger = require('./logger')
const redis = require('./redis')

module.exports.logger = logger
module.exports.redis = redis
module.exports.server = server
module.exports.boot = boot
module.exports.graphql = graphql
