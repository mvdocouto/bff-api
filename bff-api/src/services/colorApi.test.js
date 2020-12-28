const nock = require('nock')
const { COLOR_API_URL } = process.env

const { listAllcolors, getColorByCategory } = require('./colorApi')

describe('GetIdByUrl Funtion', () => {
  beforeEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  it('listAllcolors', async () => {
    const colorApiResponse = [{
      _id: '5fe90fd20946f8df43c1d0df',
      category: 'normal',
      color: '#3498DB'
    },
    {
      _id: '5fe90fdb0946f8718ac1d0e0',
      category: 'fighting',
      color: '#ECF0F1'
    },
    {
      _id: '5fe90fe20946f8dcb6c1d0e1',
      category: 'flying',
      color: '#2E86C1'
    }]
    nock(COLOR_API_URL)
      .get('/colors')
      .reply(200, colorApiResponse)

    const result = listAllcolors()
    expect(result).toEqual(colorApiResponse)
  })
})
