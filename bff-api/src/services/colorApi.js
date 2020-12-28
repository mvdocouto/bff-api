const axios = require('axios')
const logger = require('../config/logger')

const instance = axios.create({
  baseURL: process.env.COLOR_API_URL,
  timeout: 1000
})

const listAllcolors = async () => {
  try {
    const result = await instance.get('/colors', {
      validateStatus: (status) => {
        return status < 500
      }
    })
    return result
  } catch (error) {
    logger.error('Error when listing colors')
    throw new Error(error)
  }
}

const getColorByCategory = async (category) => {
  try {
    const result = await instance.get(`/colors?category=${category}`, {
      validateStatus: (status) => {
        return status < 500
      }
    })
    return result
  } catch (error) {
    logger.error('Error searching for a color filtering by category')
    throw new Error(error)
  }
}

module.exports = {
  listAllcolors,
  getColorByCategory
}
