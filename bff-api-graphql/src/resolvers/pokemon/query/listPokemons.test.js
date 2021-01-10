const nock = require('nock')
const PokeAPI = require('../../../data/services/pokeApi')
const ColorAPI = require('../../../data/services/colorApi')

const listPokemons = require('./listPokemons')

describe('List Pokemons', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  const pokeAPI = new PokeAPI()
  pokeAPI.initialize({
    context: {}
  })

  const colorAPI = new ColorAPI()
  colorAPI.initialize({
    context: {}
  })

  const dataSources = {
    pokeAPI,
    colorAPI
  }

  test('should return pokemon list', async () => {
    const getPokemonListSpy = jest.spyOn(pokeAPI, 'getPokemonList')
    const getPokemonTypeSpy = jest.spyOn(pokeAPI, 'getPokemonType')
    const listAllcolorsSpy = jest.spyOn(colorAPI, 'listAllcolors')

    getPokemonListSpy.mockResolvedValueOnce({
      count: 1118,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/'
        }
      ]
    })

    getPokemonTypeSpy
      .mockResolvedValueOnce({
        id: 1,
        name: 'bulbasaur',
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
      })
      .mockResolvedValueOnce({
        id: 2,
        name: 'ivysaur',
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
      })

    listAllcolorsSpy.mockResolvedValueOnce([
      { name: 'grass', color: '#239B56' },
      { name: 'poison', color: '#C39BD3' }
    ])

    const response = await listPokemons(
      null,
      {
        page: {
          offset: 0,
          limit: 20
        }
      },
      { dataSources }
    )

    expect(response).toHaveLength(2)
  })
})
