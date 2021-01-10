const R = require("ramda");

const name = R.prop("name");
const color = R.prop("color");

const pokemonType = {
  name,
  color,
};

module.exports = {
  pokemonType,
};
