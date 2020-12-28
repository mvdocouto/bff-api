const express = require('express')
const app = express()

const PokemonRouter = require('../router/pokemon')
const HealthRouter = require('../router/health')

app.set('port', process.env.PORT)
app.use('/', PokemonRouter)
app.use('/health', HealthRouter)

module.exports = app
