const { RESTDataSource } = require('apollo-datasource-rest')
const logger = require('../../config/logger')

const { COLOR_API_URL } = process.env

class ColorAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = COLOR_API_URL
  }

  didEncounterError(error, request) {
    const payloadError = {
      errorMsg: error.message,
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers
      }
    }

    logger.error('COLOR_API_SERVICE_HTTP_ERROR', payloadError)
    throw error
  }

  async listAllcolors() {
    logger.info('REQUEST_COLOR_API_SERVICE')
    const result = await this.get('/colors')
    return result
  }

  async getColorByCategory(category) {
    logger.info('REQUEST_COLOR_API_SERVICE', { category })
    const result = await this.get(`/colors?category=${category}`)
    return result
  }
}

module.exports = ColorAPI
