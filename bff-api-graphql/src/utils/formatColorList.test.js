const formatColorList = require('./formatColorList')

describe('formatColorList Funtion', () => {
  it('Must return format list', async () => {
    const mockListColor = [
      {
        _id: '5ffa1ca4676ab01cdd4eb4f5',
        category: 'fighting',
        color: '#ECF0F1'
      },
      {
        _id: '5ffa1ca4676ab01cdd4eb4f6',
        category: 'flying',
        color: '#2E86C1'
      },
      {
        _id: '5ffa1ca4676ab01cdd4eb4f7',
        category: 'normal',
        color: '#3498DB'
      }
    ]
    const mockResult = {
      fighting: '#ECF0F1',
      flying: '#2E86C1',
      normal: '#3498DB'
    }

    const result = formatColorList(mockListColor)
    expect(result).toEqual(mockResult)
  })
})
