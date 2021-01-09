const { reduce, mergeDeepWith, concat } = require("ramda");

const mergeObject = (accumulator, item) =>
  mergeDeepWith(concat, accumulator, item);

const prokemonResolver = require("./pokemon");

const resolvers = reduce(mergeObject, {}, [prokemonResolver]);

module.exports = resolvers;