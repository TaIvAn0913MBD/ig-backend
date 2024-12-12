const jwt = require("jsonwebtoken");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

createPost = async (req, res) => {
  try {
    const body = req.body;

    const { creatorID } = body;
    console.log(body);
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
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      const token = authHeader.split(" ")[1];
      if (!token) res.json({ message: "no token in headers" });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const popPosts = await postModel.find().populate({
        path: "creatorID",
      });
      console.log(popPosts);

      res.status(200).send(popPosts);
    } else {
      res.status(404).send("error");
    }
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
