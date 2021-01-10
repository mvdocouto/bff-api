const R = require("ramda");

const name = R.prop("name");
const types = R.prop("types");

const pokemonList = {
  name,
  types,
};

module.exports = {
  pokemonList
};
