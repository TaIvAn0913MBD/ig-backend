const express = require("express");
const CommentRouter = express.Router();
const { CreateComment } = require("../constollers/commentController");

CommentRouter.post("/post/comment", CreateComment);

module.exports = CommentRouter;
