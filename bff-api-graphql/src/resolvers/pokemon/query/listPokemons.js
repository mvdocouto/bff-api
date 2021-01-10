const formatPokemonType = require('../../../utils/formatPokemonType')
const formatColorList = require('../../../utils/formatColorList')
const getIdByUrl = require('../../../utils/getIdByURL')

const listPokemonType = async (dataSources, name, url, colorList) => {
  const pokemonId = getIdByUrl(url)
  const { types } = await dataSources.pokeAPI.getPokemonType(pokemonId)
  const data = {
    name,
    types: formatPokemonType(types, colorList)
  }
  return data
}

const listPokemons = async (root, data, { dataSources }) => {
  const { offset, limit } = data.page

  const { results } = await dataSources.pokeAPI.getPokemonList(offset, limit)
  const response = await dataSources.colorAPI.listAllcolors()
  const colorList = await formatColorList(response)

  const pokemonList = await Promise.all(
    results.map(async ({ name, url }) => {
      return listPokemonType(dataSources, name, url, colorList)
    })
  )

  return pokemonList
}

module.exports = listPokemons
