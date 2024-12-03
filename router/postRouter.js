const express = require("express");
const PostRouter = express.Router();
const {
  createPost,
  getPost,
  getmanyPOSTS,
} = require("../constollers/postController");

PostRouter.post("/post/create", createPost);
PostRouter.get("/post/:postId", getPost);
PostRouter.get("/posts/get", getmanyPOSTS);

module.exports = PostRouter;
