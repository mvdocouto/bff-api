const joi = require('joi')

module.exports = () => {
  const variableSchema = {
    PORT: joi.number().default(8000),
    DATABASE_URL: joi.string().required()
  }
  const schema = joi.object(variableSchema).unknown().required()

  const { error, value } = schema.validate(process.env)

  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }

  process.env = { ...process.env, ...value }
}
