const nock = require('nock')
const { POKEAPI_URL } = process.env

const { getPokemonList, getPokemonType } = require('./pokemonApi')

describe('Pokemon API', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  it('must return the list of all pokémons', async () => {
    const pokemonApiResponse = {
      count: 1118,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset&limit=5',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/'
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/'
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/'
        },
        {
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon/5/'
        }
      ]
    }
    nock(POKEAPI_URL)
      .get('/pokemon/')
      .query({ offset: 0, limit: 20 })
      .reply(200, pokemonApiResponse)

    const result = await getPokemonList()
    expect(result).toEqual(pokemonApiResponse)
  })

  it('must return the type of a pokémon from the id', async () => {
    const mockPokemonId = 20
    const pokemonApiResponse = {
      id: 20,
      name: 'raticate',
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: 'https://pokeapi.co/api/v2/type/1/'
          }
        }
      ]
    }

    nock(POKEAPI_URL)
      .get(`/pokemon/${mockPokemonId}`)
      .reply(200, pokemonApiResponse)

    const result = await getPokemonType(mockPokemonId)
    expect(result).toEqual(pokemonApiResponse.types)
  })
})
