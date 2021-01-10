const { server, boot, graphql } = require('./config')

graphql(server)

boot(server)
