const { createTestClient } = require('apollo-server-testing')
const { ApolloServer } = require('apollo-server-express')
const { logger } = require('../../config/logger')

module.exports = (schema, options = {}) => {
  const server = new ApolloServer({
    schema,
    ...options,
    context: () => ({
      logger
    })
  })

  return createTestClient(server)
}
