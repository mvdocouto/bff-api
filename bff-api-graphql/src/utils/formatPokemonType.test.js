const formatPokemonType = require('./formatPokemonType')

describe('formatPokemonType Funtion', () => {
  it('Must return format list', async () => {
    const mockTypes = [
      {
        slot: 1,
        type: { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
      }
    ]

    const mockColorList = {
      poison: '#C39BD3',
      water: '#AED6F1',
      normal: '#3498DB'
    }

    const mockResult = [
      { name: 'water', color: '#AED6F1' },
      { name: 'poison', color: '#C39BD3' }
    ]

    const result = formatPokemonType(mockTypes, mockColorList)
    expect(result).toEqual(mockResult)
  })
})
