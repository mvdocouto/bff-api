const { reduce, mergeDeepWith, concat } = require('ramda')

const mergeObject = (accumulator, item) => mergeDeepWith(concat, accumulator, item)

const pokemonResolver = require('./pokemon')

const resolvers = reduce(mergeObject, {}, [pokemonResolver])

module.exports = resolvers
