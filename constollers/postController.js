const path = require("path");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

createPost = async (req, res) => {
  try {
    const body = req.body;
    const { creatorID } = body;
    const response = await postModel.create(body);
    const _ID = response._id;
    await userModel.findByIdAndUpdate(creatorID, {
      $push: { posts: _ID },
    });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

getPost = async (req, res) => {
  try {
    const URL = req.params["postId"];
    const FoundedPost = await postModel.findById(URL);
    const pop = await FoundedPost.populate("comments likes");

    res.send(pop);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports = { createPost, getPost };
