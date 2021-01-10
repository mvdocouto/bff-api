const { RESTDataSource } = require("apollo-datasource-rest");

const { POKEAPI_URL } = process.env;

class PokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = POKEAPI_URL;
  }

  didEncounterError(error, request) {
    const payloadError = {
      errorMsg: error.message,
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
      },
    };

    console.error("REQUEST_POKEAPI_SERVICE_HTTP_ERROR", payloadError);
    throw error;
  }

  async getPokemonList(offset = 0, limit = 20) {
    console.info("REQUEST_POKEAPI_SERVICE", { offset, limit });
    const result = await this.get(`/pokemon/?offset=${offset}&limit=${limit}`);
    return result;
  }

  async getPokemonType(id) {
    console.info("REQUEST_POKEAPI_SERVICE", { id });
    const result = await this.get(`/pokemon/${id}`);
    return result;
  }
}

module.exports = PokeAPI;
