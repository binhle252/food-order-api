const commentModel = require("../models/comment.model");
const Account = require("../models/account.model"); // hoặc đường dẫn đúng tới file account.model.js


const createComment = async (req, res) => {
  try {
    const { foodId, content } = req.body;

    if (!foodId || !content) {
      return res.status(400).json({ message: "Thiếu foodId hoặc content" });
    }

    const newComment = await commentModel.create({
      food: foodId,        // đúng: truyền id đơn lẻ, không phải object
      user: req.user.id,
      content,
    });

    const populatedComment = await newComment.populate("user", "username");
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error("❌ Lỗi khi tạo bình luận:", err);
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
