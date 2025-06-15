const commentModel = require("../models/comment.model");

const createComment = async (req, res) => {
  try {
    const { foodId, content } = req.body;

    const newComment = await commentModel.create({
      food: foodId,
      user: req.user.id, // lấy từ middleware xác thực
      content,
    });

    const populatedComment = await newComment.populate("user", "username");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo bình luận", error: err.message });
  }
};

const getCommentsByFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const comments = await commentModel.find({ food: foodId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy bình luận", error: err.message });
  }
};

module.exports = { createComment, getCommentsByFood };
