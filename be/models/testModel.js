const mongoose = require("mongoose");
const joi = require("joi");
const testSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["full", "mini", "part1", "part2", "part5", "part6", "part7"],
  },
  level: {
    type: String,
    enum: ["250-500", "500-750", "750-990"],
    default: "250-500",
  },
  img: String,
  time: Number,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
});

const validate = (test) => {
  const schema = joi.object({
    name: joi.string().min(4).required(),
    type: joi.string(),
    time: joi.number().min(1).required(),
    level: joi.string().required(),
    img: joi.string().required(),
    questions: joi.array(),
  });
  return schema.validate(test);
};

const Test = mongoose.model("test", testSchema);

module.exports = {
  Test,
  validate,
};
