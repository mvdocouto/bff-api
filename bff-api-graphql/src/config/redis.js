const redis = require('redis')
const asyncRedis = require('async-redis')

const logger = require('./logger')

const { REDIS_PORT, REDIS_HOST } = process.env

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

redisClient.on('connect', () => logger.info('Conected to Redis'))
redisClient.on('error', (error) => {
  logger.error(error)
})

const client = asyncRedis.decorate(redisClient)

module.exports = client
