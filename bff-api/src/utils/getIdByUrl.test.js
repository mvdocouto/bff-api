const getIdByUrl = require('./getIdByUrl')

describe('GetIdByUrl Funtion', () => {
  it('Must return Id', async () => {
    const mockUrl = 'https://pokeapi.co/api/v2/pokemon/25/'
    const mockId = '25'

    const result = getIdByUrl(mockUrl)
    expect(result).toBe(mockId)
  })
})
