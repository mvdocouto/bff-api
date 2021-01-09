const path = require("path");
const { importSchema } = require("graphql-import");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const resolvers = require("../resolvers/index.js");
const ColorAPI = require("../data/services/colorApi");
const PokeAPI = require("../data/services/pokeApi");

const { GRAPHI } = process.env;

const typeDefs = importSchema(
  path.resolve(__dirname, "../schema/root.graphql")
);


const schema = makeExecutableSchema({
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
});


const dataSources = () => ({
  colorAPI: new ColorAPI(),
  pokeAPI: new PokeAPI()
});

module.exports = (server) => {

  const apolloServer = new ApolloServer({
    schema,
    playground: GRAPHI,
    introspection: GRAPHI,
    // dataSources,
    context: ({ req }) => ({
      logger: req.logger,
    }),
  });
  apolloServer.applyMiddleware({
    app: server,
    path: "/"
  });
};

module.exports.schema = schema;
