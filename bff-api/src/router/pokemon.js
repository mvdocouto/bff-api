const express = require('express')
const router = express.Router()
const { listAllPokemons } = require('../controller/pokemon')

router.get('/', async (req, res) => {
  const { data, error } = await listAllPokemons()
  if (error === null) {
    return res.status(200).json(data)
  }
  return res.status(500).json({ message: error })
})

module.exports = router
