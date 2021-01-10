const express = require('express')
const app = express()

const HealthRouter = require('../router/health')

app.set('port', process.env.PORT)
app.use('/health', HealthRouter)

module.exports = app
