const express = require('express')
const logger = require('../config/logger')

const router = express.Router()

router.get('/', (req, res) => {
  const result = {
    status: 'ok'
  }
  logger.info('Server running')
  res.json(result)
})

module.exports = router
