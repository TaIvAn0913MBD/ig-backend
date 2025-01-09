const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const body = req.body;
    const oldPass = body.password;
    console.log(body);
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

    res.send({ token });
  } catch (error) {
    console.log();
    res.send({ error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    console.log(user.password);
    const check = bcrypt.compare(password, user.password);

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    if (check) {
      console.log("succes");
      res.json(token);
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log(error);
    res.send("login failed");
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
    res.send(error);
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
    const URL = req.params["userId"];
    console.log(URL);
    const user = await userModel.findById(URL);
    const POP = await user.populate("following followers posts");
    console.log(POP);
    res.status(200).send(POP);
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};
const EditUserProfileIMG = async (req, res) => {
  try {
    const file = req.body.profileIMG;
    const userId = req.body._id;

    const POPOP = await userModel.findByIdAndUpdate(userId, {
      profileIMG: file,
    });

    res.status(200).send(POPOP);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  Follow,
  Unfollow,
  EditUserProfileIMG,
};
