const base = require("./baseController");
const { Test } = require("../models/testModel");
const { Question, validate } = require("../models/questionModel");
const _ = require("lodash");

exports.getOne = async (req, res, next) => {
  try {
    let doc = await Test.findById(req.params.id).populate("questions");
    if (doc) {
      res.status(200).json({
        doc,
      });
    } else {
      res.status(400).json({
        status: "This test has been removed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  console.log(req.query);
  try {
    let { type, page, pagesize, level } = req.query;

    page = parseInt(page);
    pagesize = parseInt(pagesize);
    type = type ? { type } : {};
    type = level ? { ...type, level: level } : type;

    let totalTest = await Test.find(type).lean();
    let totalPage = Math.ceil(totalTest.length / parseInt(pagesize));

    let doc = await Test.find(type)
      .select("level img time name type")
      .limit(pagesize)
      .skip((page - 1) * pagesize)
      .lean();
    if (doc) {
      res.status(200).json({
        doc,
        totalPage,
      });
    } else {
      res.status(400).json({
        status: "This test has been removed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    next(error);
  }
};
exports.addOne = async (req, res, next) => {
  let test = {
    name: req.body.name,
    time: req.body.time,
    type: req.type,
    img: req.body.img,
    questions: [],
  };
  try {
    let errorList = [];
    for (let i = 0; i < req.questions.length; i++) {
      let { error } = validate(req.questions[i]);
      if (error)
        errorList.push(
          `Question ${i + 1} has error : ` + error.details[0].message
        );
      else {
        let question;

        if (req.questions[i].content) {
          question = await Question.findOne({
            //check if question already exists
            content: req.questions[i].content,
          });
        }

        if (!question) {
          question = new Question(req.questions[i]);
          await question.save();
        }

        test.questions.push(question._id);
      }
    }

    //all question are ok
    if (errorList.length === 0) {
      let doc = new Test(test);
      await doc.save();
      res.status(200).json({
        status: "success",
        doc,
      });
    } else {
      let message = errorList.reduce((rs, v) => rs + v + "<br/>", "");
      res.status(400).json({
        status: "fail",
        message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
exports.deleteOne = base.deleteOne(Test);
exports.updateOne = base.updateOne(Test);
