const logger = require('../config/logger')

const { getPokemonList, getPokemonType } = require('../services/pokemonApi')
const { listAllcolors } = require('../services/colorApi')
const getIdByUrl = require('../utils/getIdByUrl')

const formatColorList = (listColor) => {
  return listColor.reduce(
    (obj, item) => ({ ...obj, [item.category]: item.color }),
    {}
  )
}

const formatPokemonType = (typeList, colorList) => {
  return typeList.map((item) => {
    let { type } = item
    return {
      name: type.name,
      color: colorList[type.name]
    }
  })
}

const listAllPokemons = async () => {
  try {
    const { results } = await getPokemonList()
    const response = await listAllcolors()
    const colorList = await formatColorList(response.data)
    const pokemonList = await Promise.all(
      results.map(async ({ name, url }) => {
        const pokemonId = getIdByUrl(url)
        const result = await getPokemonType(pokemonId)
        return {
          name,
          types: formatPokemonType(result, colorList)
        }
      })
    )
    return {
      data: pokemonList,
      error: null
    }
  } catch (error) {
    logger.error(error)
    return {
      error,
      data: []
    }
  }
}

module.exports = {
  formatPokemonType,
  listAllPokemons,
  formatColorList
}
