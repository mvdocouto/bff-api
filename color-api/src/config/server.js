const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const ColorRouter = require('../router/colors')
const HealthRouter = require('../router/health')

app.use(bodyParser.json())
app.set('port', process.env.PORT)

app.use('/colors', ColorRouter)
app.use('/health', HealthRouter)

module.exports = app
