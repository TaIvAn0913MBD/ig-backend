const express = require("express");
const UserRouter = express.Router();
const {
  signUp,
  login,
  getUser,
  Follow,
  Unfollow,
} = require("../constollers/userController");

UserRouter.post("/sign-up", signUp);
UserRouter.post("/login", login);
UserRouter.get("/getUsers", getUser);
UserRouter.post("/users/follow", Follow);
UserRouter.post("/users/unfollow", Unfollow);

module.exports = UserRouter;
