const express = require("express");
const PostRouter = express.Router();
const { createPost, getPost } = require("../constollers/postController");

PostRouter.post("/post/create", createPost);
PostRouter.get("/post/:postId", getPost);

module.exports = PostRouter;
