const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { console } = require("inspector");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    console.log(body);
    const oldPass = body.password;
    const NewPass = await bcrypt.hash(oldPass, 10);
    body.password = NewPass;
    const response = await userModel.create(body);

    const token = jwt.sign(
      {
        userId: response._id,
        username: response.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const _ID = response._id;
    console.log(_ID.toString());
    console.log(body);

    res.send(JSON.stringify(token));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify(error));
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    const Founded = await userModel.findOne(body);
    const Name = Founded.username;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      const token = authHeader.split(" ")[1];
      if (!token) res.json({ message: "no token in headers" });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      console.log(body);
      console.log(Founded);
      res.send(`Welcome ${Name}`);
    } else {
      res.send("error");
    }
  } catch (error) {
    console.log(error);
  }
};

const Follow = async (req, res) => {
  try {
    const body = req.body;
    const { gotFollowedID, followedHimID } = body;
    if (gotFollowedID == followedHimID) throw new Error(error);
    await userModel.findByIdAndUpdate(followedHimID, {
      $addToSet: { following: gotFollowedID },
    });
    await userModel.findByIdAndUpdate(gotFollowedID, {
      $addToSet: { followers: followedHimID },
    });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};
const Unfollow = async (req, res) => {
  try {
    const body = req.body;
    const { UnfollowedHimID, gotUnfollowedID } = body;

    await userModel.findByIdAndUpdate(gotUnfollowedID, {
      $pull: { followers: UnfollowedHimID },
    });
    await userModel.findByIdAndUpdate(UnfollowedHimID, {
      $pull: { following: gotUnfollowedID },
    });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find().populate({
      path: "posts",

      populate: { path: "comments" },
      populate: {
        path: "likes",
        populate: { path: "LikedId", select: "username email" },
      },
    });

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

module.exports = { signUp, login, getUser, Follow, Unfollow };
