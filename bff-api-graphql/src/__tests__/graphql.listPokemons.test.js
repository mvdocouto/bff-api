const { gql } = require('apollo-server-express')
const nock = require('nock')

const apolloMockServer = require('./__mocks__/apolloMockServer')
const { schema } = require('../config/graphql')

const PokeAPI = require('../data/services/pokeApi')
const ColorAPI = require('../data/services/colorApi')

const { POKEAPI_URL, COLOR_API_URL } = process.env

const LIST_POKEMONS = gql`
  query listPokemons($page: Page) {
    listPokemons(page: $page) {
      name
      types {
        name
        color
      }
    }
  }
`

describe('List Pokemons', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
    nock.restore()
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
    nock(POKEAPI_URL)
      .get('/pokemon/?offset=0&limit=20')
      .reply(200, {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
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

    nock(POKEAPI_URL)
      .get('/pokemon/1')
      .reply(200, {
        id: 1,
        name: 'bulbasaur',
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        },
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

    nock(POKEAPI_URL)
      .get('/pokemon/2')
      .reply(200, {
        id: 1,
        name: 'ivysaur',
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        },
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

    nock(COLOR_API_URL)
      .get('/colors')
      .reply(200, [
        {
          _id: '5ffa1ca4676ab01cdd4eb4f5',
          category: 'grass',
          color: '#239B56'
        },
        {
          _id: '5ffa1ca4676ab01cdd4eb4f6',
          category: 'poison',
          color: '#C39BD3'
        },
        {
          _id: '5ffa1ca4676ab01cdd4eb4f7',
          category: 'normal',
          color: '#3498DB'
        }
      ])

    const mockResult = [
      {
        name: 'bulbasaur',
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
      },
      {
        name: 'ivysaur',
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
    ]

    const { query } = apolloMockServer(schema, {
      dataSources: () => dataSources
    })

    const response = await query({
      query: LIST_POKEMONS,
      variables: {
        page: { offset: 0, limit: 20 }
      }
    })

    expect(response.data.listPokemons).toEqual(mockResult)
  })
})
