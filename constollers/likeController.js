const postModel = require("../models/postSchema");

const CreateLike = async (req, res) => {
  try {
    const body = req.body;

    const { LikedId, PostId } = body;

    await postModel.findByIdAndUpdate(PostId, {
      $addToSet: { likes: LikedId },
    });

    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

const UnLike = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { UnLikedItId, gotUnLikedId } = body;

    await postModel.findByIdAndUpdate(gotUnLikedId, {
      $pull: { likes: UnLikedItId },
    });

    res.send("success");
  } catch (error) {
    console.log("asdf", error);
    res.send("err");
  }
};

getLikes = async (req, res) => {
  try {
    const URL = req.params["likeId"];
    const FoundedPost = await postModel
      .findById(URL)
      .populate({ path: "likes", populate: { path: "LikedId" } });

    res.send(FoundedPost);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports = { CreateLike, UnLike, getLikes };
