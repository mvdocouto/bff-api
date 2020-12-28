const axios = require('axios')
const logger = require('../config/logger')

const instance = axios.create({
  baseURL: process.env.POKEAPI_URL,
  timeout: 10000
})

const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const result = await instance.get(
      `/pokemon/?offset=${offset}&limit=${limit}`
    )
    return result.data
  } catch (error) {
    logger.error('Erro get pokemon list')
    throw new Error(error)
  }
}

const getPokemonType = async (id) => {
  try {
    const result = await instance.get(`/pokemon/${id}`)
    return result.data.types
  } catch (error) {
    logger.error('Erro get pokemon type')
    throw new Error(error)
  }
}

module.exports = {
  getPokemonList,
  getPokemonType
}
