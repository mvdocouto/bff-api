const redisClient = require('../../../config/redis')
const formatPokemonType = require('../../../utils/formatPokemonType')
const formatColorList = require('../../../utils/formatColorList')
const getIdByUrl = require('../../../utils/getIdByURL')

const getPokemonTypeInCache = async (dataSources, pokemonId) => {
  const dataCache = await redisClient.get(`pokemon_${pokemonId}`)
  if (dataCache) {
    return JSON.parse(dataCache)
  }
  const result = await dataSources.pokeAPI.getPokemonType(pokemonId)
  await redisClient.setex(
    `pokemon_${pokemonId}`,
    1440,
    JSON.stringify(result)
  )
  return result
}

const getColorByTypeInCache = async (dataSources) => {
  const dataCache = await redisClient.get('listColors')
  if (dataCache) {
    return JSON.parse(dataCache)
  }
  const response = await dataSources.colorAPI.listAllcolors()
  await redisClient.setex('listColors', 1440, JSON.stringify(response))
  return response
}

const listPokemonType = async (dataSources, name, url, colorList) => {
  const pokemonId = getIdByUrl(url)
  const result = await getPokemonTypeInCache(dataSources, pokemonId)

  return {
    name,
    types: formatPokemonType(result.types, colorList)
  }
}

const listPokemons = async (root, data, { dataSources }) => {
  const { offset, limit } = data.page

  const { results } = await dataSources.pokeAPI.getPokemonList(offset, limit)
  const colorByType = await getColorByTypeInCache(dataSources)
  const colorList = formatColorList(colorByType)

  const pokemonList = await Promise.all(
    results.map(async ({ name, url }) => {
      return listPokemonType(dataSources, name, url, colorList)
    })
  )

  return pokemonList
}

module.exports = listPokemons
