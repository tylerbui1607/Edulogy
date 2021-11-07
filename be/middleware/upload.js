const { toLower } = require("lodash");
const readline = require("readline");
var stream = require("stream");

const { Question } = require("../models/questionModel");

let currentPart = 0;
let question = {};
let questions = [];

function addMedia(line) {
  question[toLower(line.split(" ")[0])] = line.split(" ")[1];
}

function answersHandle(line) {
  if (line.split(" ")[0] === "TRUE") {
    return {
      isTrue: true,
      content: line.slice(5),
    };
  }
  return {
    isTrue: false,
    content: line,
  };
}

function partHandle(line) {
  if (Object.keys(question).length > 2) questions.push(question);

  currentPart = parseInt(line.split(" ")[1]);
  question = {
    answers: [],
    part: currentPart,
  };
}

function questionHandle() {
  if (Object.keys(question).length > 2) questions.push(question);

  question = {
    answers: [],
    part: currentPart,
  };
}
const extractQuestion = async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      status: "fail",
      message: "Vui lòng upload file test.",
    });
    return;
  }
  var bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);

  var rl = readline.createInterface({
    input: bufferStream,
  });
  for await (const line of rl) {
    let arr = line.split(" ");
    switch (arr[0]) {
      case "Question":
        questionHandle();
        break;
      case "Part":
        partHandle(line);
        break;
      case "Type":
        req.type = line.split(" ")[1];
        break;
      case "IMG":
      case "SCRIPT":
        addMedia(line);
        break;
      case "CONTENT":
        question.content = line.slice(8);
        break;
      default:
        question.answers.push(answersHandle(line));
        break;
    }
  }

  req.questions = questions;

  questions = [];
  if (!req.questions.length || currentPart === 0 || !req.type) {
    res.status(400).json({
      status: "fail",
      message: "File upload không hợp lệ vui lòng kiểm tra lại",
    });
  }
  next();
};

module.exports = {
  extractQuestion,
};
