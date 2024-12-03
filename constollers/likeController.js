const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const CreateLike = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { LikedId, PostId } = body;
    const comm = await likeModel.create(body);
    const _ID = comm._id;
    await userModel.findByIdAndUpdate(LikedId, {
      $addToSet: { likes: _ID },
    });
    await postModel.findByIdAndUpdate(PostId, {
      $addToSet: { likes: _ID },
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
    const comm = await likeModel.findOneAndDelete({
      LikedId: UnLikedItId,
      PostId: gotUnLikedId,
    });
    console.log(comm);
    await postModel.findByIdAndUpdate(gotUnLikedId, {
      $pull: { likes: UnLikedItId },
    });

    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

module.exports = { CreateLike, UnLike };
