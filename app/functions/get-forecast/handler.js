'use strict'

const initDatabase = require("./mongo");


module.exports = async (event, context) => {
  const repository = await initDatabase();
  context.headerValues["content-type"] = "application/json";
  try {
    context.status(200).succeed(await repository.getEntries());
  } catch (error) {
    context.status(503).succeed(error);
  }
}

