const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const result = {
    status: 'ok'
  }
  res.json(result)
})

module.exports = router
