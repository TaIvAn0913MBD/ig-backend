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
const getmanyPOSTS = async (req, res) => {
  try {
    const posts = await postModel.find();
    const popPosts = await postModel.find().populate({
      path: "creatorID",
    });

    res.status(200).send(popPosts);
  } catch (err) {
    console.log(err);
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

module.exports = { createPost, getPost, getmanyPOSTS };
