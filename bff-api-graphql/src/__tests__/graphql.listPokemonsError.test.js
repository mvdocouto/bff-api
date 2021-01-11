const { gql } = require('apollo-server-express')
const nock = require('nock')

const apolloMockServer = require('./__mocks__/apolloMockServer')
const { schema } = require('../config/graphql')

const PokeAPI = require('../data/services/pokeApi')
const ColorAPI = require('../data/services/colorApi')

const { POKEAPI_URL } = process.env

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

describe('List Pokemons error', () => {
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

  test('should return error in get pokemon list', async () => {
    nock(POKEAPI_URL).get('/pokemon/?offset=0&limit=20').reply(500)

    const mockErrorMessage = '500: Internal Server Error'

    const { query } = apolloMockServer(schema, {
      dataSources: () => dataSources
    })

    const result = await query({
      query: LIST_POKEMONS,
      variables: {
        page: { offset: 0, limit: 20 }
      }
    })
    expect(result).toHaveProperty('data.listPokemons', null)
    expect(result).toHaveProperty('errors.0.message', mockErrorMessage)
  })
})
