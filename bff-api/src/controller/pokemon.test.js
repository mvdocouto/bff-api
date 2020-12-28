const nock = require('nock')

const {
  formatPokemonType, listPokemonType, formatColorList
} = require('./pokemon')

const { POKEAPI_URL } = process.env

describe('Pokemon Controler', () => {
  it('must return to formatted Pokémon types', async () => {
    const mockColorList = {
      grass: '#239B56',
      electric: '#A9CCE3'
    }

    const mockTypes = [
      {
        id: 1,
        type: {
          name: 'grass',
          url: 'http://urltypepokemon'
        }
      },
      {
        id: 2,
        type: {
          name: 'electric',
          url: 'http://urltypepokemon'
        }
      }
    ]

    const mockResultTypes = [
      {
        name: 'grass',
        color: '#239B56'
      },
      {
        name: 'electric',
        color: '#A9CCE3'
      }
    ]

    const result = formatPokemonType(mockTypes, mockColorList)
    expect(result).toEqual(mockResultTypes)
  })

  it('must return a dictionary containing the category and its respective color', async () => {
    const mockColorList = [
      {
        _id: '5fe7a9adbb143fe28de67e72',
        category: 'grass',
        color: '#239B56'
      },
      {
        _id: '5fe7a9f6bb143f855ae67e73',
        category: 'electric',
        color: '#A9CCE3'
      }
    ]

    const mockResponse = {
      grass: '#239B56',
      electric: '#A9CCE3'
    }

    const result = formatColorList(mockColorList)
    expect(result).toEqual(mockResponse)
  })

  it('must return the name of the pokemon its types and each color associated with a type', async () => {
    const mockPokemonName = 'venusaur'
    const mockPokemonUrl = 'http://pokemon.api/3/'
    const mockColorList = {
      grass: '#239B56',
      poison: '#C39BD3'
    }

    const pokemonApiResponse = {
      id: 3,
      name: mockPokemonName,
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/'
          }
        },
        {
          slot: 2,
          type: {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/'
          }
        }
      ]
    }

    nock(POKEAPI_URL).get('/pokemon/3').reply(200, pokemonApiResponse)

    const mockResponse = {
      name: mockPokemonName,
      types: [
        {
          name: 'grass',
          color: '#239B56'
        },
        {
          name: 'poison',
          color: '#C39BD3'
        }
      ]
    }

    const result = await listPokemonType(
      mockPokemonName,
      mockPokemonUrl,
      mockColorList
    )
    expect(result).toEqual(mockResponse)
  })
})
