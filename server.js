const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRouter = require("./router/userRouter");
const PostRouter = require("./router/postRouter");
const CommentRouter = require("./router/commentRouter");
const LikeRouter = require("./router/likeRouter");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(LikeRouter);
app.use(CommentRouter);
app.use(PostRouter);
app.use(UserRouter);

const connectDataB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
connectDataB();

app.listen(8070, console.log("connected to 8070"));
