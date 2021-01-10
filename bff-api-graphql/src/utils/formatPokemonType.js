const formatPokemonType = (types, colorList) => {
  return types.map((item) => {
    return {
      name: item.type.name,
      color: colorList[item.type.name]
    }
  })
}

module.exports = formatPokemonType
