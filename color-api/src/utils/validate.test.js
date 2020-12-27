const validatePayload = require('./validate')

describe('Validate Funtion', () => {
  it('Must return valid payload', async () => {
    const mockPayload = {
      category: 'Teste',
      color: '#000000'
    }

    const result = validatePayload(mockPayload)
    expect(result).toBe(true)
  })

  it('Must return invalid payload if the category is undefined', async () => {
    const mockPayload = {
      category: undefined,
      color: '#000000'
    }

    const result = validatePayload(mockPayload)
    expect(result).toBe(false)
  })

  it('Must return invalid payload if the color is undefined', async () => {
    const mockPayload = {
      category: 'Test',
      color: undefined
    }

    const result = validatePayload(mockPayload)
    expect(result).toBe(false)
  })
})
