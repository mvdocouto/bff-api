const express = require("express");
// const helmet = require("helmet");

const app = express();

const HealthRouter = require("../router/health");

// app.use(helmet());
app.set("port", process.env.PORT);
app.use("/health", HealthRouter);

module.exports = app;
