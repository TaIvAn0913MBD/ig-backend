const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema({
  description: { type: String, require: true },
  postImages: [{ type: String, require: true }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "likes" }],
  creatorID: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
