const { mongoose, Schema } = require("mongoose");

const CommentSchema = new Schema({
  authorID: { type: mongoose.Types.ObjectId, ref: "users", require: true },
  comment: { type: String, require: true },
  postID: { type: mongoose.Types.ObjectId, ref: "posts", require: true },
});

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;
