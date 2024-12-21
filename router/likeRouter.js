const express = require("express");
const LikeRouter = express.Router();
const {
  CreateLike,
  UnLike,
  getLikes,
} = require("../constollers/likeController");

LikeRouter.post("/post/like", CreateLike);
LikeRouter.post("/post/unlike", UnLike);
LikeRouter.get("/like/:likeId", getLikes);

module.exports = LikeRouter;
