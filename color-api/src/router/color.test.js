const request = require('supertest')
const jasmine = require('jasmine')
const mongoose = require('mongoose')

const app = require('../config/server')
const { MongoMemoryServer } = require('mongodb-memory-server')
const ColorsByCategory = require('../model/colors')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongoServer
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Insertion of a category', () => {
  it('Must return 201 when registering a new category', async () => {
    const mockCategory = {
      category: 'Test',
      color: '#FFFFFF'
    }
    const response = await request(app).post('/colors').send(mockCategory)

    expect(response.status).toBe(201)
    expect(mockCategory.category).toEqual(response.body.category)
    expect(mockCategory.color).toEqual(response.body.color)
  })

  it('should return 400 when not receiving payload', async () => {
    const mockResponse = { message: 'Body not found' }
    const response = await request(app).post('/colors').send({})

    expect(response.status).toBe(400)
    expect(mockResponse).toEqual(response.body)
  })
})

describe('Deleting a category', () => {
  it('must return 200 when deleting a category', async () => {
    const category = new ColorsByCategory({
      category: 'Test',
      color: '#FFFFFF'
    })
    await category.save()

    const response = await request(app).delete(`/colors/${category._id}`)
    expect(response.statusCode).toBe(200)
  })

  it('should return 404 when receiving an unknown id', async () => {
    const mockId = '5fe7cebb58790e6b975bd52e'

    const response = await request(app).delete(`/colors/${mockId}`)
    expect(response.statusCode).toBe(404)
  })

  it('must return 500 when receiving an invalid id', async () => {
    const mockId = '123456'

    const response = await request(app).delete(`/colors/${mockId}`)
    expect(response.statusCode).toBe(500)
  })
})
