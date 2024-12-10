const { populate } = require("dotenv");
const CommentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const path = require("path");

const CreateComment = async (req, res) => {
  try {
    const body = req.body;

    const { authorID, postID } = body;
    const comm = await CommentModel.create(body);
    const _ID = comm._id;
    await userModel.findByIdAndUpdate(authorID, {
      $push: { comments: _ID },
    });
    await postModel.findByIdAndUpdate(postID, {
      $push: { comments: _ID },
    });

    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};
const getComments = async (req, res) => {
  try {
    const URL = req.params["postId"];
    const FoundedPost = await postModel.findById(URL);

    const pop = await FoundedPost.populate({
      path: "comments",
      populate: { path: "authorID" },
    });

    console.log(pop);
    res.send(pop);
  } catch (error) {
    res.send(error);
  }
};
module.exports = { CreateComment, getComments };
