const dotenv = require("dotenv");

dotenv.config();

require("./env")();
const server = require("./server");
const boot = require("./boot");
const graphql = require("./graphql");
const logger = require("./logger");

module.exports.logger = logger;
module.exports.server = server;
module.exports.boot = boot;
module.exports.graphql = graphql;
