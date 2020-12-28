const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.COLOR_API_URL,
  timeout: 1000
})

const listAllcolors = async () => {
  try {
    const result = await instance.get('/colors')
    return result
  } catch (error) {
    throw new Error('')
  }
}

const getColorByCategory = async (category) => {
  try {
    const result = await instance.get(`/colors/${category}`)
    return result
  } catch (error) {
    throw new Error('')
  }
}

module.exports = {
  listAllcolors,
  getColorByCategory
}
