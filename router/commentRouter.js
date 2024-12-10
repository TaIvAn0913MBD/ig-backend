const express = require("express");
const CommentRouter = express.Router();
const {
  CreateComment,
  getComments,
} = require("../constollers/commentController");

CommentRouter.post("/post/comment", CreateComment);
CommentRouter.get("/comment/:postId", getComments);

module.exports = CommentRouter;
