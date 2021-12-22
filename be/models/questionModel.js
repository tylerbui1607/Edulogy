const mongoose = require("mongoose");
const joi = require("joi");

const questionSchema = new mongoose.Schema(
  {
    type: String,
    guild: {
      type: String,
      default: "",
    },
    content: [String],
    answers: [String],
    trueAnswers: [String],
    explain: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const validate = (question) => {
  const schema = joi
    .object({
      content: joi.array().required(),
      answers: joi.array().required(),
      trueAnswers: joi.array().required(),
      explain: joi.array().required(),
      type: joi.string().required(),
    })
    .unknown(true);
  return schema.validate(question);
};

const Question = mongoose.model("question", questionSchema);

module.exports = {
  Question,
  validate,
};
