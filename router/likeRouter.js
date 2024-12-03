const express = require("express");
const LikeRouter = express.Router();
const { CreateLike, UnLike } = require("../constollers/likeController");

LikeRouter.post("/post/like", CreateLike);
LikeRouter.post("/post/unlike", UnLike);

module.exports = LikeRouter;
