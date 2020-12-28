const express = require('express')
const router = express.Router()
const { listAllPokemons } = require('../controller/pokemon')

router.get('/', async (req, res) => {
  let response
  if (Object.keys(req.query).length !== 0) {
    const { offset, limit } = req.query
    response = await listAllPokemons(offset, limit)
  } else {
    response = await listAllPokemons()
  }

  const { data, error } = response
  if (error === null) {
    return res.status(200).json(data)
  }
  return res.status(500).json({ message: error })
})

module.exports = router
