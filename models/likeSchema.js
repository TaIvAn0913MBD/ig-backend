const { Schema, mongoose } = require("mongoose");

const likeSchema = new Schema({
  LikedId: { type: mongoose.Types.ObjectId, ref: "users", require: true },
  PostId: { type: mongoose.Types.ObjectId, ref: "posts", require: true },
});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
