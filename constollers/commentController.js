const CommentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const CreateComment = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
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

module.exports = { CreateComment };
