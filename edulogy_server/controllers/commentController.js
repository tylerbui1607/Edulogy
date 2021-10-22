const { Comment } = require("../models/commentModel");
const base = require("./baseController");

exports.addOne = base.addOne(Comment);

exports.likeOne = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({
        status: "fail",
        message: "No comment found with that id",
      });
      return;
    }
    if (comment.like.indexOf(req.user._id) !== -1) {
      res.status(405).json({
        status: "fail",
        message: "This user already liked this!",
      });
      return;
    }
    let indexInDislike = comment.dislike.indexOf(req.user._id);
    if (indexInDislike !== -1) comment.dislike.splice(indexInDislike, 1);
    comment.like.push(req.user._id);
    await comment.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};

exports.dislikeOne = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({
        status: "fail",
        message: "No comment found with that id",
      });
      return;
    }

    if (comment.dislike.indexOf(req.user._id) !== -1) {
      res.status(405).json({
        status: "fail",
        message: "This user already disliked this!",
      });
      return;
    }
    let indexInLike = comment.like.indexOf(req.user._id);
    if (indexInLike !== -1) comment.like.splice(indexInLike, 1);
    comment.dislike.push(req.user._id);
    await comment.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id)
      .select("-subComments")
      .populate("user", "name")
      .lean();
    if (!comment) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      doc: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter",
    });
  }
};
exports.getAll = async (req, res, next) => {
  try {
    let comments = await Comment.find({})
      .select("-subComments")
      .populate("user", "name")
      .lean();
    if (!comments.length) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      doc: comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};
exports.updateOne = base.updateOne(Comment);
exports.reply = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id",
      });
      return;
    }

    let subComment = new Comment(req.body);
    await subComment.save();

    comment.subComments.push(subComment._id);

    await comment.save();

    this.getOne(req, res, next);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
  }
};
