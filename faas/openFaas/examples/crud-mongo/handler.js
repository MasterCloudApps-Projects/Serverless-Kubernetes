"use strict";

const initDatabase = require("./mongo");
const { Path } = require("path-parser");

module.exports = async (event, context) => {
  const repository = await initDatabase();
  context.headerValues["content-type"] = "application/json";
  const rootPath = new Path("/");
  const pathId = new Path("/:id");
  const commentsPath = new Path("/:id/comments");
  const commentsIdPath = new Path("/:id/comments/:commentId");
  if (rootPath.test(event.path)) {
    switch (event.method) {
      case "GET":
        await getAllUser(repository, context);
        break;
      case "POST":
        context.status(200).succeed(await repository.newEntry(event.body));
        break;
      default:
          context.status(405).succeed("Method not allowed");
    }
  } else if (pathId.test(event.path)) {
    const params = pathId.test(event.path);
    switch (event.method) {
      case "GET":
        try {
          const a = await repository.getEntryById(params.id);
          context.status(200).succeed(a);
        } catch (error) {
          errorHandler(error, context);
        }
        break;
      case "PUT":
        try {
          context
            .status(200)
            .succeed(await repository.editEntry(params.id, event.body));
        } catch (error) {
          errorHandler(error, context);
        }
        break;
      case "DELETE":
        context.status(200).succeed(await repository.deleteEntry(params.id));
        break;
      default:
        context.status(405).succeed("Method not allowed");
    }
  } else if (commentsPath.test(event.path)) {
    const params = commentsPath.test(event.path);
    switch (event.method) {
      case "POST":
        context.status(200).succeed(await repository.newEntryComment(params.id, event.body));
        break;
      default:
          context.status(405).succeed("Method not allowed");
    }
  } else if (commentsIdPath.test(event.path)) {
    const params = commentsIdPath.test(event.path);
    switch (event.method) {
      case "DELETE":
        try {
          context.status(200).succeed(
            await repository.deleteEntryComment(params.id, params.commentId)
          );
        } catch (error) {
          errorHandler(error, context);
        }
        break;
      default:
          context.status(405).succeed("Method not allowed");
    }
   
  } else {
    context.status(404).succeed("NOT FOUND");
  }
};

const getAllUser = async (repository, context) => {
  console.log("init getAllUser");
  try {
    context.status(200).succeed(await repository.getEntries());
  } catch (error) {
    context.status(503).succeed(error);
  }
};

const errorHandler = (err, context) => {
  context.status((err && err.statusCode) || 500).succeed(err);
};
