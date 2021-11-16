const { Post } = require("../models/postModel");
const { Comment, validate } = require("../models/commentModel");
const base = require("./baseController");
exports.addOne = async (req, res) => {
  try {
    let post = new Post(req.body);
    post.user = req.user._id;
    await post.save();
    res.status(201).json({
      status: "success",
      doc: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
exports.getAll = async (req, res) => {
  try {
    let { page, pageSize } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let total = await Post.find({}).lean();
    total = total.length;
    let totalPage = Math.ceil(total / pageSize);
    let posts = await Post.find({})
      .sort({
        _id: -1,
      })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .populate("user", "name -_id")
      .lean();
    res.status(200).json({
      status: "success",
      doc: posts,
      totalPage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
exports.getTrending = async (req, res) => {
  try {
    let posts = await Post.find({})
      .sort({
        view: 1,
      })
      .limit(5)
      .populate("user", "name -_id")
      .lean();
    res.status(200).json({
      status: "success",
      doc: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
exports.getOne = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate("user", "name");
    if (!post) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id !",
      });
      return;
    }
    post.view++;
    await post.save();
    res.status(200).json({
      status: "success",
      doc: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
exports.reply = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id !",
      });
      return;
    }
    let comment = new Comment(req.body);
    comment.user = req.user._id;
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    this.getOne(req, res);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
