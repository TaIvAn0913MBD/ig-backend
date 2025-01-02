const { mongoose, Schema } = require("mongoose");
const { type } = require("os");

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  username: { type: String, require: true },
  profileIMG: { type: String, require: true },
  followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
  bio: { type: String, require: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
