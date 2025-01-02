const express = require("express");
const UserRouter = express.Router();
const {
  signUp,
  login,
  getUser,
  Follow,
  Unfollow,
  EditUserProfileIMG,
} = require("../constollers/userController");

UserRouter.post("/sign-up", signUp);
UserRouter.post("/login", login);
UserRouter.get("/getUsers/:userId", getUser);
UserRouter.post("/users/follow", Follow);
UserRouter.post("/users/unfollow", Unfollow);
UserRouter.post("/user/edit/profileIMG", EditUserProfileIMG);

module.exports = UserRouter;
