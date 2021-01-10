const joi = require('joi')

module.exports = () => {
  const variableSchema = {
    PORT: joi.number().default(5000),
    POKEAPI_URL: joi.string().required(),
    COLOR_API_URL: joi.string().required()
  }
  const schema = joi.object(variableSchema).unknown().required()

  const { error, value } = schema.validate(process.env)

  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }

  process.env = { ...process.env, ...value }
}
