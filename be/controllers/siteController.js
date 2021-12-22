const { Test } = require("../models/testModel");
const { Question } = require("../models/questionModel");
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");
const { Post } = require("../models/postModel");

exports.homePage = async (req, res, next) => {
  try {
    let data = await Test.find({}).lean();
    res.status(200).json({
      status: "success",
      data: {
        reading: data,
        listening: data,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter",
    });
  }
};

exports.adminPage = async (req, res, next) => {
  try {
    const tests = await Test.find({}).populate("questions").lean();
    const questions = await Question.find({}).lean();
    const users = await User.find({}).sort("role").lean();
    const posts = await Post.find({}).lean();
    for (let i = 0; i < users.length; i++) {
      let score = 0;
      let comments = await Comment.find({ user: users[i]._id }).lean();
      for (let j = 0; j < comments.length; j++)
        score = score + comments[j].like.length - comments[j].dislike.length;
      users[i].score = score;
    }
    res.status(200).json({
      status: "success",
      tests,
      questions: questions.length,
      users,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};
