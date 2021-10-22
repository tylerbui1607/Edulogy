const mongoose = require("mongoose");
const joi = require("joi");

const answerSchema = new mongoose.Schema(
  {
    content: String,
    isTrue: Boolean,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    explanation: String,
    type: String,
    part: Number,
    number: Number,
    img: String,
    script: String,
    answers: [answerSchema],
  },
  {
    versionKey: false,
  }
);

const validate = (question) => {
  const schema = joi.object({
    content: joi.string().min(10),
    explanation: joi.string().min(10),
    answers: joi.array().required(),
    img: joi.string(),
    script: joi.string(),
    part: joi.number().min(1).max(7).required(),
    type: joi.string(),
  });
  return schema.validate(question);
};

const Question = mongoose.model("question", questionSchema);

module.exports = {
  Question,
  validate,
};
