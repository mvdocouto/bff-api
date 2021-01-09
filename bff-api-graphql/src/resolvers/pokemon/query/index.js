const R = require("ramda");
const { ApolloError } = require("apollo-server-express");

const listPokemons = async (root, data, { dataSources, logger }) => {
    return [{
        "name": "bulbasaur",
        "types": [
            {
                "name": "grass",
                "color": "#239B56"
            },
            {
                "name": "poison",
                "color": "#C39BD3"
            }
        ]
    },
    {
        "name": "charmander",
        "types": [
            {
                "name": "fire",
                "color": "#E74C3C"
            }
        ]
    }]
};

module.exports = listPokemons
