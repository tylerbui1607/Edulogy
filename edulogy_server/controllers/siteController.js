const { Test } = require("../models/testModel");
const { Question } = require("../models/questionModel");
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");

exports.homePage = async (req, res, next) => {
  try {
    let level1 = await Test.find({ level: "250-500" })
      .select("name time level img")
      .limit(5);
    let level2 = await Test.find({ level: "500-750" })
      .select("name time level img")
      .limit(5);
    let level3 = await Test.find({ level: "750-990" })
      .select("name time level img")
      .limit(5);

    res.status(200).json({
      status: "success",
      level1,
      level2,
      level3,
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
    const tests = await Test.find({})
      .select("-type")
      .populate("questions")
      .lean();
    const questions = await Question.find({}).lean();
    const users = await User.find({}).sort("role").lean();
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};
